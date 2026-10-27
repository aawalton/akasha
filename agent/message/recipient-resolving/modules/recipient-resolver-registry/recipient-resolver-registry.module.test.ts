import { expect, test } from "bun:test"
import { listPersonHandlers } from "akasha/agent/message/recipient-resolving/modules/person-handlers/person-handlers.module.code.ts"
import {
  assembleRecipientResolverSpecs,
  gameSeatSpecs,
  gameSeatsIn,
} from "akasha/agent/message/recipient-resolving/modules/recipient-resolver-registry/recipient-resolver-registry.module.code.ts"
import { ruleMatches } from "akasha/agent/message/recipient-resolving/modules/seat-wake-rules/seat-wake-rules.module.code.ts"
import { roleplay } from "akasha/agent/role/pages/roleplay.role.ts"
import { SEAT_MODE_HEADLESS } from "akasha/agent/seat/launching/modules/seat-modes/seat-modes.module.code.ts"
import { handlerSeatName } from "akasha/agent/seat/name/modules/compose-seat-name/compose-seat-name.module.code.ts"
import { rootOf } from "akasha/command/modules/rooting/rooting.module.code.ts"
import {
  ACTION_BAR_PLAYER,
  ACTION_BAR_SENDER,
} from "akasha/story/engine/core/modules/action-bar-message/action-bar-message.module.code.ts"
import {
  JOB_SENDER,
  STEP_SENDER,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"

const ROOT = rootOf(import.meta.dir)

const GAME = "a-game"

const MASTER = "iris-game-master-a-game"

const BUILDER = "iris-world-builder-a-game"

const WRITER = "iris-writer-a-game"

const REVIEWER = "iris-reviewer-a-game-flex-1"

const RECORDER = "iris-story-recorder-a-game-flex-1"

function towerSpecs() {
  return gameSeatSpecs([
    {
      game: GAME,
      master: MASTER,
      persona: "iris",
      builder: BUILDER,
      writer: WRITER,
      played: true,
      staff: [REVIEWER, RECORDER],
    },
  ])
}

function heard(name: string, sender: string): boolean {
  const spec = towerSpecs().find((one) => one.name === name)
  if (spec === undefined) return false
  return spec.wakeSources.some((rule) => ruleMatches(rule, { sender, content: "" }))
}

test("the tower's game master, world builder and writer seats each have a spec, first", () => {
  expect(
    towerSpecs()
      .map((one) => one.name)
      .slice(0, 3)
  ).toEqual([MASTER, BUILDER, WRITER])
})

test("each reviewer and recorder seat of a game has a spec, started again by its job or its game master", () => {
  const names = towerSpecs().map((one) => one.name)
  expect(names).toContain(REVIEWER)
  expect(names).toContain(RECORDER)
  for (const seat of [REVIEWER, RECORDER]) {
    expect(heard(seat, `agent:${JOB_SENDER}`)).toBe(true)
    expect(heard(seat, `agent:${MASTER}`)).toBe(true)
    expect(heard(seat, `agent:${STEP_SENDER}`)).toBe(false)
    expect(heard(seat, `agent:${ACTION_BAR_SENDER}`)).toBe(false)
  }
})

test("a reviewer or recorder seat that never ran is started by its job's advance, never by a spec", () => {
  const staff = towerSpecs().filter((one) => one.name === REVIEWER || one.name === RECORDER)
  expect(staff.map((one) => one.firstStart)).toEqual([undefined, undefined])
  expect(staff.map((one) => one.resumePolicy.kind)).toEqual([
    "resume-under-budget",
    "resume-under-budget",
  ])
})

test("the game master seat is started by the action bar and by its world builder", () => {
  expect(heard(MASTER, `agent:${ACTION_BAR_SENDER}`)).toBe(true)
  expect(heard(MASTER, `agent:${BUILDER}`)).toBe(true)
  expect(heard(MASTER, "agent:someone-else")).toBe(false)
})

test("the world builder seat is started by its game master, and never by the action bar", () => {
  expect(heard(BUILDER, `agent:${MASTER}`)).toBe(true)
  expect(heard(BUILDER, `agent:${ACTION_BAR_SENDER}`)).toBe(false)
})

test("every game seat is started by a notice that a turn moved", () => {
  expect(heard(MASTER, `agent:${STEP_SENDER}`)).toBe(true)
  expect(heard(BUILDER, `agent:${STEP_SENDER}`)).toBe(true)
  expect(heard(WRITER, `agent:${STEP_SENDER}`)).toBe(true)
})

test("the writer seat is started by a notice alone, never by the action bar or the game master", () => {
  expect(heard(WRITER, `agent:${ACTION_BAR_SENDER}`)).toBe(false)
  expect(heard(WRITER, `agent:${MASTER}`)).toBe(false)
})

test("a game seat that never ran is started as its persona, role and game, for the player", () => {
  const starts = towerSpecs().map((one) => one.firstStart)
  expect(starts).toEqual([
    { persona: "iris", role: "game-master", domain: GAME, principal: ACTION_BAR_PLAYER },
    { persona: "iris", role: "world-builder", domain: GAME, principal: ACTION_BAR_PLAYER },
    { persona: "iris", role: "writer", domain: GAME, principal: ACTION_BAR_PLAYER },
  ])
})

test("a game master named by no persona and game is started by nothing when it never ran", () => {
  const specs = gameSeatSpecs([
    { game: "a-game", master: "a-seat", persona: null, builder: null, writer: null },
  ])
  expect(specs.map((one) => one.firstStart)).toEqual([undefined])
})

test("the text handlers' specs sit beside the game seats", async () => {
  const specs = await assembleRecipientResolverSpecs(
    async () => [],
    async () => new Map(),
    listPersonHandlers
  )
  const names = specs.map((one) => one.name)
  for (const one of gameSeatSpecs(gameSeatsIn(ROOT))) expect(names).toContain(one.name)
  expect(names).toContain(handlerSeatName("ki", ROOT))
  expect(names).toContain(handlerSeatName("jenny", ROOT))
})

test("a person's handler seat is named for the person, never for the persona answering", () => {
  expect(handlerSeatName("jenny", ROOT)).toBe("jenny")
  expect(handlerSeatName("ki", ROOT)).toBe("ki")
})

test("a person handler's spec is read off the person's page and keeps its own options", async () => {
  const specs = await assembleRecipientResolverSpecs(
    async () => [],
    async () => new Map(),
    async () => [{ persona: "claudius", slug: "jenny" }]
  )
  const jenny = specs.find((one) => one.name === "jenny")
  expect(jenny?.owner).toBe("atlas")
  expect(jenny?.stateAuthority[0]?.detail).toContain("Jenny's owned Atlas content pages")
  expect(jenny?.bootPrompt).toBe("/handler jenny")
})

test("a person no persona answers arms no handler spec", async () => {
  const specs = await assembleRecipientResolverSpecs(async () => [])
  expect(specs.map((one) => one.name)).not.toContain("jenny")
})

test("a persona answering a person keeps her own seat's spec beside the person's handler", async () => {
  const specs = await assembleRecipientResolverSpecs(
    async () => ["claudius"],
    async () => new Map(),
    async () => [{ persona: "claudius", slug: "jenny" }]
  )
  const named = (name: string) => specs.filter((one) => one.name === name)
  expect(named("claudius")).toHaveLength(1)
  expect(named("jenny")).toHaveLength(1)
  expect(named("claudius")[0]?.firstStart).toBeUndefined()
  expect(named("claudius")[0]?.bootPrompt).toBeUndefined()
})

test("a roleplay seat that never ran starts headless as its persona, narrating its story", () => {
  const master = `shaestrel-${roleplay.slug}-a-story`
  const specs = gameSeatSpecs([
    {
      game: "a-story",
      master,
      persona: "shaestrel",
      role: roleplay.slug,
      builder: null,
      writer: null,
      staff: [],
    },
  ])
  expect(specs.map((one) => one.name)).toEqual([master])
  const start = specs[0]?.firstStart
  expect(start).toMatchObject({
    persona: "shaestrel",
    role: roleplay.slug,
    domain: "a-story",
    principal: ACTION_BAR_PLAYER,
    startMode: SEAT_MODE_HEADLESS,
  })
  expect(start?.prompt).toContain("you narrate the played story `a-story`")
  expect(start?.prompt).toContain("as a message")
  const hears = (sender: string) =>
    specs[0]?.wakeSources.some((rule) => ruleMatches(rule, { sender, content: "" })) ?? false
  expect(hears(`agent:${ACTION_BAR_SENDER}`)).toBe(true)
  expect(hears(`agent:${STEP_SENDER}`)).toBe(true)
})

test("a written story's game master is started by a notice, never by the action bar", () => {
  const master = "mari-game-master-a-book"
  const [spec] = gameSeatSpecs([
    { game: "a-book", master, persona: "mari", builder: null, writer: null, played: false },
  ])
  const hears = (sender: string) =>
    spec?.wakeSources.some((rule) => ruleMatches(rule, { sender, content: "" })) ?? false
  expect(hears(`agent:${STEP_SENDER}`)).toBe(true)
  expect(hears(`agent:${ACTION_BAR_SENDER}`)).toBe(false)
})
