import { describe, expect, test } from "bun:test"
import { parsePageAsAutomation } from "./parse-automation"

describe("parsePageAsAutomation — invoked trigger", () => {
  const invokedRow = () => ({
    id: "01970000-0000-7000-8000-0000000000ba",
    name: "Train button invokes trainer",
    enabled: true,
    pageType: "to-do",
    trigger: { kind: "invoked", propertyId: "trainButton" },
    actions: [{ kind: "patch_source", set: {} }],
  })

  test("parses an invoked trigger with a single-string propertyId to propertyIds array", () => {
    const parsed = parsePageAsAutomation(invokedRow())
    expect(parsed).not.toBeNull()
    expect(parsed?.trigger.kind).toBe("invoked")
    if (parsed?.trigger.kind === "invoked") {
      expect(parsed.trigger.propertyIds).toEqual(["trainButton"])
    }
    expect(parsed?.actions[0]?.kind).toBe("patch_source")
  })

  test("normalizes an array-form propertyId to propertyIds", () => {
    const row = {
      ...invokedRow(),
      trigger: { kind: "invoked", propertyId: ["a", "b"] },
    }
    const parsed = parsePageAsAutomation(row)
    expect(parsed).not.toBeNull()
    expect(parsed?.trigger.kind).toBe("invoked")
    if (parsed?.trigger.kind === "invoked") {
      expect(parsed.trigger.propertyIds).toEqual(["a", "b"])
    }
  })
})
