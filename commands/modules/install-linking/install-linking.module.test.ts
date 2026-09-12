import { afterAll, expect, test } from "bun:test"
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readlinkSync,
  symlinkSync,
  writeFileSync,
} from "node:fs"
import { homedir } from "node:os"
import { join } from "node:path"
import {
  linkedInPlace,
  machineNow,
  weighedIn,
} from "akasha/commands/modules/install-linking/install-linking.module.code.ts"
import { codeRoot } from "akasha/pages/code-root/code-root.module.code.ts"
import {
  aProperty,
  aType,
  bodyOf,
  type Held,
  indexedRepo,
  type Named,
  pageOf,
  scratch as worldScratch,
} from "akasha/pages/indexes/fixture-world/fixture-world.module.code.ts"
import { valuedAt } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import { scratchWorld } from "akasha/utils/fs/scratching/scratching.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

afterAll(worldScratch.sweep)

const TREE = "akasha"

const HERE = "linux"

const THERE = "macos"

const SCRIPT = "shell-script"

const PLACED = "provisioned-file"

const SHELL = "shell"

const CONTENT = "content"

const LAUNCHER = "akasha-launcher"

const AT = "~/bin/one"

const idOf = (one: string): string => `01a09221-0000-7000-8000-00000000000${one}`

const VOCABULARY: readonly Named[] = [
  aType(idOf("1"), SCRIPT, ["page-type/domain"], [SHELL, "install-path", "only-on"]),
  aType(idOf("2"), PLACED, ["page-type/domain"], [CONTENT, "install-path", "only-on", "placed-by"]),
  aProperty(idOf("3"), SHELL, "file-property"),
  aProperty(idOf("4"), CONTENT, "file-property"),
  aProperty(idOf("5"), "install-path", "text-property"),
  aProperty(idOf("6"), "only-on", "text-property"),
  aProperty(idOf("7"), "placed-by", "text-property"),
  aType(idOf("8"), "text-property", ["page-type/page-property"]),
]

function besideOf(kind: string, property: string, slug: string): string {
  return `${slug}/${slug}.${kind}.${property}.sh`
}

function pagesOf(
  kind: string,
  property: string,
  slug: string,
  id: string,
  rest: Held,
  body: boolean
): Readonly<Record<string, string>> {
  const value = { id, pageTypeSlug: kind, slug, definition: "a thing", [property]: "sh", ...rest }
  const held: Record<string, string> = { [`${TREE}/${slug}/${slug}.${kind}.ts`]: pageOf(value) }
  if (body) held[`${TREE}/${besideOf(kind, property, slug)}`] = "echo held\n"
  return held
}

function worldOf(...named: readonly Readonly<Record<string, string>>[]): string {
  const held: Record<string, string> = Object.fromEntries(
    VOCABULARY.map(([at, value]) => [`${TREE}/${at}`, bodyOf(value)])
  )
  for (const one of named) Object.assign(held, one)
  return indexedRepo(held)
}

function scriptOf(slug: string, rest: Held, body = true): Readonly<Record<string, string>> {
  return pagesOf(SCRIPT, SHELL, slug, idOf("a"), rest, body)
}

function placedOf(slug: string, rest: Held): Readonly<Record<string, string>> {
  return pagesOf(PLACED, CONTENT, slug, idOf("b"), rest, true)
}

function outside(): string {
  return scratch.rootFor("akasha-install-linking-")
}

function readsAs(root: string, kind: string, property: string, slug: string): string {
  return join(root, TREE, besideOf(kind, property, slug))
}

test("a page saying where the file it holds is reached has that file linked there", () => {
  const root = worldOf(scriptOf("one", { installPath: AT, onlyOn: "any" }))
  const home = outside()

  const said = linkedInPlace(root, home, HERE)

  expect(said.wrong).toEqual([])
  expect(readlinkSync(join(home, "bin/one"))).toBe(readsAs(root, SCRIPT, SHELL, "one"))
  expect(said.said.join("")).toContain(join(home, "bin/one"))
})

