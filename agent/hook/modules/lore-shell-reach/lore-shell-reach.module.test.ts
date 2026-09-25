import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { shellReaches } from "akasha/agent/hook/modules/lore-shell-reach/lore-shell-reach.module.code.ts"
import { storeIn, TREES } from "akasha/file/modules/git-place/git-place.module.code.ts"
import { scratchWorld } from "akasha/file/system/modules/scratching/scratching.module.code.ts"
import {
  LORE_AT,
  LORE_NAME,
  loreWorld,
} from "akasha/story/lore-disclosure/modules/lore-withholding/lore-withholding.module.test-fixtures.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const root = loreWorld(scratch)

const WITHHELD: readonly string[] = [LORE_AT]

const OTHER = "agent/seat/pages/other/other.seat.ts"

function reaches(command: string, from: string = root): boolean {
  return shellReaches(command, from, root, WITHHELD)
}

test("a line naming the page's path is refused", () => {
  expect(reaches(`cat ${LORE_AT}`)).toBe(true)
  expect(reaches(`head -n 5 ${join(root, LORE_AT)}`)).toBe(true)
})

test("a line naming the page's file name anywhere is refused", () => {
  expect(reaches(`echo ${LORE_NAME}`)).toBe(true)
  expect(reaches(`find . -name ${LORE_NAME}`)).toBe(true)
})

test("a path hidden behind a colon or an equals sign is refused", () => {
  const folder = dirname(LORE_AT)
  expect(reaches(`git show HEAD:${folder}/../lore/./${LORE_NAME.slice(0, 3)}*`)).toBe(true)
  expect(reaches(`tool --input=${folder}/*.ts`)).toBe(true)
})

test("a glob matching the page is refused", () => {
  expect(reaches("cat story/*/pages/held/lore/*")).toBe(true)
  expect(reaches("ls story/world/pages/*/lore/*.ts")).toBe(true)
})

test("a glob matching a folder above the page is refused only for a reader", () => {
  expect(reaches("grep -r needle st*")).toBe(true)
  expect(reaches("ls st*")).toBe(false)
})

test("a reader handed a folder holding the page is refused", () => {
  expect(reaches("grep -r needle story")).toBe(true)
  expect(reaches("tar czf out.tgz story/world")).toBe(true)
  expect(reaches(`cp -r . ${join(scratch.rootFor("lore-shell-away-"), "copy")}`)).toBe(true)
})

test("a folder holding a copy of the page in another tree is refused", () => {
  const copy = storeIn(root, TREES, "other", LORE_AT)
  mkdirSync(dirname(copy), { recursive: true })
  writeFileSync(copy, "copy\n")
  expect(reaches(`grep -r needle ${storeIn(root, TREES)}`)).toBe(true)
})

test("a recursive search naming no path searches the folder it runs in", () => {
  expect(reaches("rg needle")).toBe(true)
  expect(reaches("grep -rn needle")).toBe(true)
  expect(reaches("find -type f")).toBe(true)
  expect(reaches("rg needle", join(root, "agent"))).toBe(false)
})

test("a change of folder earlier in the line moves the search", () => {
  expect(reaches("cd ../story && grep -r needle .", join(root, "agent"))).toBe(true)
  expect(reaches("cd agent && rg needle")).toBe(false)
})

test("a line feeding names to a runner reads every folder it names", () => {
  expect(reaches("ls story | xargs cat")).toBe(true)
  expect(reaches("ls story")).toBe(false)
})

test("a git call printing bodies across the tree is refused", () => {
  expect(reaches("git show HEAD")).toBe(true)
  expect(reaches("git log -p")).toBe(true)
  expect(reaches("git diff")).toBe(true)
  expect(reaches("git grep needle")).toBe(true)
  expect(reaches("git archive HEAD")).toBe(true)
  expect(reaches("git stash show -p")).toBe(true)
  expect(reaches("git cat-file -p 0123abcd")).toBe(true)
})

test("a git call limited away from the page, or printing no body, is let through", () => {
  expect(reaches("git log --oneline")).toBe(false)
  expect(reaches("git show --stat HEAD")).toBe(false)
  expect(reaches("git diff -- agent")).toBe(false)
  expect(reaches("git log -p -- agent")).toBe(false)
  expect(reaches("git grep needle -- agent")).toBe(false)
  expect(reaches(`git show HEAD:${OTHER}`)).toBe(false)
  expect(reaches("git cat-file -t HEAD")).toBe(false)
})

test("a line reaching nothing withheld is let through", () => {
  expect(reaches(`cat ${OTHER}`)).toBe(false)
  expect(reaches("grep -r needle agent")).toBe(false)
  expect(reaches("akasha change apply")).toBe(false)
})

test("nothing is refused where nothing is withheld", () => {
  expect(shellReaches(`cat ${LORE_AT}`, root, root, [])).toBe(false)
})
