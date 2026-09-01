import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { scratchWorld } from "../../command-system/scratching/scratching.module.code.ts"
import {
  idFiled,
  listedFiled,
  noneOfTypeFiled,
  relationFiled,
} from "../../pages-system/indexes/index-reading/index-reading.module.test-fixtures.ts"
import { initiativesDrawn } from "./work-initiatives.module.code.ts"

const ONE = "01a04e9f-0000-7000-8000-00000000000a"

const TWO = "01a04e9f-0000-7000-8000-00000000000b"

const THREE = "01a04e9f-0000-7000-8000-00000000000c"

const INITIATIVE = "initiative"

const INITIATIVE_TYPE = "01a04e58-5735-72b4-b945-56366461c776"

const PARENT_SLUG = "parent-slug"

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
  return root
}

function filing(root: string, slug: string, id: string, typeSlug: string = INITIATIVE): undefined {
  listedFiled(root, typeSlug, slug, [{ path: pathFor(slug, typeSlug), id }])
}

function under(root: string, child: string, parent: string): undefined {
  relationFiled(root, parent, PARENT_SLUG, child, [{ path: pathFor("naming"), id: child }])
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
  noneOfTypeFiled(root, INITIATIVE)
  expect(initiativesDrawn(root)).toEqual([])
})

test("an index filing initiatives nowhere draws nothing either", () => {
  const root = worldFor()
  expect(initiativesDrawn(root)).toEqual([])
})

test("an index naming no page type for initiatives refuses rather than drawing none", () => {
  const root = scratch.rootFor("akasha-work-")
  expect(() => initiativesDrawn(root)).toThrow("could not be answered")
})

test("the edge is filed under the parent, so the child is the one that stands under", () => {
  const root = worldFor()
  filing(root, "amy-parent", ONE)
  filing(root, "amy-child", TWO)
  under(root, TWO, ONE)
  const drawn = initiativesDrawn(root)
  expect(drawn.find((one) => one.slug === "amy-child")?.parent).toBe("amy-parent")
  expect(drawn.find((one) => one.slug === "amy-parent")?.parent).toBe(null)
})

test("an initiative naming no parent stands under none", () => {
  const root = worldFor()
  filing(root, "amy-one", ONE)
  expect(initiativesDrawn(root)[0]?.parent).toBe(null)
})

test("a parent the index files no initiative for stands under none", () => {
  const root = worldFor()
  filing(root, "amy-two", TWO)
  under(root, TWO, THREE)
  expect(initiativesDrawn(root)[0]?.parent).toBe(null)
})

test("an initiative standing under two stands under none", () => {
  const root = worldFor()
  filing(root, "amy-one", ONE)
  filing(root, "amy-two", TWO)
  filing(root, "amy-three", THREE)
  under(root, THREE, ONE)
  under(root, THREE, TWO)
  const drawn = initiativesDrawn(root)
  expect(drawn.find((one) => one.slug === "amy-three")?.parent).toBe(null)
})

test("a parent standing under two children keeps each of them under it", () => {
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
  listedFiled(root, INITIATIVE, "stray", [
    { path: "akasha/editor-extension/stray.module.ts", id: ONE },
  ])
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
    'export const amyOne = { pageTypeSlug: "initiative", slug: "amy-one", personaSlug: "amy" }\n'
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
