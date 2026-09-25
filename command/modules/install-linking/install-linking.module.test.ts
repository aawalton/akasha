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
} from "akasha/command/modules/install-linking/install-linking.module.code.ts"
import { domain } from "akasha/domain/domain.page-type.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import {
  valuedAt,
  valuesOfType,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import {
  aProperty,
  aType,
  bodyOf,
  type Held,
  indexedRepo,
  type Named,
  pageOf,
  scratch as worldScratch,
} from "akasha/page/index/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"
import { codeRoot } from "akasha/page/modules/code-root/code-root.module.code.ts"
import { textAt } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { pageProperty } from "akasha/page/type/page-property/page-property.page-type.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

afterAll(worldScratch.sweep)

const TREE = "akasha"

const HERE = "linux"

const THERE = "macos"

const SCRIPT = "shell-script"

const PLACED = "provisioned-file"

const MODULE = "python-module"

const SHELL = "shell"

const CONTENT = "content"

const PYTHON = "python"

const LAUNCHER = "akasha-launcher"

const AT = "~/bin/one"

const DOMAIN_AT = `${pageType.slug}/${domain.slug}` as const

const PAGE_PROPERTY_AT = `${pageType.slug}/${pageProperty.slug}` as const

const HELD = "held-file"

const UNPLACED = "unplaced-file"

const UNLINKED = "unlinked-file"

const BODILESS = "bodiless-file"

const BODY = "held"

const INSTALL_PATH = "install-path"

const ONLY_ON = "only-on"

const PLACED_BY = "placed-by"

const idOf = (one: string): string => `01a09221-0000-7000-8000-00000000000${one}`

const kindId = (one: string): string => `01a09221-0001-7000-8000-00000000000${one}`

type Declared = { readonly slug: string; readonly fixed?: string }

const LINKED: Declared = { slug: PLACED_BY, fixed: "link" }

function aKind(
  id: string,
  slug: string,
  body: string | null,
  declares: readonly Declared[]
): Named {
  const properties = declares.map((one) => ({
    pagePropertySlug: one.slug,
    required: false,
    many: false,
    ...(one.fixed === undefined ? {} : { fixed: one.fixed }),
  }))
  const value: Held = { id, type: `${pageType.slug}/${pageType.slug}`, slug, extends: [DOMAIN_AT] }
  return [
    `${slug}.page-type.ts`,
    body === null ? { ...value, properties } : { ...value, properties, bodyPropertyId: body },
  ]
}

const VOCABULARY: readonly Named[] = [
  aKind(idOf("1"), SCRIPT, SHELL, [
    { slug: SHELL },
    { slug: INSTALL_PATH },
    { slug: ONLY_ON },
    LINKED,
  ]),
  aKind(idOf("2"), PLACED, CONTENT, [
    { slug: CONTENT },
    { slug: INSTALL_PATH },
    { slug: ONLY_ON },
    { slug: PLACED_BY },
  ]),
  aProperty(idOf("3"), SHELL, "file-property"),
  aProperty(idOf("4"), CONTENT, "file-property"),
  aProperty(idOf("5"), INSTALL_PATH, "text-property"),
  aProperty(idOf("6"), ONLY_ON, "text-property"),
  aProperty(idOf("7"), PLACED_BY, "text-property"),
  aType(idOf("8"), "text-property", [PAGE_PROPERTY_AT]),
  aKind(idOf("9"), MODULE, PYTHON, [
    { slug: PYTHON },
    { slug: INSTALL_PATH },
    { slug: ONLY_ON },
    LINKED,
  ]),
  aProperty(idOf("0"), PYTHON, "file-property"),
]

