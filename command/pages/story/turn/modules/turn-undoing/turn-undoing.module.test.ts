import { afterAll, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import {
  besideListed,
  engineAt,
  TURN_UNDOING,
  undoingOf,
} from "akasha/command/pages/story/turn/modules/turn-undoing/turn-undoing.module.code.ts"
import { said } from "akasha/git/modules/running/git-running.module.code.ts"

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

const REPO = join(ROOT, "repo")

const FOLDERS = { story: "worlds/w/stories/played/otherwhere/", world: "worlds/w/" }

const SLUG = "otherwhere-00-011"

const AT = `${FOLDERS.story}turns/${SLUG}.story-turn-played.ts`

const HALL_AT = `${FOLDERS.world}lore/the-hall.lore.ts`

const HALL_BEFORE = 'facts: ["The hall is cold."], knowers: []\n'

const HALL_RECORDED =
  'facts: ["The hall is cold.", "Mara hid the key."], knowers: ["character-player/mara"]\n'

const WHO = ["-c", "user.name=t", "-c", "user.email=t@t", "-c", "commit.gpgsign=false"]

function git(...argv: string[]): string {
  return said(REPO, [...WHO, ...argv]).trim()
}

function committed(subject: string, bodies: Readonly<Record<string, string>>) {
  for (const [path, body] of Object.entries(bodies)) {
    mkdirSync(join(REPO, dirname(path)), { recursive: true })
    writeFileSync(join(REPO, path), body)
  }
  git("add", "-A")
  git("commit", "--no-verify", "-q", "-m", subject)
}

mkdirSync(REPO)
git("init", "-q")
const SETTLING_AT = `${FOLDERS.story}mechanics/checks/growth.world-check.settling.code.ts`

committed("the world opens", { [HALL_AT]: HALL_BEFORE, [SETTLING_AT]: "a plain address\n" })
committed("3 writes arrived together, so they land together", {
  [AT]: "made\n",
  "agents/one.ts": "one\n",
})
committed(`${SLUG} moves from world-builder to game-master`, { [AT]: "at game-master\n" })
committed("Read the essence page's address in growth settling off the imported page", {
  [SETTLING_AT]: "the address read off the imported page\n",
})
committed(`${SLUG} moves from recorders to recorders`, {
  [AT]: "recorded\n",
  [HALL_AT]: HALL_RECORDED,
})
committed(`${SLUG} moves from recorders to player`, { [AT]: "at player\n" })

const TURN = { at: AT, slug: SLUG, value: {} }

test("a turn made in a batched commit has the lore its recorders landed put back, and no engine fix", () => {
  expect(undoingOf(TURN_UNDOING, REPO, TURN, FOLDERS)).toEqual({
    commits: expect.any(Array),
    restored: [
      { path: HALL_AT, body: HALL_BEFORE },
      { path: AT, body: null },
    ],
  })
})

test("a story's checks, code, tests and page types are the engine", () => {
  expect(engineAt(SETTLING_AT)).toBe(true)
  expect(engineAt("worlds/w/mechanics/mana/mana.page-type.ts")).toBe(true)
  expect(engineAt(HALL_AT)).toBe(false)
  expect(engineAt(AT)).toBe(false)
})

test("a file only ever appended to is marked to be written whole", () => {
  const reach = { ...TURN_UNDOING, appendsOnly: (_root: string, path: string) => path === HALL_AT }
  expect(undoingOf(reach, REPO, TURN, FOLDERS)).toMatchObject({
    restored: [
      { path: HALL_AT, body: HALL_BEFORE, whole: true },
      { path: AT, body: null },
    ],
  })
})

test("a turn not yet at player is undone up to the latest commit", () => {
  expect(undoingOf(TURN_UNDOING, REPO, TURN, FOLDERS, false)).toMatchObject({
    restored: [
      { path: HALL_AT, body: HALL_BEFORE },
      { path: AT, body: null },
    ],
  })
})

test("a history git cannot read refuses and says so", () => {
  const refused = undoingOf(TURN_UNDOING, join(ROOT, "no-repo"), TURN, FOLDERS)
  expect(refused).toMatchObject({ refused: expect.stringContaining("git could not read") })
})
