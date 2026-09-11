import { expect, test } from "bun:test"
import {
  endingOf,
  extensionsUnder,
  heldNamed,
} from "akasha/pages/indexes/extension-carrying/extension-carrying.module.code.ts"
import type {
  Carried,
  Kinded,
  Naming,
} from "akasha/pages/indexes/property-carrying/property-carrying.module.code.ts"
import type { Value } from "akasha/pages/value-reading/page-value-reading.module.code.ts"

const OWNER = "temper/one-addon/one-addon.eso-addon.ts"

const NAMED = "named-extension-property/one-texture"

const NAMING: Naming = {
  path: "temper/properties/one-texture.named-extension-property.ts",
  value: { extensionName: "dds", holdsBytes: true },
}

function holdingBytes(value: Value): boolean {
  return value.holdsBytes === true
}

const never = (): boolean => false

function carryingAt(at: string): (named: string) => Carried {
  return (named) =>
    named === NAMED
      ? { carrying: [{ pageTypeSlug: "eso-addon", path: at, id: "one", within: null }] }
      : { refused: "no page property carries that slug" }
}

function refusing(): Carried {
  return { refused: "no page property carries that slug" }
}

test("a file closing with the extension beside a page carrying the property is named by it", () => {
  expect(heldNamed("temper/one-addon/Chest.dds", [NAMING], holdingBytes, carryingAt(OWNER))).toBe(
    true
  )
})

test("a file closing with another extension is named by nothing", () => {
  expect(heldNamed("temper/one-addon/Chest.lua", [NAMING], holdingBytes, carryingAt(OWNER))).toBe(
    false
  )
})

test("a file in a folder beneath that page is named by nothing", () => {
  expect(
    heldNamed("temper/one-addon/art/Chest.dds", [NAMING], holdingBytes, carryingAt(OWNER))
  ).toBe(false)
})

test("a page carrying the property from another folder names no file beside it", () => {
  const away = "temper/two-addon/two-addon.eso-addon.ts"
  expect(heldNamed("temper/one-addon/Chest.dds", [NAMING], holdingBytes, carryingAt(away))).toBe(
    false
  )
})

test("a property the caller does not ask for names nothing", () => {
  expect(heldNamed("temper/one-addon/Chest.dds", [NAMING], never, carryingAt(OWNER))).toBe(false)
})

test("a property carrying no value names nothing", () => {
  const none: Naming = { path: NAMING.path, value: null }
  expect(heldNamed("temper/one-addon/Chest.dds", [none], holdingBytes, carryingAt(OWNER))).toBe(
    false
  )
})

test("a name the carrying refuses names nothing", () => {
  expect(heldNamed("temper/one-addon/Chest.dds", [NAMING], holdingBytes, refusing)).toBe(false)
})

test("a name with no dot closes with no extension", () => {
  expect(endingOf("temper/one-addon/Makefile")).toBe(null)
})

test("a name opening with a dot closes with no extension", () => {
  expect(endingOf("temper/one-addon/.gitignore")).toBe(null)
})

test("a name with two dots closes with the name after the last one", () => {
  expect(endingOf("temper/one-addon/one.eso-addon.ts")).toBe("ts")
})

test("every kind under a named extension property is read", () => {
  const kinded: Kinded = {
    kindsUnder: (of) => (of === "named-extension-property" ? ["one-kind", "two-kind"] : []),
    everyOfType: (kind) => (kind === "one-kind" ? [{ path: NAMING.path }] : []),
    valueAt: (path) => (path === NAMING.path ? NAMING.value : null),
  }
  expect(extensionsUnder(kinded)).toEqual([NAMING])
})
