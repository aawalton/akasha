import { afterAll, expect, test } from "bun:test"
import { mkdirSync, readFileSync, readlinkSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import {
  callsFor,
  infrastructureProvisionedFileInstall,
  type Placing,
  placedEach,
  type Ran,
  type Running,
  running,
  stoodFor,
  weighedIn,
} from "akasha/command/pages/infrastructure/provisioned-file-install/infrastructure-provisioned-file-install.command.code.ts"
import { domain } from "akasha/domain/domain.page-type.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
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
import { pageProperty } from "akasha/page/type/page-property/page-property.page-type.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

afterAll(worldScratch.sweep)

const TREE = "akasha"

const HERE = "linux"

const THERE = "macos"

const PLACED = "provisioned-file"

const CONTENT = "content"

const BODY = "held/one.conf"

const NOWHERE = "/etc/held.conf"

const DOMAIN_AT = `${pageType.slug}/${domain.slug}` as const

const PAGE_PROPERTY_AT = `${pageType.slug}/${pageProperty.slug}` as const

const idOf = (one: string): string => `01a09aa0-0000-7000-8000-00000000000${one}`

const VOCABULARY: readonly Named[] = [
  aType(
    idOf("1"),
    PLACED,
    [DOMAIN_AT],
    [CONTENT, "install-path", "only-on", "placed-by", "reload-with"]
  ),
  aProperty(idOf("2"), CONTENT, "file-property"),
  aProperty(idOf("3"), "install-path", "text-property"),
  aProperty(idOf("4"), "only-on", "text-property"),
  aProperty(idOf("5"), "placed-by", "text-property"),
  aProperty(idOf("6"), "reload-with", "text-property"),
  aType(idOf("7"), "text-property", [PAGE_PROPERTY_AT]),
]

function pageAt(slug: string, rest: Held): Readonly<Record<string, string>> {
  const value = {
    id: idOf("8"),
    pageTypeSlug: PLACED,
    slug,
    definition: "a thing",
    content: "conf",
    ...rest,
  }
  return {
    [`${TREE}/${slug}/${slug}.${PLACED}.ts`]: pageOf(value),
    [`${TREE}/${slug}/${slug}.${PLACED}.${CONTENT}.conf`]: "held\n",
  }
}

function worldOf(named: Readonly<Record<string, string>>): string {
  const held: Record<string, string> = Object.fromEntries(
    VOCABULARY.map(([at, value]) => [`${TREE}/${at}`, bodyOf(value)])
  )
  return indexedRepo(Object.assign(held, named))
}

type Outside = {
  readonly root: string
  readonly at: string
}

function heldIn(): Outside {
  const root = scratch.rootFor("akasha-provisioned-file-install-")
  mkdirSync(join(root, "held"), { recursive: true })
  writeFileSync(join(root, BODY), "held\n")
  return { root, at: join(root, "outside/one.conf") }
}

function placingAt(at: string, by: string, reload: string | null): Placing {
  return { page: "held/one.provisioned-file.ts", file: BODY, at, by, reload }
}

function standingsOf(held: Outside, ...placings: readonly Placing[]): ReturnType<typeof stoodFor> {
  return stoodFor(held.root, { placings, wrong: [] })
}

const NOTHING: Ran = { code: 0, out: "" }

const quiet = (): undefined => undefined

function watching(said: string[][]): Running {
  return (argv) => {
    said.push([...argv])
    return NOTHING
  }
}

test("a body a page says goes under the home is left to the landing", () => {
  const root = worldOf(pageAt("one", { installPath: "~/.held", placedBy: "link", onlyOn: "any" }))

  expect(weighedIn(root, HERE).placings).toEqual([])
})

test("a body a page says goes outside the home is weighed", () => {
  const root = worldOf(pageAt("one", { installPath: NOWHERE, placedBy: "link", onlyOn: "linux" }))

  const weighed = weighedIn(root, HERE)

  expect(weighed.wrong).toEqual([])
  expect(weighed.placings).toHaveLength(1)
  expect(weighed.placings[0]?.at).toBe(NOWHERE)
})

test("a page for another kind of machine is weighed on that machine alone", () => {
  const root = worldOf(pageAt("one", { installPath: NOWHERE, placedBy: "link", onlyOn: THERE }))

  expect(weighedIn(root, HERE).placings).toEqual([])
  expect(weighedIn(root, THERE).placings).toHaveLength(1)
})

test("a page saying no path is weighed nowhere", () => {
  const root = worldOf(pageAt("one", { placedBy: "link", onlyOn: "any" }))

  expect(weighedIn(root, HERE).placings).toEqual([])
})

test("a repository with no index has nothing weighed", () => {
  expect(weighedIn(heldIn().root, HERE)).toEqual({ placings: [], wrong: [] })
})

test("a link is made where the page says, and what the page states is run after", () => {
  const held = heldIn()
  const did: string[] = []

  const done = placedEach(
    held.root,
    standingsOf(held, placingAt(held.at, "link", "true")).standings,
    running,
    quiet,
    did
  )

  expect(done.refused).toEqual([])
  expect(readlinkSync(held.at)).toBe(join(held.root, BODY))
  expect(did).toEqual([`linked ${held.at} to ${BODY}`, "ran true"])
})

test("a link already naming that body is left as it was and placed no second time", () => {
  const held = heldIn()
  const one = placingAt(held.at, "link", "true")
  placedEach(held.root, standingsOf(held, one).standings, running, quiet, [])

  const stood = standingsOf(held, one)

  expect(stood.standings[0]?.already).toBe(true)
  expect(stood.standings[0]?.saying).toContain("already linked")
})

test("a copy is made, and is weighed after by its bytes", () => {
  const held = heldIn()
  const one = placingAt(held.at, "copy", null)
  const did: string[] = []

  placedEach(held.root, standingsOf(held, one).standings, running, quiet, did)

  expect(did).toEqual([`copied ${held.at} from ${BODY}`])
  expect(readFileSync(held.at, "utf8")).toBe("held\n")
  expect(standingsOf(held, one).standings[0]?.already).toBe(true)
})

test("a copy whose bytes have drifted is copied again", () => {
  const held = heldIn()
  mkdirSync(dirname(held.at), { recursive: true })
  writeFileSync(held.at, "was\n")

  expect(standingsOf(held, placingAt(held.at, "copy", null)).standings[0]?.already).toBe(false)
})

test("a file of its own where a link is stated is refused and nothing is placed", () => {
  const held = heldIn()
  mkdirSync(dirname(held.at), { recursive: true })
  writeFileSync(held.at, "was\n")

  const stood = standingsOf(held, placingAt(held.at, "link", null))

  expect(stood.standings).toEqual([])
  expect(stood.wrong.join("")).toContain("rather than a link")
})

test("a body that is not there is refused rather than placed from", () => {
  const held = heldIn()
  const one = { ...placingAt(held.at, "link", null), file: "held/gone.conf" }

  const stood = standingsOf(held, one)

  expect(stood.standings).toEqual([])
  expect(stood.wrong.join("")).toContain("is not there")
})

test("a reload two pages state alike is run once", () => {
  const held = heldIn()
  const one = placingAt(held.at, "link", "reload me")
  const two = placingAt(join(held.root, "outside/two.conf"), "link", "reload me")
  const said: string[][] = []

  placedEach(held.root, standingsOf(held, one, two).standings, watching(said), quiet, [])

  expect(said.filter((argv) => argv[0] === "sh")).toHaveLength(1)
})

test("a body already where its page says runs no reload", () => {
  const held = heldIn()
  const one = placingAt(held.at, "link", "reload me")
  placedEach(held.root, standingsOf(held, one).standings, running, quiet, [])
  const said: string[][] = []
  const did: string[] = []

  placedEach(held.root, standingsOf(held, one).standings, watching(said), quiet, did)

  expect(said).toEqual([])
  expect(did).toEqual([])
})

test("each placing is said before that placing is made", () => {
  const held = heldIn()
  const order: string[] = []
  const run: Running = (argv) => {
    order.push(`ran ${argv[0] ?? ""}`)
    return NOTHING
  }

  placedEach(
    held.root,
    standingsOf(held, placingAt(held.at, "link", null)).standings,
    run,
    (what) => {
      order.push(`said ${what}`)
    },
    []
  )

  expect(order[0]).toBe(`said link ${held.at} to ${BODY}`)
  expect(order[1]).toBe("ran mkdir")
})

test("a placing a run refused is named in the refusals and said as done nowhere", () => {
  const held = heldIn()
  const did: string[] = []

  const done = placedEach(
    held.root,
    standingsOf(held, placingAt(held.at, "link", "true")).standings,
    () => ({ code: 1, out: "no" }),
    quiet,
    did
  )

  expect(did).toEqual([])
  expect(done.refused).toHaveLength(1)
})

test("root is asked for only where the folder the body goes in is not ours to write", () => {
  const held = heldIn()
  const one = placingAt(held.at, "link", null)

  expect(callsFor(held.root, one, false).every((argv) => argv[0] !== "sudo")).toBe(true)
  expect(callsFor(held.root, one, true).every((argv) => argv[0] === "sudo")).toBe(true)
})

const GIVEN: Given = {
  root: worldOf(pageAt("one", { installPath: NOWHERE, placedBy: "link", onlyOn: "any" })),
  calledAs: "akasha infrastructure provisioned-file-install",
  from: process.cwd(),
  writer: null,
  agentId: null,
}

test("a flag this does not take is refused by name", async () => {
  const said: string[][] = []

  const answer = await infrastructureProvisionedFileInstall(
    ["--apply"],
    GIVEN,
    watching(said),
    quiet
  )

  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("`--apply`")
  expect(said).toEqual([])
})

test("a planning run places nothing and runs nothing", async () => {
  const said: string[][] = []

  const answer = await infrastructureProvisionedFileInstall(
    ["--plan"],
    GIVEN,
    watching(said),
    quiet
  )

  expect(answer.code).toBe(0)
  expect(said).toEqual([])
  const held = ["left\t", "place\t", "plan\t", "nothing\t"]
  for (const line of answer.report) expect(held.some((one) => line.startsWith(one))).toBe(true)
})
