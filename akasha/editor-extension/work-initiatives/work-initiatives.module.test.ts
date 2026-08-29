import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { scratchWorld } from "../../command-system/scratching.module.code.ts"
import { indexIn } from "../../pages-system/index/index-reading.module.code.ts"
import { initiativesDrawn } from "./work-initiatives.module.code.ts"

const ONE = "01a04e9f-0000-7000-8000-00000000000a"

const TWO = "01a04e9f-0000-7000-8000-00000000000b"

const THREE = "01a04e9f-0000-7000-8000-00000000000c"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function filed(root: string, at: string, lines: readonly string[]): void {
  const path = join(indexIn(root), at)
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, `${lines.join("\n")}\n`)
}

function pathFor(slug: string): string {
  return `akasha/domain-system/initiative/initiatives/${slug}.initiative.ts`
}

function standing(root: string, slug: string, id: string): void {
  filed(root, `identity/initiative/slug/${slug}.jsonl`, [
    JSON.stringify({ path: pathFor(slug), id }),
  ])
}

function under(root: string, id: string, parent: string): void {
  filed(root, `relation/page/id/${id}/parent-slug/${parent}.jsonl`, [
    JSON.stringify({ path: pathFor("standing"), id: parent }),
  ])
}

test("every initiative the index files is drawn", () => {
  const root = scratch.rootFor("akasha-work-")
  standing(root, "amy-one", ONE)
  standing(root, "amy-two", TWO)
  expect(initiativesDrawn(root).map((one) => one.slug)).toEqual(["amy-one", "amy-two"])
})

test("an index filing no initiative draws nothing", () => {
  const root = scratch.rootFor("akasha-work-")
  expect(initiativesDrawn(root)).toEqual([])
})

test("a parent filed by id is answered as a slug", () => {
  const root = scratch.rootFor("akasha-work-")
  standing(root, "amy-one", ONE)
  standing(root, "amy-two", TWO)
  under(root, TWO, ONE)
  const drawn = initiativesDrawn(root)
  expect(drawn.find((one) => one.slug === "amy-two")?.parent).toBe("amy-one")
})

test("an initiative naming no parent stands under none", () => {
  const root = scratch.rootFor("akasha-work-")
  standing(root, "amy-one", ONE)
  expect(initiativesDrawn(root)[0]?.parent).toBe(null)
})

test("a parent the index files no initiative for stands under none", () => {
  const root = scratch.rootFor("akasha-work-")
  standing(root, "amy-two", TWO)
  under(root, TWO, THREE)
  expect(initiativesDrawn(root)[0]?.parent).toBe(null)
})

test("an initiative naming two parents stands under none", () => {
  const root = scratch.rootFor("akasha-work-")
  standing(root, "amy-one", ONE)
  standing(root, "amy-two", TWO)
  standing(root, "amy-three", THREE)
  under(root, THREE, ONE)
  under(root, THREE, TWO)
  const drawn = initiativesDrawn(root)
  expect(drawn.find((one) => one.slug === "amy-three")?.parent).toBe(null)
})

test("a path the file name says is no initiative is passed over", () => {
  const root = scratch.rootFor("akasha-work-")
  filed(root, "identity/initiative/slug/stray.jsonl", [
    JSON.stringify({ path: "akasha/editor-extension/stray.module.ts", id: ONE }),
  ])
  expect(initiativesDrawn(root)).toEqual([])
})
