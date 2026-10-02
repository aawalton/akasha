import { afterAll, expect, test } from "bun:test"
import { createHash } from "node:crypto"
import { mkdirSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { settledBefore } from "akasha/command/pages/story/modules/settle-asking/settle-asking.module.code.ts"
import {
  outcomesAt,
  type Roll,
  storySettle,
  type Turn,
  taken,
} from "akasha/command/pages/story/settle/story-settle.command.code.ts"
import {
  type Appended,
  answeredBy,
  argvFor,
  CALLED,
  FIRST,
  GIVEN,
  HER_AT,
  LATEST,
  ROOT,
  reachOver,
  rollIn,
  settledBy,
} from "akasha/command/pages/story/settle/story-settle.command.test-fixtures.ts"
import { facesFrom } from "akasha/story/world/mechanics/modules/dice-rolling/dice-rolling.module.code.ts"

afterAll(() => rmSync(ROOT, { recursive: true, force: true }))

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

test("a check whose code breaks on no roll is refused, naming the dice to settle it with", async () => {
  const answer = await storySettle(
    argvFor("answering").slice(0, 6),
    GIVEN,
    async () => await Promise.reject(new Error("a refused settle lands nothing")),
    reachOver([LATEST])
  )
  expect(answer.refusals.join("\n")).toContain("`--dice`")
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

test("a turn rewound and settled again rolls from a seed it never rolled", async () => {
  const at = outcomesAt(LATEST.at)
  if (at === null) throw new Error("a turn page has outcomes beside it")
  const bare = rollIn((await settledBy("answering", reachOver([LATEST])))[0] as Appended)
  writeFileSync(join(ROOT, at), `${JSON.stringify(bare)}\n`)
  const next = rollIn((await settledBy("answering", reachOver([LATEST])))[0] as Appended)
  rmSync(join(ROOT, at))
  const seen = [bare.seed, next.seed]
  const again = rollIn((await settledBy("answering", reachOver([LATEST], 1)))[0] as Appended)
  writeFileSync(join(ROOT, at), `${JSON.stringify(again)}\n`)
  const after = rollIn((await settledBy("answering", reachOver([LATEST], 1)))[0] as Appended)
  rmSync(join(ROOT, at))
  expect(bare.seed).toBe(LATEST.slug)
  expect(seen).not.toContain(again.seed)
  expect(seen).not.toContain(after.seed)
})

test("a check answering endsAt states that instant on the turn it settles on", async () => {
  writeFileSync(join(ROOT, LATEST.at), `  endsAt: "2026-09-28T11:15:00.000Z",\n`)
  const appended = await settledBy("timed", reachOver([LATEST]), argvFor("timed").slice(0, 6))
  rmSync(join(ROOT, LATEST.at))
  const stated = { at: LATEST.at, key: "endsAt", to: "2026-09-28T11:27:00.000Z" }
  expect(appended[1] as unknown).toEqual(stated)
})

function scoringArgv(whose: string): readonly string[] {
  return ["--story", "the-saga", "--check", "scoring", "--reading", `{"character":"${whose}"}`]
}

test("what a check's answer adds is added to its page in the same landing", async () => {
  mkdirSync(join(ROOT, "pages"), { recursive: true })
  writeFileSync(join(ROOT, HER_AT), "  relationshipPoints: 2,\n")
  const appended = await settledBy("scoring", reachOver([LATEST]), scoringArgv("her"))
  rmSync(join(ROOT, HER_AT))
  const summed = { at: HER_AT, key: "relationshipPoints", to: "5", holds: "number" }
  expect(appended).toHaveLength(2)
  expect(appended[1] as unknown).toEqual(summed)
})

test("a check adding to a page that is not here appends nothing", async () => {
  expect(await settledBy("scoring", reachOver([LATEST]), scoringArgv("nobody"))).toEqual([])
})

test("a landing settle adding to a page only in the caller's kept edits says so", async () => {
  const answer = await storySettle(
    scoringArgv("kept"),
    GIVEN,
    async () => await Promise.reject(new Error("a refused settle lands nothing")),
    reachOver([LATEST])
  )
  expect(answer.refusals.join("\n")).toContain("only in your kept edits")
  expect(answer.refusals.join("\n")).toContain("`--draft`")
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
  expect(settledBefore(kept, roll)).toBeNull()
  expect(settledBefore(kept, { check: roll.check, reading: {} })?.place).toBe(0)
})

const WRONG = JSON.stringify({
  check: "world-check/timed",
  reading: {},
  answered: { endsAt: "2026-09-28T11:15:00.000Z" },
})

test("a check that rolls nothing settles again only at game-master, appending a line replacing the earlier", async () => {
  const at = outcomesAt(LATEST.at) ?? "no outcomes"
  writeFileSync(join(ROOT, at), `${WRONG}\n`)
  writeFileSync(join(ROOT, LATEST.at), `  endsAt: "2026-09-28T11:15:00.000Z",\n`)
  const argv = argvFor("timed").slice(0, 6)
  const later = await answeredBy(argv, reachOver([LATEST]))
  const corrected = await answeredBy(argv, reachOver([LATEST], 0, "game-master"))
  rmSync(join(ROOT, at))
  rmSync(join(ROOT, LATEST.at))
  expect(later.answer.refusals.join("\n")).toContain("again only at game-master")
  expect(later.appended).toEqual([])
  expect(corrected.answer.report).toContain("replaced\tline 1")
  expect(corrected.appended.filter((one) => one.at === at)).toHaveLength(1)
  const ends = "2026-09-28T11:27:00.000Z"
  expect(rollIn(corrected.appended[0] as Appended).answered).toEqual({ endsAt: ends })
  expect(corrected.appended[1] as unknown).toEqual({ at: LATEST.at, key: "endsAt", to: ends })
})

test("a line replacing another takes back what the earlier line added", async () => {
  const at = outcomesAt(LATEST.at) ?? "no outcomes"
  const was = {
    check: "world-check/scoring",
    reading: { character: "her" },
    answered: { change: 1 },
  }
  writeFileSync(join(ROOT, at), `${JSON.stringify(was)}\n`)
  mkdirSync(join(ROOT, "pages"), { recursive: true })
  writeFileSync(join(ROOT, HER_AT), "  relationshipPoints: 4,\n")
  const { appended } = await answeredBy(scoringArgv("her"), reachOver([LATEST], 0, "game-master"))
  rmSync(join(ROOT, at))
  rmSync(join(ROOT, HER_AT))
  const summed = { at: HER_AT, key: "relationshipPoints", to: "6", holds: "number" }
  expect(appended[1] as unknown).toEqual(summed)
})

test("a roll after a replacing line is chained from that line and its place", async () => {
  const at = outcomesAt(LATEST.at) ?? "no outcomes"
  const replacing = WRONG.replace("11:15", "11:27")
  writeFileSync(join(ROOT, at), `${WRONG}\n${replacing}\n`)
  const roll = rollIn((await settledBy("answering", reachOver([LATEST])))[0] as Appended)
  rmSync(join(ROOT, at))
  const hashed = createHash("sha256").update(`${replacing}\n${LATEST.slug}\n2`)
  expect(roll.seed).toBe(hashed.digest("hex"))
})
