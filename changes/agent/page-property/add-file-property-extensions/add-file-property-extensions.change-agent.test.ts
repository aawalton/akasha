import { expect, test } from "bun:test"
import type { Reaching, World } from "../../../modules/shadow/change-shadow.module.code.ts"
import {
  catching,
  refusingAt,
  worldOf,
} from "../../../modules/shadow/change-shadow.module.test-fixtures.ts"
import {
  addFilePropertyExtensions,
  runChange,
} from "./add-file-property-extensions.change-agent.code.ts"

const KIND = "file-property"

const AT = "held/ones/properties/code.file-property.ts"

const APART = "apart/ones/properties/code.file-property.ts"

const STATED = "change-mechanical-file-content/add-page-property"

const BODY = `export type Code = "ts" | "tsx"

export const code = { slug: "code" } as const
`

const LOOSE = `export type Code = string

export const code = { slug: "code" } as const
`

function worldFor(
  reaching: Reaching,
  kinds: readonly string[],
  bodies: Readonly<Record<string, string>>,
  stated: Record<string, unknown> = {}
): World {
  const paths = Object.keys(bodies)
  return {
    ...worldOf(bodies),
    index: {
      kindsUnder: () => new Set(kinds),
      everyOfType: () => paths.map((path) => ({ path })),
      pageByPath: () => ({ pageTypeSlug: KIND, slug: "code", ...stated }),
    } as never,
    reaching,
  }
}

test("a file property gains the endings the type beside it names", async () => {
  const seen: { at: string; given: Record<string, unknown> }[] = []

  const said = await addFilePropertyExtensions(worldFor(catching(seen), [KIND], { [AT]: BODY }), {})

  expect(said.refused).toBeNull()
  expect(seen[0]).toEqual({
    at: STATED,
    given: { after: "definition", at: AT, key: "extensions", value: '["ts","tsx"]' },
  })
})

test("a page stating its endings already is passed over rather than stating them twice", async () => {
  const seen: { at: string; given: Record<string, unknown> }[] = []

  const said = await addFilePropertyExtensions(
    worldFor(catching(seen), [KIND], { [AT]: BODY }, { extensions: ["ts"] }),
    {}
  )

  expect(said.refused ?? "").toMatch(/states its endings already/)
  expect(seen).toEqual([])
})

test("a type that is no run of quoted endings is refused", async () => {
  const seen: { at: string; given: Record<string, unknown> }[] = []

  const said = await addFilePropertyExtensions(
    worldFor(catching(seen), [KIND], { [AT]: LOOSE }),
    {}
  )

  expect(said.refused ?? "").toMatch(/no run of endings/)
  expect(said.refused ?? "").toContain(AT)
  expect(seen).toEqual([])
})

test("a page type no page is of refuses, and nothing is reached", async () => {
  const seen: { at: string; given: Record<string, unknown> }[] = []

  const said = await addFilePropertyExtensions(worldFor(catching(seen), [], { [AT]: BODY }), {})

  expect(said.refused ?? "").toMatch(/no page is a/)
  expect(seen).toEqual([])
})

test("a refusal from the change stating the key names the page", async () => {
  const seen: { at: string; given: Record<string, unknown> }[] = []

  const said = await addFilePropertyExtensions(
    worldFor(refusingAt(seen, STATED), [KIND], { [AT]: BODY }),
    {}
  )

  expect(said.refused ?? "").toContain(AT)
})

test("every page is reached rather than the first alone", async () => {
  const seen: { at: string; given: Record<string, unknown> }[] = []

  await addFilePropertyExtensions(
    worldFor(catching(seen), [KIND], { [AT]: BODY, [APART]: BODY }),
    {}
  )

  expect(seen).toHaveLength(2)
})

test("a folder named holds the change to the pages sitting under that folder", async () => {
  const seen: { at: string; given: Record<string, unknown> }[] = []

  await runChange(worldFor(catching(seen), [KIND], { [AT]: BODY, [APART]: BODY }), {
    under: "held/",
  })

  expect(seen).toHaveLength(1)
})