const KINDS_HELD: readonly Named[] = [
  aProperty(kindId("0"), BODY, "file-property"),
  aKind(kindId("1"), HELD, BODY, [{ slug: BODY }, { slug: INSTALL_PATH }, LINKED]),
  aKind(kindId("2"), UNPLACED, BODY, [{ slug: BODY }, LINKED]),
  aKind(kindId("3"), UNLINKED, BODY, [{ slug: BODY }, { slug: INSTALL_PATH }]),
  aKind(kindId("4"), BODILESS, null, [{ slug: BODY }, { slug: INSTALL_PATH }, LINKED]),
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
  const value = {
    id,
    type: `${pageType.slug}/${kind}`,
    slug,
    definition: "a thing",
    [property]: "sh",
    ...rest,
  }
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

function moduleOf(slug: string, rest: Held): Readonly<Record<string, string>> {
  return pagesOf(MODULE, PYTHON, slug, idOf("c"), rest, true)
}

function kindsWorld(): string {
  const held: Record<string, string> = Object.fromEntries(
    KINDS_HELD.map(([at, value]) => [`${TREE}/${at}`, bodyOf(value)])
  )
  return worldOf(
    held,
    pagesOf(HELD, BODY, "four", kindId("5"), { installPath: "~/bin/four" }, true),
    pagesOf(UNPLACED, BODY, "five", kindId("6"), { installPath: "~/bin/five" }, true),
    pagesOf(UNLINKED, BODY, "six", kindId("7"), { installPath: "~/bin/six" }, true),
    pagesOf(BODILESS, BODY, "seven", kindId("8"), { installPath: "~/bin/seven" }, true)
  )
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

test("a python module is linked where the page says", () => {
  const root = worldOf(moduleOf("three", { installPath: AT }))
  const home = outside()

  const said = linkedInPlace(root, home, HERE)

  expect(said.wrong).toEqual([])
  expect(readlinkSync(join(home, "bin/one"))).toBe(readsAs(root, MODULE, PYTHON, "three"))
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

test("a checkout the machine's launcher does not run links nothing into the home", () => {
  const root = worldOf(
    scriptOf(LAUNCHER, { installPath: "~/bin/akasha" }),
    placedOf("two", { installPath: "~/.held", placedBy: "link" })
  )
  const home = outside()
  const runs = outside()
  mkdirSync(join(home, "bin"), { recursive: true })
  symlinkSync(join(runs, "launcher.sh"), join(home, "bin/akasha"))

  const said = linkedInPlace(root, home, HERE)

  expect(said.wrong).toEqual([])
  expect(said.said.join("")).toContain("only the checkout this machine runs places links")
  expect(readlinkSync(join(home, "bin/akasha"))).toBe(join(runs, "launcher.sh"))
  expect(existsSync(join(home, ".held"))).toBe(false)
})

test("the checkout the machine's launcher runs places its links", () => {
  const root = worldOf(
    scriptOf(LAUNCHER, { installPath: "~/bin/akasha" }),
    placedOf("two", { installPath: "~/.held", placedBy: "link" })
  )
  const home = outside()
  linkedInPlace(root, home, HERE)

  const said = linkedInPlace(root, home, HERE)

  expect(said).toEqual({ said: [], wrong: [] })
  expect(readlinkSync(join(home, ".held"))).toBe(readsAs(root, PLACED, CONTENT, "two"))
})

test("a page type states a placing where that page type declares where its pages are reached", () => {
  const root = kindsWorld()

  const weighed = weighedIn(root, outside(), HERE)

  const four = weighed.placings.find((one) => one.page.endsWith(`four.${HELD}.ts`))
  expect(four?.file).toBe(join(TREE, besideOf(HELD, BODY, "four")))
})

test("a page type declaring no place its pages are reached places none of them", () => {
  const weighed = weighedIn(kindsWorld(), outside(), HERE)

  expect(weighed.placings.map((one) => one.page).join("")).not.toContain(UNPLACED)
  expect(weighed.wrong.join("")).not.toContain(UNPLACED)
})

test("a page is linked only where that page or its page type says it is placed by a link", () => {
  const weighed = weighedIn(kindsWorld(), outside(), HERE)

  expect(weighed.placings.map((one) => one.page).join("")).not.toContain(UNLINKED)
  expect(weighed.wrong.join("")).not.toContain(UNLINKED)
})

test("a page type naming no property holding its body has each page it places said as wrong", () => {
  const weighed = weighedIn(kindsWorld(), outside(), HERE)

  expect(weighed.placings.map((one) => one.page).join("")).not.toContain(BODILESS)
  expect(weighed.wrong.filter((one) => one.includes(BODILESS))).toHaveLength(1)
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

test("the shell scripts, Python modules and linked provisioned files are what is placed", () => {
  const root = codeRoot()
  const home = homedir()
  for (const on of [HERE, THERE]) {
    const meant = new Map<string, string>()
    for (const kind of [SCRIPT, MODULE, PLACED]) {
      for (const one of valuesOfType(root, kind)) {
        const at = textAt(one.value, "installPath")
        const only = textAt(one.value, "onlyOn")
        if (at === null || !at.startsWith("~/")) continue
        if (kind === PLACED && textAt(one.value, "placedBy") !== "link") continue
        if (only !== null && only !== "any" && only !== on) continue
        if (!meant.has(at)) meant.set(at, one.path)
      }
    }

    const placed = weighedIn(root, home, on).placings

    expect(placed.map((one) => one.page).sort()).toEqual([...meant.values()].sort())
  }
})

test("every file a placing names is there", () => {
  const root = codeRoot()

  const gone = weighedIn(root, homedir()).placings.filter(
    (one) => !existsSync(join(root, one.file))
  )

  expect(gone).toEqual([])
})
