import { expect, test } from "bun:test"
import type { Answer } from "../../../modules/change-answer/change-answer.module.types.ts"
import { landingFor, renameManifestWays } from "./rename-manifest-ways.change-mechanical.code.ts"

const AT = "seat-system/package.json"

const BODY = `{
  "name": "@akasha/seat-system",
  "type": "module",
  "exports": {
    "./alpha": "./alpha/alpha.module.code.ts",
    "./beta": "./beta/beta.module.code.ts",
    "./gamma": "./gamma/gamma.module.code.ts"
  }
}
`

const NO_WAYS = `{
  "name": "@akasha/seat-system",
  "type": "module"
}
`

const ONE_WAY = `{
  "name": "@akasha/seat-system",
  "exports": "./alpha/alpha.module.code.ts"
}
`

const BROKEN = `{
  "name": "@akasha/seat-system",
  "exports": {
`

function saidOf(moved: Record<string, string>, text: string): Answer {
  return renameManifestWays({ at: AT, moved }, (path) => (path === AT ? text : null))
}

function bodyOf(moved: Record<string, string>, text: string): string {
  const said = saidOf(moved, text)
  expect(said.refused).toBeNull()
  expect(said.edits).toHaveLength(1)
  return said.edits[0]?.body ?? ""
}

function waysOf(body: string): Record<string, string> {
  return (JSON.parse(body) as { exports: Record<string, string> }).exports
}

test("a way in whose file moved inside the package points at where the file went", () => {
  const said = bodyOf(
    { "seat-system/beta/beta.module.code.ts": "seat-system/held/beta.module.code.ts" },
    BODY
  )

  expect(said).toBe(BODY.replace(`"./beta/beta.module.code.ts"`, `"./held/beta.module.code.ts"`))
})

test("a way in whose file landed outside the package is dropped", () => {
  const said = bodyOf({ "seat-system/beta/beta.module.code.ts": "other/beta.module.code.ts" }, BODY)

  expect(said).toBe(BODY.replace(`\n    "./beta": "./beta/beta.module.code.ts",`, ""))
  expect(Object.keys(waysOf(said))).toEqual(["./alpha", "./gamma"])
})

test("the last way in is dropped and what stays reads as JSON", () => {
  const said = bodyOf(
    { "seat-system/gamma/gamma.module.code.ts": "other/gamma.module.code.ts" },
    BODY
  )

  expect(Object.keys(waysOf(said))).toEqual(["./alpha", "./beta"])
})

test("every way in is dropped and the exports key stays", () => {
  const said = bodyOf(
    {
      "seat-system/alpha/alpha.module.code.ts": "other/alpha.module.code.ts",
      "seat-system/beta/beta.module.code.ts": "other/beta.module.code.ts",
      "seat-system/gamma/gamma.module.code.ts": "other/gamma.module.code.ts",
    },
    BODY
  )

  expect(waysOf(said)).toEqual({})
})

test("a manifest that moves carries every way in to where the files landed", () => {
  const moved = {
    "seat-system/package.json": "held/package.json",
    "seat-system/alpha/alpha.module.code.ts": "held/alpha/alpha.module.code.ts",
    "seat-system/beta/beta.module.code.ts": "held/beta/beta.module.code.ts",
    "seat-system/gamma/gamma.module.code.ts": "held/gamma/gamma.module.code.ts",
  }
  const said = saidOf(moved, BODY)

  expect(said.edits[0]?.from).toBe(AT)
  expect(said.edits[0]?.path).toBe("held/package.json")
  expect(bodyOf(moved, BODY)).toBe(BODY)
})

test("the spacing the manifest already carries is kept", () => {
  const text = `{"name":"one","exports":{"./beta":"./beta/beta.module.code.ts"}}`
  const said = bodyOf(
    { "seat-system/beta/beta.module.code.ts": "seat-system/held/beta.module.code.ts" },
    text
  )

  expect(said).toBe(`{"name":"one","exports":{"./beta":"./held/beta.module.code.ts"}}`)
})

test("a manifest stating one way in as text follows the file that way in names", () => {
  const said = bodyOf(
    { "seat-system/alpha/alpha.module.code.ts": "seat-system/held/alpha.module.code.ts" },
    ONE_WAY
  )

  expect(said).toBe(
    ONE_WAY.replace(`"./alpha/alpha.module.code.ts"`, `"./held/alpha.module.code.ts"`)
  )
})

test("a way in stated as text and landed outside goes with the exports key", () => {
  const said = bodyOf(
    { "seat-system/alpha/alpha.module.code.ts": "other/alpha.module.code.ts" },
    ONE_WAY
  )

  expect(JSON.parse(said)).toEqual({ name: "@akasha/seat-system" })
})

test("a manifest stating no way in is answered unchanged", () => {
  expect(
    bodyOf(
      { "seat-system/beta/beta.module.code.ts": "seat-system/held/beta.module.code.ts" },
      NO_WAYS
    )
  ).toBe(NO_WAYS)
})

test("a manifest naming no file that moved is answered unchanged", () => {
  expect(
    bodyOf(
      { "seat-system/delta/delta.module.code.ts": "seat-system/held/delta.module.code.ts" },
      BODY
    )
  ).toBe(BODY)
})

test("a body that reads as no JSON object is refused", () => {
  const said = saidOf(
    { "seat-system/beta/beta.module.code.ts": "seat-system/held/beta.module.code.ts" },
    BROKEN
  )

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/reads as no JSON object/)
})

test("a manifest holding no body is refused", () => {
  const said = renameManifestWays({ at: AT, moved: {} }, () => null)

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/holds no body/)
})

test("a manifest that stays is answered under the path the body was read from", () => {
  const said = saidOf({}, BODY)

  expect(said.edits[0]?.path).toBe(AT)
  expect(said.edits[0]?.was).toBe(BODY)
  expect(said.edits[0]?.from).toBe(undefined)
})

test("a landing is read against the folder the manifest arrives in", () => {
  const moved = new Map([["seat-system/beta/beta.module.code.ts", "held/beta.module.code.ts"]])

  expect(landingFor(AT, "held", "./beta/beta.module.code.ts", moved)).toEqual({
    said: "./beta.module.code.ts",
  })
  expect(landingFor(AT, "seat-system", "./beta/beta.module.code.ts", moved)).toEqual({ gone: true })
})

test("the body is answered rather than written", () => {
  const held: Record<string, string> = { [AT]: BODY }
  const said = renameManifestWays(
    { at: AT, moved: { "seat-system/beta/beta.module.code.ts": "other/beta.module.code.ts" } },
    (path) => held[path] ?? null
  )

  expect(said.refused).toBeNull()
  expect(held[AT]).toBe(BODY)
})
