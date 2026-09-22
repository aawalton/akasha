import { afterAll, expect, test } from "bun:test"
import {
  type Held,
  pathsNamed,
} from "akasha/check/code/pages/no-unused-modules/modules/path-spelling/path-spelling.module.code.ts"
import {
  change,
  readingOver,
  wrote,
} from "akasha/check/test-fixtures/scratch/check-scratch.test-fixture.code.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const PAGE_AT = "akasha/modules/held/held.module.ts"

const CODE_AT = "akasha/modules/held/held.module.code.ts"

const SCRIPT_AT = "akasha/scripts/runner/runner.shell-script.shell.sh"

const OWN: readonly Held[] = [{ page: PAGE_AT, files: [PAGE_AT, CODE_AT] }]

function rooted(naming: Readonly<Record<string, string>>): string {
  const root = scratch.rootFor("akasha-path-spelling-")
  wrote(root, {
    [PAGE_AT]: 'export const held = { slug: "held" }\n',
    [CODE_AT]: "export const held = 1\n",
    ...naming,
  })
  return root
}

function named(root: string, held: readonly Held[] = OWN): ReadonlySet<string> {
  return pathsNamed(root, readingOver(change(root, [])), held)
}

test("a module a settings file names by path is named", () => {
  const root = rooted({ "bunfig.toml": `preload = ["${CODE_AT}"]\n` })

  expect([...named(root)]).toEqual([PAGE_AT])
})

test("a module a manifest names by path is named", () => {
  const root = rooted({ "package.json": `{ "main": "./${CODE_AT}" }\n` })

  expect([...named(root)]).toEqual([PAGE_AT])
})

test("a module a script names by path is named", () => {
  const root = rooted({ [SCRIPT_AT]: `bun "$ROOT/${CODE_AT}"\n` })

  expect([...named(root)]).toEqual([PAGE_AT])
})

test("a module a container recipe names by path is named", () => {
  const root = rooted({ Containerfile: `COPY ${CODE_AT} ./held.ts\n` })

  expect([...named(root)]).toEqual([PAGE_AT])
})

test("a path pieced together names no module", () => {
  const root = rooted({ [SCRIPT_AT]: 'bun "${DIR}/../held/held.module.code.ts"\n' })

  expect([...named(root)]).toEqual([])
})

test("a path a note names names no module", () => {
  const root = rooted({ "akasha/notes.md": `run ${CODE_AT} by hand\n` })

  expect([...named(root)]).toEqual([])
})

test("a path a body spelled uncommitted names names no module", () => {
  const root = rooted({ "akasha/opened.state.uncommitted.json": `["${CODE_AT}"]\n` })

  expect([...named(root)]).toEqual([])
})

test("a path only the module's own files hold names no module", () => {
  const root = rooted({})

  expect([...named(root)]).toEqual([])
})

test("a run asking after no module names nothing", () => {
  const root = rooted({ "bunfig.toml": `preload = ["${CODE_AT}"]\n` })

  expect(named(root, []).size).toBe(0)
})
