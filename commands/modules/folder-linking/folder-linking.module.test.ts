import { afterAll, expect, test } from "bun:test"
import {
  mkdirSync,
  readdirSync,
  readFileSync,
  readlinkSync,
  symlinkSync,
  writeFileSync,
} from "node:fs"
import { join } from "node:path"
import {
  atHome,
  linkedOver,
} from "akasha/commands/modules/folder-linking/folder-linking.module.code.ts"
import { scratchWorld } from "akasha/commands/modules/scratching/scratching.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const PAGE = "one/one.domain.ts"

const WAS = "was/one.domain.ts"

const HOME = "/nowhere"

const ID = "01a08000-0000-7000-8000-000000000001"

function pageSaying(said: string): string {
  return `export const one = { id: "${ID}", pageTypeSlug: "domain", slug: "one", linkedAt: "${said}" }\n`
}

function repoOf(body: string): string {
  const root = scratch.rootFor("akasha-folder-linking-")
  mkdirSync(join(root, "one"), { recursive: true })
  writeFileSync(join(root, PAGE), body)
  return root
}

function outside(): string {
  return scratch.rootFor("akasha-linked-")
}

test("a page saying where its folder is reached has that folder linked there", () => {
  const at = join(outside(), "ops")
  const root = repoOf(pageSaying(at))

  const said = linkedOver(root, [{ from: WAS, to: PAGE }], HOME)

  expect(said.wrong).toEqual([])
  expect(readlinkSync(at)).toBe(join(root, "one"))
  expect(said.said.join("")).toContain(at)
})

test("a link already pointing elsewhere is taken away and made again", () => {
  const away = outside()
  const at = join(away, "ops")
  const root = repoOf(pageSaying(at))
  symlinkSync(join(away, "elsewhere"), at)

  const said = linkedOver(root, [{ from: WAS, to: PAGE }], HOME)

  expect(said.wrong).toEqual([])
  expect(readlinkSync(at)).toBe(join(root, "one"))
})

test("a link already pointing where it should is left alone", () => {
  const at = join(outside(), "ops")
  const root = repoOf(pageSaying(at))
  symlinkSync(join(root, "one"), at)

  const said = linkedOver(root, [{ from: WAS, to: PAGE }], HOME)

  expect(said.wrong).toEqual([])
  expect(said.said.join("")).toStartWith("left ")
  expect(readlinkSync(at)).toBe(join(root, "one"))
})

test("no half-written link is left beside the link placed", () => {
  const away = outside()
  const at = join(away, "ops")
  const root = repoOf(pageSaying(at))

  linkedOver(root, [{ from: WAS, to: PAGE }], HOME)

  expect(readdirSync(away)).toEqual(["ops"])
})

test("something there that is no link is left as it is and said as wrong", () => {
  const at = join(outside(), "ops")
  const root = repoOf(pageSaying(at))
  writeFileSync(at, "held")

  const said = linkedOver(root, [{ from: WAS, to: PAGE }], HOME)

  expect(said.said).toEqual([])
  expect(said.wrong.join("")).toContain("is no link")
  expect(readFileSync(at, "utf8")).toBe("held")
})

test("a page saying nothing about a link has no link placed", () => {
  const root = repoOf(`export const one = { id: "${ID}", pageTypeSlug: "domain", slug: "one" }\n`)

  expect(linkedOver(root, [{ from: WAS, to: PAGE }], HOME)).toEqual({ said: [], wrong: [] })
})

test("a path that is no page has no link placed", () => {
  const root = repoOf(pageSaying(join(outside(), "ops")))
  const moved = [{ from: "was/one.domain.code.ts", to: "one/one.domain.code.ts" }]

  expect(linkedOver(root, moved, HOME)).toEqual({ said: [], wrong: [] })
})

test("a path opening with a tilde is read under the home handed in", () => {
  const home = outside()
  const root = repoOf(pageSaying("~/held/ops"))

  const said = linkedOver(root, [{ from: WAS, to: PAGE }], home)

  expect(said.wrong).toEqual([])
  expect(readlinkSync(join(home, "held/ops"))).toBe(join(root, "one"))
})

test("two paths naming one link place that link once", () => {
  const at = join(outside(), "ops")
  const root = repoOf(pageSaying(at))
  const moved = [
    { from: WAS, to: PAGE },
    { from: "held/one.domain.ts", to: PAGE },
  ]

  expect(linkedOver(root, moved, HOME).said).toHaveLength(1)
})

test("a page that is not there is said as wrong rather than thrown", () => {
  const root = repoOf(pageSaying(join(outside(), "ops")))
  const moved = [{ from: "was/gone.domain.ts", to: "one/gone.domain.ts" }]

  const said = linkedOver(root, moved, HOME)

  expect(said.said).toEqual([])
  expect(said.wrong).toHaveLength(1)
})

test("a spelling with no tilde is left as it is", () => {
  expect(atHome("/held/ops", "/home/held")).toBe("/held/ops")
})
