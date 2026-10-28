import { afterAll, expect, test } from "bun:test"
import { mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import type { Paged } from "akasha/command/pages/story/modules/turn-scenes/turn-scenes.module.code.ts"
import {
  landingInto,
  reachOver,
  type Seen,
  seen,
} from "akasha/command/pages/story/turn/cancel/story-turn-cancel.command.test-fixtures.ts"
import {
  type Correcting,
  storyTurnCorrect,
} from "akasha/command/pages/story/turn/correct/story-turn-correct.command.code.ts"
import type {
  Seated,
  Turn,
} from "akasha/command/pages/story/turn/modules/turn-reaching/turn-reaching.module.code.ts"
import { putting } from "akasha/page/service/modules/page-putting/page-putting.module.code.ts"
import { stepStatus } from "akasha/story/chapter/step-status/step-status.page-type.ts"
import { beatsIn } from "akasha/story/engine/beat-state/modules/beat-records/beat-records.module.code.ts"
import { storyTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.ts"

const ROOT = mkdtempSync(join("/var/tmp", "story-turn-correct-test-"))

afterAll(() => rmSync(ROOT, { recursive: true, force: true }))

const GIVEN: Given = {
  root: ROOT,
  calledAs: "akasha story turn correct",
  from: "",
  writer: null,
  agentId: "an-agent",
}

const SLUG = "the-saga-00-002"

const AT = `stories/the-saga/turns/${SLUG}.story-turn-played.ts`

const BEATS_AT = `stories/the-saga/turns/${SLUG}.story-turn-played.beats.jsonl`

const PROSE_AT = `stories/the-saga/turns/${SLUG}.story-turn-played.prose.txt`

const OUTCOMES_AT = `stories/the-saga/turns/${SLUG}.story-turn-played.outcomes.jsonl`

const SKILL = "character-skill/mara-swordplay"

const SKILL_AT = "stories/the-saga/skills/mara-swordplay.character-skill.ts"

const DRILLED = { page: SKILL, note: "drilled", key: "experience", from: 35, to: 40 }

const BEATS = [
  { beat: 1, event: "Mara drills.", prose: "You drill until dark.", changes: [DRILLED] },
  { beat: 2, event: "Mara sleeps.", prose: "You sleep by the hearth.", changes: [] },
]

const BEATS_TEXT = BEATS.map((one) => `${JSON.stringify(one)}\n`).join("")

const PROSE_TEXT = "You drill until dark.\n\nYou sleep by the hearth.\n"

function turnOf(status = "player"): Turn {
  return {
    at: AT,
    slug: SLUG,
    value: {
      partOfCollections: ["story-played/the-saga"],
      position: 2,
      stepStatus: `${stepStatus.slug}/${status}`,
      beats: "jsonl",
      prose: "txt",
    },
  }
}

type Story = {
  readonly seat?: Seated | null
  readonly outcomes?: string
  readonly status?: string
}

function correctingOver(into: Seen, story: Story = {}): Correcting {
  const turn = turnOf(story.status)
  const texts: Readonly<Record<string, string>> = {
    [BEATS_AT]: BEATS_TEXT,
    [PROSE_AT]: PROSE_TEXT,
    ...(story.outcomes === undefined ? {} : { [OUTCOMES_AT]: story.outcomes }),
  }
  const paged: Paged = { slug: SLUG, at: AT, value: turn.value }
  const values: Readonly<Record<string, number>> = { experience: 40 }
  return {
    ...reachOver(turn, into),
    turnAt: (_root, slug) => (slug === SLUG ? turn : null),
    seatOf: () => story.seat ?? null,
    textIn: (_root, path) => texts[path] ?? "",
    pagedOf: () => [paged],
    changing: () => ({
      exists: (page) => page === SKILL,
      valueOf: (page, key) => (page === SKILL ? values[key] : undefined),
      filed: () => null,
    }),
    beatingOf: () => ({
      pageOf: (address) => (address === SKILL ? { at: SKILL_AT, value: values } : null),
      beside: () => null,
    }),
    present: (_root, path) => path in texts,
  }
}

function fileOf(name: string, text: string): string {
  const at = join(ROOT, name)
  writeFileSync(at, text)
  return at
}

async function correctedBy(argv: readonly string[], reach: Correcting, into: Seen) {
  return await storyTurnCorrect(["--turn", SLUG, ...argv], GIVEN, landingInto(into), reach)
}

const FEWER = `${JSON.stringify({ ...DRILLED, beat: 1, to: 38 })}\n`

test("a shown beat's numbers are taken back and written again, and its beats line follows", async () => {
  const into = seen()
  const changes = fileOf("fewer.jsonl", FEWER)
  const answer = await correctedBy(
    ["--beat", "1", "--changes-file", changes],
    correctingOver(into),
    into
  )
  expect(answer.refusals).toEqual([])
  expect(into.folded.map((one) => [one.path, one.values])).toEqual([[SKILL_AT, { experience: 38 }]])
  const written = into.asked.find((one) => JSON.stringify(one).includes(BEATS_AT))
  const body = (written?.given as { body: string } | undefined)?.body ?? ""
  const beats = beatsIn(body)
  if ("refused" in beats) throw new Error(beats.refused)
  expect(beats.changes).toEqual([{ ...DRILLED, beat: 1, to: 38 }])
  expect(into.steps).toEqual([`hold ${AT}`, "land", `free ${AT}`])
})

test("a shown beat's prose is rewritten in its beats line and in the turn's prose file", async () => {
  const into = seen()
  const prose = fileOf("prose.txt", "You drill until your arms shake.\n")
  const answer = await correctedBy(
    ["--beat", "1", "--prose-file", prose],
    correctingOver(into),
    into
  )
  expect(answer.refusals).toEqual([])
  const told = "You drill until your arms shake.\n\nYou sleep by the hearth.\n"
  expect(into.asked).toContainEqual(putting({ path: PROSE_AT, content: told }))
  expect(into.folded).toEqual([
    {
      pageTypeSlug: storyTurnPlayed.slug,
      slug: SLUG,
      path: AT,
      values: { ownLength: 11 },
      merge: true,
    },
  ])
})

test("a beat not yet shown is refused, since an advance states it again", async () => {
  const into = seen()
  const answer = await correctedBy(
    ["--beat", "2", "--changes-file", fileOf("none.jsonl", "")],
    correctingOver(into, { status: "game-master" }),
    into
  )
  expect(answer.refusals.join(" ")).toContain("is not shown yet")
  expect(into.asked).toEqual([])
})

test("a writer's seat is refused, and the game's game master is not", async () => {
  const into = seen()
  const writer = { name: "mari-writer-the-saga", role: "writer", game: "the-saga" }
  const prose = fileOf("again.txt", "You drill.\n")
  const argv = ["--beat", "1", "--prose-file", prose]
  const refusedAnswer = await correctedBy(argv, correctingOver(into, { seat: writer }), into)
  expect(refusedAnswer.refusals.join(" ")).toContain("corrected by its game-master")
  const master = { name: "mari-game-master-the-saga", role: "game-master", game: "the-saga" }
  const answer = await correctedBy(argv, correctingOver(into, { seat: master }), into)
  expect(answer.refusals).toEqual([])
})

test("a change an outcome adds to, left unmarked, is refused", async () => {
  const into = seen()
  const added = [{ page: SKILL, key: "experience", by: 3 }]
  const outcomes = `${JSON.stringify({ check: "world-check/the-saga-drill", added })}\n`
  const answer = await correctedBy(
    ["--beat", "1", "--changes-file", fileOf("unmarked.jsonl", FEWER)],
    correctingOver(into, { outcomes }),
    into
  )
  expect(answer.refusals.join(" ")).toContain("outcome line")
  expect(into.asked).toEqual([])
})

test("a correction naming neither changes nor prose is refused", async () => {
  const into = seen()
  const answer = await correctedBy(["--beat", "1"], correctingOver(into), into)
  expect(answer.refusals.join(" ")).toContain("hands in the beat's changes")
})
