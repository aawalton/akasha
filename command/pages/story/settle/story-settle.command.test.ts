import { afterAll, expect, test } from "bun:test"
import { createHash } from "node:crypto"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import type { Asking } from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import {
  outcomesAt,
  type Reach,
  type Roll,
  settledBefore,
  storySettle,
  type Turn,
  taken,
} from "akasha/command/pages/story/settle/story-settle.command.code.ts"
import { facesFrom } from "akasha/story/world/mechanics/modules/dice-rolling/dice-rolling.module.code.ts"

const CALLED = "akasha story settle"

const ROOT = mkdtempSync(join("/var/tmp", "story-settle-test-"))

afterAll(() => rmSync(ROOT, { recursive: true, force: true }))

const FIRST: Turn = {
  at: "turns/the-saga-00-001.story-turn-played.ts",
  slug: "the-saga-00-001",
  position: 1,
}

const LATEST: Turn = {
  at: "turns/the-saga-00-002.story-turn-played.ts",
  slug: "the-saga-00-002",
  position: 2,
}

const ANSWERING =
  "export function settled(reading, roll) {\n  return { answered: { total: roll.total, asked: reading.asked } }\n}\n"

const REFUSING =
  'export function settled() {\n  return { refused: "this check reads no such thing" }\n}\n'

const DICELESS =
  "export function settled(reading, roll) {\n  return { answered: { rolled: roll !== null, asked: reading.asked } }\n}\n"

mkdirSync(join(ROOT, "turns"), { recursive: true })
mkdirSync(join(ROOT, "checks"), { recursive: true })
writeFileSync(join(ROOT, "checks", "answering.code.ts"), ANSWERING)
writeFileSync(join(ROOT, "checks", "refusing.code.ts"), REFUSING)
writeFileSync(join(ROOT, "checks", "diceless.code.ts"), DICELESS)
writeFileSync(
  join(ROOT, "checks", "timed.code.ts"),
  'export function settled() {\n  return { answered: { endsAt: "2026-09-28T11:27:00.000Z" } }\n}\n'
)

function reachOver(turns: readonly Turn[]): Reach {
  return {
    turnsOf: (_root, story) => (story === "the-saga" ? turns : []),
    settlingAt: (_root, check) => (check === "nothing" ? null : `checks/${check}.code.ts`),
  }
}

const GIVEN: Given = { root: ROOT, calledAs: CALLED, from: "", writer: null, agentId: null }

const APPLIED = {
  base: "",
  landed: [],
  formatted: [],
  said: [],
  wrong: [],
  commit: "a-commit",
}

function argvFor(check: string): readonly string[] {
  return [
    "--story",
    "the-saga",
    "--check",
    check,
    "--reading",
    '{"asked":"a leap"}',
    "--dice",
    "2d10",
  ]
}

type Appended = { readonly at: string; readonly content: string }

async function settledBy(
  check: string,
  reach: Reach,
  argv: readonly string[] = argvFor(check)
): Promise<readonly Appended[]> {
  const asked: Asking[] = []
  await storySettle(
    argv,
    GIVEN,
    async (_root, held) => {
      asked.push(...held)
      return APPLIED
    },
    reach
  )
  return asked.map((one) => one.given as Appended)
}

function rollIn(appended: Appended): Roll {
  return JSON.parse(appended.content) as Roll
}

test("a call names the story, the check, what the check reads and the dice", () => {
  expect(taken(argvFor("answering"), CALLED)).toEqual({
    story: "the-saga",
    check: "answering",
    reading: { asked: "a leap" },
    dice: "2d10",
    turn: null,
    drafts: false,
  })
})

test("a turn named by its address is taken as its slug", () => {
  const argv = [...argvFor("answering"), "--turn", "story-turn-played/the-saga-00-001", "--draft"]
  expect(taken(argv, CALLED)).toMatchObject({ turn: FIRST.slug, drafts: true })
})

test("a reading that is no keyed reading is refused", () => {
  const argv = [...argvFor("answering")]
  argv[5] = "[1,2]"
  expect(taken(argv, CALLED)).toHaveProperty("refused")
})

test("a roll is appended to the outcomes beside the story's latest open turn", async () => {
  const appended = await settledBy("answering", reachOver([LATEST, FIRST]))
  expect(appended.map((one) => one.at)).toEqual([outcomesAt(LATEST.at) ?? "no outcomes"])
  const roll = rollIn(appended[0] as Appended)
  expect(roll.check).toBe("world-check/answering")
  expect(roll.reading).toEqual({ asked: "a leap" })
  expect(roll.dice?.said).toBe("2d10")
  expect(roll.dice?.faces).toHaveLength(2)
  const answered = roll.answered as { readonly total: number; readonly asked: string }
  expect(answered.asked).toBe("a leap")
  expect(answered.total).toBe((roll.dice?.faces[0] ?? 0) + (roll.dice?.faces[1] ?? 0))
})

test("a call naming no dice is taken with none", () => {
  expect(taken(argvFor("diceless").slice(0, 6), CALLED)).toEqual({
    story: "the-saga",
    check: "diceless",
    reading: { asked: "a leap" },
    dice: null,
    turn: null,
    drafts: false,
  })
})

test("a check settled with no dice is handed no roll, and its line states no dice or seed", async () => {
  const argv = argvFor("diceless").slice(0, 6)
  const appended = await settledBy("diceless", reachOver([LATEST]), argv)
  const roll = rollIn(appended[0] as Appended)
  expect(roll.answered).toEqual({ rolled: false, asked: "a leap" })
  expect(roll).not.toHaveProperty("dice")
  expect(roll).not.toHaveProperty("seed")
})