test("a link naming a path that is gone is made to name the file the index says", () => {
  const root = worldOf(scriptOf("one", { installPath: AT, onlyOn: "any" }))
  const home = outside()
  mkdirSync(join(home, "bin"), { recursive: true })
  symlinkSync(join(home, "was-here"), join(home, "bin/one"))

  const said = linkedInPlace(root, home, HERE)

  expect(said.wrong).toEqual([])
  expect(readlinkSync(join(home, "bin/one"))).toBe(readsAs(root, SCRIPT, SHELL, "one"))
})

test("a link already naming that file is left as it is and says nothing", () => {
  const root = worldOf(scriptOf("one", { installPath: AT, onlyOn: "any" }))
  const home = outside()
  linkedInPlace(root, home, HERE)

  expect(linkedInPlace(root, home, HERE)).toEqual({ said: [], wrong: [] })
})

test("something there that is no link is left as it is and said as wrong", () => {
  const root = worldOf(scriptOf("one", { installPath: AT, onlyOn: "any" }))
  const home = outside()
  mkdirSync(join(home, "bin"), { recursive: true })
  writeFileSync(join(home, "bin/one"), "held")

  const said = linkedInPlace(root, home, HERE)

  expect(said.said).toEqual([])
  expect(said.wrong.join("")).toContain("rather than a link")
  expect(readFileSync(join(home, "bin/one"), "utf8")).toBe("held")
})

test("a body that is not there is said as wrong rather than linked to", () => {
  const root = worldOf(scriptOf("one", { installPath: AT, onlyOn: "any" }, false))
  const home = outside()

  const said = linkedInPlace(root, home, HERE)

  expect(said.said).toEqual([])
  expect(said.wrong).toHaveLength(1)
  expect(existsSync(join(home, "bin/one"))).toBe(false)
})

test("a placing a page states for another kind of machine is not made", () => {
  const root = worldOf(scriptOf("one", { installPath: AT, onlyOn: THERE }))
  const home = outside()

  expect(weighedIn(root, home, HERE).placings).toEqual([])
  expect(weighedIn(root, home, THERE).placings).toHaveLength(1)
})

test("a page naming no kind of machine is placed on every kind", () => {
  const root = worldOf(scriptOf("one", { installPath: AT }))
  const home = outside()

  expect(weighedIn(root, home, HERE).placings).toHaveLength(1)
  expect(weighedIn(root, home, THERE).placings).toHaveLength(1)
})

test("a provisioned file put by a copy has no link placed", () => {
  const root = worldOf(placedOf("two", { installPath: "~/.held", placedBy: "copy" }))

  expect(linkedInPlace(root, outside(), HERE)).toEqual({ said: [], wrong: [] })
})

test("a provisioned file put by a link is linked where the page says", () => {
  const root = worldOf(placedOf("two", { installPath: "~/.held", placedBy: "link" }))
  const home = outside()

  const said = linkedInPlace(root, home, HERE)

  expect(said.wrong).toEqual([])
  expect(readlinkSync(join(home, ".held"))).toBe(readsAs(root, PLACED, CONTENT, "two"))
})

test("a placing said anywhere but under the home is not made here", () => {
  const root = worldOf(placedOf("two", { installPath: "/etc/held.conf", placedBy: "link" }))

  expect(weighedIn(root, outside(), HERE).placings).toEqual([])
})

test("two pages naming one link place that link once", () => {
  const root = worldOf(
    scriptOf("one", { installPath: AT }),
    placedOf("two", { installPath: AT, placedBy: "link" })
  )

  expect(weighedIn(root, outside(), HERE).placings).toHaveLength(1)
})

test("a repository with no index has nothing weighed", () => {
  expect(weighedIn(outside(), outside(), HERE)).toEqual({ placings: [], wrong: [] })
})

test("the kind of machine is read off the platform", () => {
  expect(machineNow("darwin")).toBe(THERE)
  expect(machineNow("linux")).toBe(HERE)
})

test("the launcher this repository is reached by is among what is weighed", () => {
  const root = codeRoot()
  const page = valuedAt(root, SCRIPT, LAUNCHER).path

  const weighed = weighedIn(root, homedir())

  expect(weighed.wrong).toEqual([])
  expect(weighed.placings.map((one) => one.page)).toContain(page)
})

test("every file a placing names is there", () => {
  const root = codeRoot()

  const gone = weighedIn(root, homedir()).placings.filter(
    (one) => !existsSync(join(root, one.file))
  )

  expect(gone).toEqual([])
})
