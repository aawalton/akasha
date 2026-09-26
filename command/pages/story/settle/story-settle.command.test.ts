import { afterAll, expect, test } from "bun:test"
import { createHash } from "node:crypto"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import type { Asking } from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import {
  type Reach,
  type Roll,
  rollsAt,
  storySettle,
  type Turn,
  taken,
} from "akasha/command/pages/story/settle/story-settle.command.code.ts"
import { facesFrom } from "akasha/story/mechanic/modules/dice-rolling/dice-rolling.module.code.ts"

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

mkdirSync(join(ROOT, "turns"), { recursive: true })
mkdirSync(join(ROOT, "checks"), { recursive: true })
writeFileSync(join(ROOT, "checks", "answering.code.ts"), ANSWERING)
writeFileSync(join(ROOT, "checks", "refusing.code.ts"), REFUSING)

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

async function settledBy(check: string, reach: Reach): Promise<readonly Appended[]> {
  const asked: Asking[] = []
  await storySettle(
    argvFor(check),
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
  })
})

test("a reading that is no keyed reading is refused", () => {
  const argv = [...argvFor("answering")]
  argv[5] = "[1,2]"
  expect(taken(argv, CALLED)).toHaveProperty("refused")
})

test("a roll is appended to the rolls beside the story's latest open turn", async () => {
  const appended = await settledBy("answering", reachOver([LATEST, FIRST]))
  expect(appended.map((one) => one.at)).toEqual([rollsAt(LATEST.at) ?? "no rolls"])
  const roll = rollIn(appended[0] as Appended)
  expect(roll.check).toBe("mechanic-check/answering")
  expect(roll.reading).toEqual({ asked: "a leap" })
  expect(roll.dice.said).toBe("2d10")
  expect(roll.dice.faces).toHaveLength(2)
  const answered = roll.answered as { readonly total: number; readonly asked: string }
  expect(answered.asked).toBe("a leap")
  expect(answered.total).toBe((roll.dice.faces[0] ?? 0) + (roll.dice.faces[1] ?? 0))
})

test("the first roll on the open turns is seeded by the turn it is settled on", async () => {
  const roll = rollIn((await settledBy("answering", reachOver([FIRST, LATEST])))[0] as Appended)
  expect(roll.seed).toBe(LATEST.slug)
  const shown = facesFrom(LATEST.slug, "2d10")
  if ("refused" in shown) throw new Error(shown.refused)
  expect(roll.dice.faces).toEqual(shown.answered.faces)
})

test("a roll is seeded by the hash of the roll before it on an earlier open turn", async () => {
  const before = '{"check":"mechanic-check/answering","seed":"earlier"}'
  const at = rollsAt(FIRST.at)
  if (at === null) throw new Error("a turn page has rolls beside it")
  writeFileSync(join(ROOT, at), `${before}\n`)
  const roll = rollIn((await settledBy("answering", reachOver([FIRST, LATEST])))[0] as Appended)
  expect(roll.seed).toBe(createHash("sha256").update(before).digest("hex"))
  rmSync(join(ROOT, at))
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
