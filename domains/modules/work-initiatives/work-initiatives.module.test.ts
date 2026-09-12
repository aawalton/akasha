import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { initiativesDrawn } from "akasha/domains/modules/work-initiatives/work-initiatives.module.code.ts"
import {
  idFiled,
  listedFiled,
  valueAlsoFiled,
} from "akasha/pages/indexes/filing/index-filing.module.code.ts"
import { relationFiled } from "akasha/pages/indexes/reading/index-reading.module.test-fixtures.ts"
import { scratchWorld } from "akasha/utils/fs/scratching/scratching.module.code.ts"

const ONE = "01a04e9f-0000-7000-8000-00000000000a"

const TWO = "01a04e9f-0000-7000-8000-00000000000b"

const THREE = "01a04e9f-0000-7000-8000-00000000000c"

const INITIATIVE = "initiative"

const INITIATIVE_TYPE = "01a04e58-5735-72b4-b945-56366461c776"

const PARENT_PROPERTY = "01a04e58-5735-7668-9aee-b2da5c7b346a"

const PARENT = "initiative-parent"

const PARENT_KEY = "parent"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function pathFor(slug: string, typeSlug: string = INITIATIVE): string {
  return `akasha/domain-system/initiative/initiatives/${slug}.${typeSlug}.ts`
}

function worldFor(typeSlug: string = INITIATIVE): string {
  const root = scratch.rootFor("akasha-work-")
  idFiled(root, INITIATIVE_TYPE, [
    { path: `akasha/domain-system/initiative/${typeSlug}.page-type.ts`, id: INITIATIVE_TYPE },
  ])
  idFiled(root, PARENT_PROPERTY, [
    {
      path: `akasha/domain-system/initiative/properties/${PARENT}.relation-property.ts`,
      id: PARENT_PROPERTY,
    },
  ])
  return root
}

function filing(root: string, slug: string, id: string, typeSlug: string = INITIATIVE): undefined {
  const path = pathFor(slug, typeSlug)
  listedFiled(root, typeSlug, slug, [{ path, id }])
  valueAlsoFiled(root, typeSlug, [{ path, value: { id, slug } }])
}

function under(root: string, child: string, parent: string): undefined {
  relationFiled(root, parent, PARENT, child, [{ path: pathFor("naming"), id: child }])
}

test("every initiative the index files is drawn", () => {
  const root = worldFor()
  filing(root, "amy-one", ONE)
  filing(root, "amy-two", TWO)
  expect(initiativesDrawn(root).map((one) => one.slug)).toEqual(["amy-one", "amy-two"])
})

test("every initiative is drawn though the page type saying what one is carries another slug", () => {
  const root = worldFor("endeavour")
  filing(root, "amy-one", ONE, "endeavour")
  expect(initiativesDrawn(root).map((one) => one.slug)).toEqual(["amy-one"])
})

test("an index filing no initiative draws nothing", () => {
  const root = worldFor()
  expect(initiativesDrawn(root)).toEqual([])
})

test("an index naming no page type for initiatives refuses rather than drawing none", () => {
  const root = scratch.rootFor("akasha-work-")
  expect(() => initiativesDrawn(root)).toThrow("could not be answered")
})

test("the edge is filed under the parent, so the child is the one that sits under", () => {
  const root = worldFor()
  filing(root, "amy-parent", ONE)
  filing(root, "amy-child", TWO)
  under(root, TWO, ONE)
  const drawn = initiativesDrawn(root)
  expect(drawn.find((one) => one.slug === "amy-child")?.parent).toBe("amy-parent")
  expect(drawn.find((one) => one.slug === "amy-parent")?.parent).toBe(null)
})

test("an edge filed under the key the page spells rather than the property's own slug is no edge", () => {
  const root = worldFor()
  filing(root, "amy-parent", ONE)
  filing(root, "amy-child", TWO)
  relationFiled(root, ONE, PARENT_KEY, TWO, [{ path: pathFor("naming"), id: TWO }])
  expect(initiativesDrawn(root).find((one) => one.slug === "amy-child")?.parent).toBe(null)
})

test("an index saying no slug for the parent property refuses rather than drawing no parent", () => {
  const root = scratch.rootFor("akasha-work-")
  idFiled(root, INITIATIVE_TYPE, [
    { path: `akasha/domain-system/initiative/${INITIATIVE}.page-type.ts`, id: INITIATIVE_TYPE },
  ])
  filing(root, "amy-one", ONE)
  expect(() => initiativesDrawn(root)).toThrow(PARENT_PROPERTY)
})

test("an initiative naming no parent sits under none", () => {
  const root = worldFor()
  filing(root, "amy-one", ONE)
  expect(initiativesDrawn(root)[0]?.parent).toBe(null)
})

test("a parent the index files no initiative for sits under none", () => {
  const root = worldFor()
  filing(root, "amy-two", TWO)
  under(root, TWO, THREE)
  expect(initiativesDrawn(root)[0]?.parent).toBe(null)
})

