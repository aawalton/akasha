import { describe, expect, it } from "bun:test"
import type { PropertyDefinition } from "../types"
import {
  type OptionListLookup,
  parseSelectOptionArray,
  resolveDefinitionOptions,
  resolveSelectOptions,
} from "./resolve-select-options"

const INLINE = [
  { id: "a", label: "Inline A" },
  { id: "b", label: "Inline B" },
] as const

const LISTED = [
  { id: "fable", label: "Fable 5" },
  { id: "opus", label: "Opus 4.8" },
] as const

const LIST_ID = "019f-option-list-model-vocab"

const lookup: OptionListLookup = (id) => (id === LIST_ID ? LISTED : undefined)

describe("resolveSelectOptions (pure decision)", () => {
  it("returns inline options when no optionListRef is set", () => {
    expect(resolveSelectOptions({ options: INLINE }, lookup)).toEqual(INLINE)
  })

  it("returns the referenced list when optionListRef resolves (ref wins over inline)", () => {
    expect(resolveSelectOptions({ options: INLINE, optionListRef: LIST_ID }, lookup)).toEqual(
      LISTED
    )
  })

  it("falls back to inline options when the referenced list is missing", () => {
    expect(
      resolveSelectOptions({ options: INLINE, optionListRef: "no-such-list" }, lookup)
    ).toEqual(INLINE)
  })

  it("treats an empty-string optionListRef as unset", () => {
    expect(resolveSelectOptions({ options: INLINE, optionListRef: "" }, lookup)).toEqual(INLINE)
  })

  it("returns [] when neither inline options nor a resolvable ref exist", () => {
    expect(resolveSelectOptions({}, lookup)).toEqual([])
  })
})

describe("resolveDefinitionOptions (resolve into the definition)", () => {
  const selectDefWithRef: PropertyDefinition = {
    id: "def-model",
    title: "Default Model",
    type: "select",
    config: { options: INLINE, optionListRef: LIST_ID },
  }

  it("populates config.options from the referenced list for a select def", () => {
    const resolved = resolveDefinitionOptions(selectDefWithRef, lookup)
    expect(resolved.config?.options).toEqual(LISTED)
  })

  it("resolves multi-select defs the same way", () => {
    const multi: PropertyDefinition = { ...selectDefWithRef, type: "multi-select" }
    expect(resolveDefinitionOptions(multi, lookup).config?.options).toEqual(LISTED)
  })

  it("leaves a select def without optionListRef untouched (identity)", () => {
    const inlineOnly: PropertyDefinition = {
      id: "def-x",
      title: "X",
      type: "select",
      config: { options: INLINE },
    }
    expect(resolveDefinitionOptions(inlineOnly, lookup)).toBe(inlineOnly)
  })

  it("leaves a non-select def untouched (identity)", () => {
    const textDef: PropertyDefinition = { id: "def-t", title: "T", type: "text", config: {} }
    expect(resolveDefinitionOptions(textDef, lookup)).toBe(textDef)
  })
})

describe("parseSelectOptionArray (both spellings of a json property)", () => {
  it("reads the array a database row carries", () => {
    expect(parseSelectOptionArray([...LISTED])).toEqual([...LISTED])
  })

  it("reads the one line of JSON text a file-backed page carries", () => {
    expect(parseSelectOptionArray(JSON.stringify(LISTED))).toEqual([...LISTED])
  })

  it("yields nothing for text that is not JSON", () => {
    expect(parseSelectOptionArray("not json")).toEqual([])
  })

  it("yields nothing for JSON text that is not an array", () => {
    expect(parseSelectOptionArray('{"id":"a"}')).toEqual([])
  })
})
