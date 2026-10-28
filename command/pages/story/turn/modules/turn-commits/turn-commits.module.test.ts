import { afterAll, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import {
  addedLogged,
  bodyCommitted,
} from "akasha/command/pages/story/turn/modules/turn-commits/turn-commits.module.code.ts"
import { said } from "akasha/git/modules/running/git-running.module.code.ts"

const ROOT = mkdtempSync(join("/var/tmp", "turn-commits-test-"))

afterAll(() => rmSync(ROOT, { recursive: true, force: true }))

const TURN = "stories/otherwhere/turns/otherwhere-00-011.story-turn-played.ts"

const WHO = ["-c", "user.name=t", "-c", "user.email=t@t", "-c", "commit.gpgsign=false"]

function git(...argv: string[]): string {
  return said(ROOT, [...WHO, ...argv]).trim()
}

function committed(subject: string, bodies: Readonly<Record<string, string>>): string {
  for (const [path, body] of Object.entries(bodies)) {
    mkdirSync(join(ROOT, dirname(path)), { recursive: true })
    writeFileSync(join(ROOT, path), body)
  }
  git("add", "-A")
  git("commit", "--no-verify", "-q", "-m", subject)
  return git("rev-parse", "HEAD")
}

git("init", "-q")
committed("the story opens", { "stories/otherwhere/story.ts": "a story\n" })
const BATCH = committed("3 writes arrived together, so they land together", {
  [TURN]: "made\n",
  "agents/one.ts": "one\n",
})
committed("otherwhere-00-011 moves from recorders to player", { [TURN]: "at player\n" })

test("the commit adding a turn's page is found whatever its message says", () => {
  expect(addedLogged(ROOT, TURN)).toBe(BATCH)
})

test("a page no commit added has no commit adding it", () => {
  expect(addedLogged(ROOT, "stories/otherwhere/turns/nothing.ts")).toBeNull()
})

test("a file's body at a commit is the body that commit gave it", () => {
  expect(bodyCommitted(ROOT, BATCH, TURN)).toBe("made\n")
})

test("a git that fails throws rather than finding no commit", () => {
  expect(() => addedLogged(join(ROOT, "no-such-folder"), TURN)).toThrow()
})
