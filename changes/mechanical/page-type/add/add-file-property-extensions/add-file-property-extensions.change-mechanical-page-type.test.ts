import { expect, test } from "bun:test"
import {
  addFilePropertyExtensions,
  runChange,
} from "akasha/changes/mechanical/page-type/add/add-file-property-extensions/add-file-property-extensions.change-mechanical-page-type.code.ts"
import {
  APART,
  AT,
  BODIES,
  BOTH,
  DEFINED,
  type Files,
  KIND,
  LOOSE,
  worldFor as masksWorld,
} from "akasha/changes/mechanical/page-type/add/add-file-property-extensions/add-file-property-extensions.change-mechanical-page-type.test-fixtures.ts"
import { bodiesIn, type World } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import { listing } from "akasha/changes/runners/pages/test-change-running/test-change-running.change-runner.code.ts"

const REACHED: string[] = []

const ENDINGS = `extensions: ["svg","png"]`

function worldFor(
  bodies: Files,
  kinds: readonly string[] = [KIND],
  stated: Readonly<Record<string, unknown>> = {}
): World {
  return masksWorld(bodies, kinds, listing(REACHED), stated)
}

test("every page whose value is held in a file is answered in this one answer", () => {
  const world = worldFor(BOTH)

  const said = addFilePropertyExtensions(world, {})

  expect(said.refused).toBeNull()
  expect(said.edits).toHaveLength(2)
  const bodies = bodiesIn(said, world.base)
  expect(bodies.get(AT) ?? "").toContain(ENDINGS)
  expect(bodies.get(APART) ?? "").toContain(ENDINGS)
})

test("the endings are written after the page's definition", () => {
  const world = worldFor(BODIES)

  const said = addFilePropertyExtensions(world, {})

  expect(bodiesIn(said, world.base).get(AT) ?? "").toContain(
    `definition: "${DEFINED}",\n  ${ENDINGS},`
  )
})

test("a type that is no run of quoted endings is refused rather than passed over", () => {
  const said = addFilePropertyExtensions(worldFor({ [AT]: LOOSE }), {})

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain(AT)
  expect(said.refused ?? "").toContain("`Mask` as no run of endings")
})

test("a page stating its endings already is passed over rather than stating them twice", () => {
  const said = addFilePropertyExtensions(worldFor(BODIES, [KIND], { extensions: ["svg"] }), {})

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`every \`${KIND}\` states its endings already`)
})

test("a page type no page is of is refused rather than answered as no edit", () => {
  const said = addFilePropertyExtensions(worldFor(BODIES, []), {})

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`no page is a \`${KIND}\``)
})

test("a folder named holds the change to the pages sitting under that folder", () => {
  const said = runChange(worldFor(BOTH), { under: "thrumming/" })

  expect(said.refused).toBeNull()
  expect(said.edits).toHaveLength(1)
})

test("no rung beneath is reached", () => {
  REACHED.length = 0

  const said = addFilePropertyExtensions(worldFor(BODIES), {})

  expect(said.refused).toBeNull()
  expect(REACHED).toEqual([])
})
