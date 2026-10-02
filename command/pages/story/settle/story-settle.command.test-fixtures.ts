import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import type { Asking } from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import {
  type Reach,
  type Roll,
  storySettle,
  type Turn,
} from "akasha/command/pages/story/settle/story-settle.command.code.ts"
import type { TurnStep } from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"

export const CALLED = "akasha story settle"

export const ROOT = mkdtempSync(join("/var/tmp", "story-settle-test-"))

export const FIRST: Turn = {
  at: "turns/the-saga-00-001.story-turn-played.ts",
  slug: "the-saga-00-001",
  position: 1,
}

export const LATEST: Turn = {
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

writeFileSync(
  join(ROOT, "checks", "scoring.code.ts"),
  'export function settled() {\n  return { answered: { change: 3 } }\n}\nexport function added(reading, answered) {\n  return [{ page: `world-relationship/${reading.character}`, key: "relationshipPoints", by: answered.change }]\n}\n'
)

export const HER_AT = "pages/her.world-relationship.ts"

const KEPT_AT = "pages/kept.world-relationship.ts"

export function reachOver(turns: readonly Turn[], unmade = 0, step: TurnStep = "writer"): Reach {
  return {
    turnsOf: (_root, story) => (story === "the-saga" ? turns : []),
    settlingAt: (_root, check) => (check === "nothing" ? null : `checks/${check}.code.ts`),
    pageAt: (_root, page) => (page === "world-relationship/her" ? HER_AT : null),
    keptPageAt: (_root, _agentId, page) => (page === "world-relationship/kept" ? KEPT_AT : null),
    unmadeOf: () => unmade,
    stepOf: () => step,
  }
}

export const GIVEN: Given = { root: ROOT, calledAs: CALLED, from: "", writer: null, agentId: null }

const APPLIED = {
  base: "",
  landed: [],
  formatted: [],
  said: [],
  wrong: [],
  commit: "a-commit",
}

export function argvFor(check: string): readonly string[] {
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

export type Appended = { readonly at: string; readonly content: string }

export async function answeredBy(argv: readonly string[], reach: Reach) {
  const asked: Asking[] = []
  const answer = await storySettle(
    argv,
    GIVEN,
    async (_root, held) => {
      asked.push(...held)
      return APPLIED
    },
    reach
  )
  return { answer, appended: asked.map((one) => one.given as Appended) }
}

export async function settledBy(
  check: string,
  reach: Reach,
  argv: readonly string[] = argvFor(check)
): Promise<readonly Appended[]> {
  return (await answeredBy(argv, reach)).appended
}

export function rollIn(appended: Appended): Roll {
  return JSON.parse(appended.content) as Roll
}
