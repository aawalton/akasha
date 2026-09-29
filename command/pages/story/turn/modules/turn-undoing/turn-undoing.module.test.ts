import { afterAll, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { besideListed } from "akasha/command/pages/story/turn/modules/turn-undoing/turn-undoing.module.code.ts"

const ROOT = mkdtempSync(join("/var/tmp", "turn-undoing-test-"))

afterAll(() => rmSync(ROOT, { recursive: true, force: true }))

test("the files beside a turn are its own files, never a folder such as its hold's lock", () => {
  const turns = join(ROOT, "turns")
  mkdirSync(join(turns, "one-003.story-turn-played.ts.lock"), { recursive: true })
  for (const name of [
    "one-003.story-turn-played.ts",
    "one-003.story-turn-played.prose.txt",
    "one-003.story-turn-played.edits.uncommitted.jsonl",
    "one-0030.story-turn-played.ts",
  ]) {
    writeFileSync(join(turns, name), "")
  }
  expect(besideListed(ROOT, "turns/one-003.story-turn-played.ts").toSorted()).toEqual([
    "turns/one-003.story-turn-played.prose.txt",
    "turns/one-003.story-turn-played.ts",
  ])
})
