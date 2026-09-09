import { expect, test } from "bun:test"
import { NOTHING_OVER, type World } from "../../../../modules/shadow/change-shadow.module.code.ts"
import { runChange } from "./change-page-page-type.change-mechanical-file-content.code.ts"

const AT = "akasha/one/kept.one-thing.ts"

const TO = "akasha/two/two-thing.page-type.ts"

const CHANGE_FILE_CONTENT = "change-mechanical-file-content/change-file-content"

const IMPORTED = `import type { OneThing } from "../one-thing.page-type.ts"`

const BODY = `${IMPORTED}

export const kept = {
  pageTypeSlug: "one-thing",
  slug: "kept",
} as const satisfies OneThing
`

type Worked = { readonly at: string; readonly given: unknown }

function worldOf(text: string | null, worked: Worked[]): World {
  return {
    root: "/nowhere",
    index: {} as World["index"],
    textOf: () => text,
    bodyOf: () => "",
    under: () => [],
    base: () => null,
    over: NOTHING_OVER,
    reaching: (_world, at, given) => {
      worked.push({ at, given })
      return Promise.resolve(NOTHING_OVER)
    },
  }
}

test("each passage is worked by the change this change reaches", async () => {
  const worked: Worked[] = []

  const said = await runChange(worldOf(BODY, worked), { at: AT, to: TO })

  expect(said.refused).toBe(null)
  expect(worked.map((one) => one.at)).toEqual([
    CHANGE_FILE_CONTENT,
    CHANGE_FILE_CONTENT,
    CHANGE_FILE_CONTENT,
  ])
  expect(worked[1]?.given).toEqual({ at: AT, old: "satisfies OneThing", new: "satisfies TwoThing" })
  expect(worked[2]?.given).toEqual({
    at: AT,
    old: `pageTypeSlug: "one-thing"`,
    new: `pageTypeSlug: "two-thing"`,
  })
})

test("a body stating the page type under two keys has both restated", async () => {
  const worked: Worked[] = []
  const body = `${IMPORTED}

export const kept = {
  pageTypeSlug: "one-thing",
  type: "one-thing",
  slug: "kept",
} as const satisfies OneThing
`

  const said = await runChange(worldOf(body, worked), { at: AT, to: TO })

  expect(said.refused).toBe(null)
  expect(worked.map((one) => one.given)).toEqual([
    { at: AT, old: IMPORTED, new: `import type { TwoThing } from "../two/two-thing.page-type.ts"` },
    { at: AT, old: "satisfies OneThing", new: "satisfies TwoThing" },
    { at: AT, old: `pageTypeSlug: "one-thing"`, new: `pageTypeSlug: "two-thing"` },
    { at: AT, old: `type: "one-thing"`, new: `type: "two-thing"` },
  ])
})

test("the import naming that type is restated to reach the page type named", async () => {
  const worked: Worked[] = []

  await runChange(worldOf(BODY, worked), { at: AT, to: TO })

  expect(worked[0]?.given).toEqual({
    at: AT,
    old: IMPORTED,
    new: `import type { TwoThing } from "../two/two-thing.page-type.ts"`,
  })
})

test("a body stating no page type is refused", async () => {
  const said = await runChange(worldOf("export const kept = {}\n", []), { at: AT, to: TO })

  expect(said.refused).toBe(`\`${AT}\` states no \`pageTypeSlug\`, so no page type is restated`)
})

test("a body stating the page type named already is refused", async () => {
  const said = await runChange(worldOf(BODY, []), {
    at: AT,
    to: "akasha/two/one-thing.page-type.ts",
  })

  expect(said.refused).toBe("`one-thing` is the page type the body states already")
})

test("a body importing no type named for the page type that body states is refused", async () => {
  const said = await runChange(worldOf(BODY.slice(IMPORTED.length), []), { at: AT, to: TO })

  expect(said.refused).toBe(
    `\`${AT}\` imports no type named \`OneThing\`, so no page type is restated`
  )
})

test("a path holding no body is refused", async () => {
  const said = await runChange(worldOf(null, []), { at: AT, to: TO })

  expect(said.refused).toBe(`\`${AT}\` holds no body, so no page type is restated`)
})

test("a refusal from the change reached is the whole answer", async () => {
  const world: World = {
    ...worldOf(BODY, []),
    reaching: () => Promise.resolve({ edits: [], refused: "no" }),
  }

  expect((await runChange(world, { at: AT, to: TO })).refused).toBe("no")
})
