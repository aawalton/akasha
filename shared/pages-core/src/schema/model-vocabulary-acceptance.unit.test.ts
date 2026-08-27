import { describe, expect, it } from "bun:test"
import type { PropertyDefinition } from "../types"
import { type OptionListLookup, resolveDefinitionOptions } from "./resolve-select-options"

const MODEL_OPTIONS = [
  { id: "fable", label: "Fable 5" },
  { id: "opus", label: "Opus 4.8" },
  { id: "sonnet", label: "Sonnet 5" },
  { id: "haiku", label: "Haiku 4.5" },
] as const

const MODEL_VOCAB_ID = "019f33ee-fe31-72de-812c-3ea10bc1d72b"

const MODEL_SELECT_STRING_IDS = [
  "defaultHeadlessModel",
  "defaultWorkerModel",
  "fallbackWorkerModel",
  "helper.defaultModel",
] as const

function refBackedModelDef(stringId: string): PropertyDefinition {
  return {
    id: stringId,
    title: stringId,
    type: "select",
    config: { optionListRef: MODEL_VOCAB_ID },
  }
}

describe("shared option-lists: Model Vocabulary acceptance", () => {
  it("identical render — a ref-backed def resolves to the canonical inline set", () => {
    const lookup: OptionListLookup = (id) => (id === MODEL_VOCAB_ID ? MODEL_OPTIONS : undefined)
    const resolved = resolveDefinitionOptions(refBackedModelDef("defaultHeadlessModel"), lookup)
    expect(resolved.config?.options).toEqual(MODEL_OPTIONS)
  })

  it("inline arrays are removable — resolution needs only the ref, not inline options", () => {
    const lookup: OptionListLookup = (id) => (id === MODEL_VOCAB_ID ? MODEL_OPTIONS : undefined)
    const bareRefDef: PropertyDefinition = {
      id: "defaultWorkerModel",
      title: "Default Worker Model",
      type: "select",
      config: { optionListRef: MODEL_VOCAB_ID },
    }
    expect(bareRefDef.config?.options).toBeUndefined()
    expect(resolveDefinitionOptions(bareRefDef, lookup).config?.options).toEqual(MODEL_OPTIONS)
  })

  it("edit-once-changes-all — every def site resolves to the one shared list", () => {
    const lookup: OptionListLookup = (id) => (id === MODEL_VOCAB_ID ? MODEL_OPTIONS : undefined)
    for (const stringId of MODEL_SELECT_STRING_IDS) {
      const resolved = resolveDefinitionOptions(refBackedModelDef(stringId), lookup)
      expect(resolved.config?.options).toEqual(MODEL_OPTIONS)
    }
  })

  it("edit-once-changes-all — one list edit propagates to all four defs in lockstep", () => {
    const editedOptions = [...MODEL_OPTIONS, { id: "haiku-lite", label: "Haiku Lite" }] as const
    const lookup: OptionListLookup = (id) => (id === MODEL_VOCAB_ID ? editedOptions : undefined)
    for (const stringId of MODEL_SELECT_STRING_IDS) {
      const resolved = resolveDefinitionOptions(refBackedModelDef(stringId), lookup)
      expect(resolved.config?.options).toEqual(editedOptions)
    }
  })

  it("tolerated drift — resolution never re-validates values, it only supplies the current list", () => {
    const withoutHaiku = MODEL_OPTIONS.filter((o) => o.id !== "haiku")
    const lookup: OptionListLookup = (id) => (id === MODEL_VOCAB_ID ? withoutHaiku : undefined)
    const resolved = resolveDefinitionOptions(refBackedModelDef("helper.defaultModel"), lookup)
    expect(resolved.config?.options).toEqual(withoutHaiku)
  })
})
