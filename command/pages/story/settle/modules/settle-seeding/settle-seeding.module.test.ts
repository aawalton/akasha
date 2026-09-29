import { afterAll, expect, test } from "bun:test"
import { createHash } from "node:crypto"
import { mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import {
  lineBefore,
  seedAfter,
  unmadeLogged,
} from "akasha/command/pages/story/settle/modules/settle-seeding/settle-seeding.module.code.ts"
import { said } from "akasha/git/modules/running/git-running.module.code.ts"

const ROOT = mkdtempSync(join("/var/tmp", "settle-seeding-test-"))

afterAll(() => rmSync(ROOT, { recursive: true, force: true }))

const TURN = "the-saga-00-012"

const LINE = '{"check":"world-check/growth","answered":{"level":1}}'

function hashOf(...parts: readonly string[]): string {
  return createHash("sha256").update(parts.join("\n")).digest("hex")
}

test("a turn never unmade is seeded by the line before, the turn and the place", () => {
  expect(seedAfter(LINE, TURN, 2, 0)).toBe(hashOf(LINE, TURN, "2"))
  expect(seedAfter(null, TURN, 0, 0)).toBe(TURN)
})

test("a turn made again after a rewind never rolls a seed it rolled before", () => {
  const seen = new Set([seedAfter(null, TURN, 0, 0), seedAfter(LINE, TURN, 0, 0)])
  for (const unmade of [1, 2]) {
    for (const before of [null, LINE]) {
      const seed = seedAfter(before, TURN, 0, unmade)
      expect(seen.has(seed)).toBe(false)
      seen.add(seed)
    }
  }
})

test("the line before is the last line on the latest turn holding outcomes", () => {
  const bodies: Record<string, string> = { a: "one\ntwo\n", c: "" }
  const read = (path: string) => bodies[path] ?? null
  const turns = [
    { position: 1, outcomes: "a" },
    { position: 2, outcomes: "b" },
    { position: 3, outcomes: "c" },
  ]
  expect(lineBefore(read, turns)).toBe("two")
})

function git(...argv: readonly string[]): undefined {
  const named = ["-c", "user.name=t", "-c", "user.email=t@t", "-c", "commit.gpgsign=false"]
  said(ROOT, [...named, ...argv])
  return undefined
}

test("each commit taking away a turn's page or outcomes unmakes it once", () => {
  const page = `${TURN}.story-turn-played.ts`
  const outcomes = `${TURN}.story-turn-played.outcomes.jsonl`
  git("init", "-q")
  writeFileSync(join(ROOT, page), "a turn\n")
  writeFileSync(join(ROOT, outcomes), `${LINE}\n`)
  git("add", "-A")
  git("commit", "-q", "-m", "made")
  expect(unmadeLogged(ROOT, [page, outcomes])).toBe(0)
  rmSync(join(ROOT, outcomes))
  git("commit", "-q", "-a", "-m", "rewound")
  writeFileSync(join(ROOT, outcomes), `${LINE}\n`)
  git("add", "-A")
  git("commit", "-q", "-m", "settled again")
  rmSync(join(ROOT, outcomes))
  rmSync(join(ROOT, page))
  git("commit", "-q", "-a", "-m", "taken back")
  expect(unmadeLogged(ROOT, [page, outcomes])).toBe(2)
})