test("an initiative under two parents sits under none", () => {
  const root = worldFor()
  filing(root, "amy-one", ONE)
  filing(root, "amy-two", TWO)
  filing(root, "amy-three", THREE)
  under(root, THREE, ONE)
  under(root, THREE, TWO)
  const drawn = initiativesDrawn(root)
  expect(drawn.find((one) => one.slug === "amy-three")?.parent).toBe(null)
})

test("a parent under two children keeps each of them under it", () => {
  const root = worldFor()
  filing(root, "amy-one", ONE)
  filing(root, "amy-two", TWO)
  filing(root, "amy-three", THREE)
  under(root, TWO, ONE)
  under(root, THREE, ONE)
  const drawn = initiativesDrawn(root)
  expect(drawn.find((one) => one.slug === "amy-two")?.parent).toBe("amy-one")
  expect(drawn.find((one) => one.slug === "amy-three")?.parent).toBe("amy-one")
})

test("a path the file name says is no initiative is passed over", () => {
  const root = worldFor()
  const stray = "akasha/editor-extension/stray.module.ts"
  listedFiled(root, INITIATIVE, "stray", [{ path: stray, id: ONE }])
  valueAlsoFiled(root, INITIATIVE, [{ path: stray, value: { id: ONE, slug: "stray" } }])
  expect(initiativesDrawn(root)).toEqual([])
})

function pageAt(root: string, slug: string, body: string): undefined {
  const path = join(root, pathFor(slug))
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, body)
}

test("a persona is read out of the page the index named", () => {
  const root = worldFor()
  filing(root, "amy-one", ONE)
  pageAt(
    root,
    "amy-one",
    'export const amyOne = { pageTypeSlug: "initiative", slug: "amy-one", persona: "amy" }\n'
  )
  expect(initiativesDrawn(root)[0]?.persona).toBe("amy")
})

test("a page the index named but no file holds answers no persona", () => {
  const root = worldFor()
  filing(root, "amy-one", ONE)
  expect(initiativesDrawn(root)[0]?.persona).toBe(null)
})

test("a page stating no persona answers none", () => {
  const root = worldFor()
  filing(root, "amy-one", ONE)
  pageAt(root, "amy-one", 'export const amyOne = { pageTypeSlug: "initiative", slug: "amy-one" }\n')
  expect(initiativesDrawn(root)[0]?.persona).toBe(null)
})

test("the intents are read out of the page in the order that page states them", () => {
  const root = worldFor()
  filing(root, "amy-one", ONE)
  pageAt(
    root,
    "amy-one",
    'export const amyOne = { pageTypeSlug: "initiative", slug: "amy-one", intents: [' +
      '{ statement: "zebra" }, { statement: "apple" }] }\n'
  )
  expect(initiativesDrawn(root)[0]?.intents.map((one) => one.statement)).toEqual(["zebra", "apple"])
})

test("an intent's working memory is read where the intent states one", () => {
  const root = worldFor()
  filing(root, "amy-one", ONE)
  pageAt(
    root,
    "amy-one",
    'export const amyOne = { pageTypeSlug: "initiative", slug: "amy-one", intents: [' +
      '{ statement: "make it so", workingMemory: "cut at 74bda7f0" }] }\n'
  )
  expect(initiativesDrawn(root)[0]?.intents[0]?.workingMemory).toBe("cut at 74bda7f0")
})

test("an intent stating no working memory carries none", () => {
  const root = worldFor()
  filing(root, "amy-one", ONE)
  pageAt(
    root,
    "amy-one",
    'export const amyOne = { pageTypeSlug: "initiative", slug: "amy-one", intents: [' +
      '{ statement: "make it so" }] }\n'
  )
  expect(initiativesDrawn(root)[0]?.intents[0]?.workingMemory).toBe(null)
})

test("a page stating no intents carries none", () => {
  const root = worldFor()
  filing(root, "amy-one", ONE)
  pageAt(root, "amy-one", 'export const amyOne = { pageTypeSlug: "initiative", slug: "amy-one" }\n')
  expect(initiativesDrawn(root)[0]?.intents).toEqual([])
})

test("a page the index named but no file holds carries no intent", () => {
  const root = worldFor()
  filing(root, "amy-one", ONE)
  expect(initiativesDrawn(root)[0]?.intents).toEqual([])
})

test("an entry stating no statement is no intent and is passed over", () => {
  const root = worldFor()
  filing(root, "amy-one", ONE)
  pageAt(
    root,
    "amy-one",
    'export const amyOne = { pageTypeSlug: "initiative", slug: "amy-one", intents: [' +
      '{ workingMemory: "held" }, { statement: "make it so" }] }\n'
  )
  expect(initiativesDrawn(root)[0]?.intents.map((one) => one.statement)).toEqual(["make it so"])
})

test("an intents key holding what is no list carries no intent", () => {
  const root = worldFor()
  filing(root, "amy-one", ONE)
  pageAt(
    root,
    "amy-one",
    'export const amyOne = { pageTypeSlug: "initiative", slug: "amy-one", intents: "make it so" }\n'
  )
  expect(initiativesDrawn(root)[0]?.intents).toEqual([])
})