test("a check reading dice and handed none appends nothing", async () => {
  const argv = argvFor("answering").slice(0, 6)
  expect(await settledBy("answering", reachOver([LATEST]), argv)).toEqual([])
})

test("the first roll on the open turns is seeded by the turn it is settled on", async () => {
  const roll = rollIn((await settledBy("answering", reachOver([FIRST, LATEST])))[0] as Appended)
  expect(roll.seed).toBe(LATEST.slug)
  const shown = facesFrom(LATEST.slug, "2d10")
  if ("refused" in shown) throw new Error(shown.refused)
  expect(roll.dice?.faces).toEqual(shown.answered.faces)
})

test("a roll is seeded by the hash of the line before it, its turn and its place there", async () => {
  const before = '{"check":"world-check/answering","seed":"earlier"}'
  const at = outcomesAt(FIRST.at)
  if (at === null) throw new Error("a turn page has outcomes beside it")
  writeFileSync(join(ROOT, at), `${before}\n`)
  const roll = rollIn((await settledBy("answering", reachOver([FIRST, LATEST])))[0] as Appended)
  const hashed = createHash("sha256").update(`${before}\n${LATEST.slug}\n0`)
  expect(roll.seed).toBe(hashed.digest("hex"))
  rmSync(join(ROOT, at))
})

const THIRD: Turn = {
  at: "turns/the-saga-00-003.story-turn-played.ts",
  slug: "the-saga-00-003",
  position: 3,
}

const GROWN = '{"check":"world-check/growth","reading":{"level":1},"answered":{"level":1}}'

function onTurn(turn: Turn): readonly string[] {
  return [...argvFor("answering"), "--turn", turn.slug]
}

test("rolls after closed turns ending in the same line are seeded apart", async () => {
  const first = outcomesAt(FIRST.at)
  const latest = outcomesAt(LATEST.at)
  if (first === null || latest === null) throw new Error("a turn page has outcomes beside it")
  const turns = reachOver([FIRST, LATEST, THIRD])
  writeFileSync(join(ROOT, first), `${GROWN}\n`)
  const earlier = (await settledBy("answering", turns, onTurn(LATEST)))[0] as Appended
  writeFileSync(join(ROOT, latest), `${earlier.content}${GROWN}\n`)
  const later = rollIn((await settledBy("answering", turns, onTurn(THIRD)))[0] as Appended)
  rmSync(join(ROOT, first))
  rmSync(join(ROOT, latest))
  expect(later.seed).toBeDefined()
  expect(later.seed).not.toBe(rollIn(earlier).seed)
})

test("a check answering endsAt states that instant on the turn it settles on", async () => {
  writeFileSync(join(ROOT, LATEST.at), `  endsAt: "2026-09-28T11:15:00.000Z",\n`)
  const appended = await settledBy("timed", reachOver([LATEST]), argvFor("timed").slice(0, 6))
  rmSync(join(ROOT, LATEST.at))
  const stated = { at: LATEST.at, key: "endsAt", to: "2026-09-28T11:27:00.000Z" }
  expect(appended[1] as unknown).toEqual(stated)
})

test("a check that refuses its reading appends nothing", async () => {
  expect(await settledBy("refusing", reachOver([LATEST]))).toEqual([])
})

test("a check no page names appends nothing", async () => {
  expect(await settledBy("nothing", reachOver([LATEST]))).toEqual([])
})

test("a story with no open turn appends nothing", async () => {
  expect(await settledBy("answering", reachOver([]))).toEqual([])
})

const HERS = '{"asked":"a leap","character":"character-other/her"}'

function scoredArgv(reading: string, turn?: string): readonly string[] {
  const argv = ["--story", "the-saga", "--check", "diceless", "--reading", reading]
  return turn === undefined ? argv : [...argv, "--turn", turn]
}

test("a call naming a turn settles on that turn rather than the latest", async () => {
  const argv = scoredArgv(HERS, `story-turn-played/${FIRST.slug}`)
  const appended = await settledBy("diceless", reachOver([FIRST, LATEST]), argv)
  expect(appended.map((one) => one.at)).toEqual([outcomesAt(FIRST.at) ?? "no outcomes"])
})

test("a call naming no turn of the story appends nothing", async () => {
  const argv = scoredArgv(HERS, "the-saga-00-009")
  expect(await settledBy("diceless", reachOver([FIRST, LATEST]), argv)).toEqual([])
})

test("a check that rolls nothing settles once on a turn for each character", async () => {
  const at = outcomesAt(LATEST.at)
  if (at === null) throw new Error("a turn page has outcomes beside it")
  const was = { check: "world-check/diceless", reading: JSON.parse(HERS), answered: {} }
  writeFileSync(join(ROOT, at), `${JSON.stringify(was)}\n`)
  expect(await settledBy("diceless", reachOver([LATEST]), scoredArgv(HERS))).toEqual([])
  const another = '{"asked":"a leap","character":"character-other/another"}'
  expect(await settledBy("diceless", reachOver([LATEST]), scoredArgv(another))).toHaveLength(1)
  rmSync(join(ROOT, at))
})

test("a roll with dice is never refused as settled before", () => {
  const roll: Roll = {
    check: "world-check/answering",
    reading: {},
    dice: { said: "2d10", sides: 10, faces: [1, 2] },
    answered: {},
  }
  const kept = `${JSON.stringify({ check: "world-check/answering", reading: {} })}\n`
  expect(settledBefore(kept, roll)).toBe(false)
  expect(settledBefore(kept, { check: roll.check, reading: {}, answered: {} })).toBe(true)
})
