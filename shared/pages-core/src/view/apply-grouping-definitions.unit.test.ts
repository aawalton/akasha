import { describe, expect, test } from "bun:test"
import {
  booleanDef,
  defOf,
  keysOf,
  multiRelationDef,
  multiSelectDef,
  relationDef,
  row,
  selectDef,
} from "./_apply-grouping-definitions-test-helpers"
import type { PageResolver } from "./apply-grouping-shared"

describe("getPageGroupDefinition — boolean", () => {
  test("groups checked items as 'true'", () => {
    const def = defOf("done", [booleanDef])
    expect(def.getKey(row("1", { done: true }))).toBe("true")
  })

  test("groups unchecked items as 'false'", () => {
    const def = defOf("done", [booleanDef])
    expect(def.getKey(row("1", { done: false }))).toBe("false")
  })

  test("groups missing value as 'false'", () => {
    const def = defOf("done", [booleanDef])
    expect(def.getKey(row("1", {}))).toBe("false")
  })

  test("labels true as 'Checked'", () => {
    const def = defOf("done", [booleanDef])
    expect(def.getLabel("true")).toBe("Checked")
  })

  test("labels false as 'Unchecked'", () => {
    const def = defOf("done", [booleanDef])
    expect(def.getLabel("false")).toBe("Unchecked")
  })
})

describe("getPageGroupDefinition — select", () => {
  test("returns option id as key", () => {
    const def = defOf("status", [selectDef])
    expect(def.getKey(row("1", { status: "open" }))).toBe("open")
  })

  test("empty string returns __none__", () => {
    const def = defOf("status", [selectDef])
    expect(def.getKey(row("1", { status: "" }))).toBe("__none__")
  })

  test("missing value returns __none__", () => {
    const def = defOf("status", [selectDef])
    expect(def.getKey(row("1", {}))).toBe("__none__")
  })

  test("null value returns __none__", () => {
    const def = defOf("status", [selectDef])
    expect(def.getKey(row("1", { status: null }))).toBe("__none__")
  })

  test("labels known option by label", () => {
    const def = defOf("status", [selectDef])
    expect(def.getLabel("open")).toBe("Open")
  })

  test("labels unknown option as raw key", () => {
    const def = defOf("status", [selectDef])
    expect(def.getLabel("unknown-id")).toBe("unknown-id")
  })

  test("labels __none__ as 'None'", () => {
    const def = defOf("status", [selectDef])
    expect(def.getLabel("__none__")).toBe("No Value")
  })

  test("no getKeys for single-select", () => {
    const def = defOf("status", [selectDef])
    expect(def.getKeys).toBeUndefined()
  })
})

describe("getPageGroupDefinition — multi-select", () => {
  test("getKey returns first value", () => {
    const def = defOf("tags", [multiSelectDef])
    expect(def.getKey(row("1", { tags: ["bug", "feature"] }))).toBe("bug")
  })

  test("getKey returns __none__ for empty array", () => {
    const def = defOf("tags", [multiSelectDef])
    expect(def.getKey(row("1", { tags: [] }))).toBe("__none__")
  })

  test("getKey returns __none__ for missing value", () => {
    const def = defOf("tags", [multiSelectDef])
    expect(def.getKey(row("1", {}))).toBe("__none__")
  })

  test("getKeys returns all string values", () => {
    const def = defOf("tags", [multiSelectDef])
    expect(keysOf(def)(row("1", { tags: ["bug", "feature"] }))).toEqual(["bug", "feature"])
  })

  test("getKeys returns [__none__] for empty array", () => {
    const def = defOf("tags", [multiSelectDef])
    expect(keysOf(def)(row("1", { tags: [] }))).toEqual(["__none__"])
  })

  test("getKeys filters out non-string values", () => {
    const def = defOf("tags", [multiSelectDef])
    expect(keysOf(def)(row("1", { tags: ["bug", 42, "feature"] }))).toEqual(["bug", "feature"])
  })

  test("labels known option by label", () => {
    const def = defOf("tags", [multiSelectDef])
    expect(def.getLabel("bug")).toBe("Bug")
  })

  test("labels __none__ as 'None'", () => {
    const def = defOf("tags", [multiSelectDef])
    expect(def.getLabel("__none__")).toBe("No Value")
  })
})

describe("getPageGroupDefinition — relation", () => {
  const resolver: PageResolver = {
    resolve: (id) => {
      const pages: Record<string, string> = { p1: "Page One", p2: "Page Two" }
      const title = pages[id]
      return title ? { id, title } : null
    },
  }

  test("returns relation id as key", () => {
    const def = defOf("parent", [relationDef], resolver)
    expect(def.getKey(row("1", { parent: "p1" }))).toBe("p1")
  })

  test("missing value returns __none__", () => {
    const def = defOf("parent", [relationDef], resolver)
    expect(def.getKey(row("1", {}))).toBe("__none__")
  })

  test("empty string returns __none__", () => {
    const def = defOf("parent", [relationDef], resolver)
    expect(def.getKey(row("1", { parent: "" }))).toBe("__none__")
  })

  test("labels resolved page by name", () => {
    const def = defOf("parent", [relationDef], resolver)
    expect(def.getLabel("p1")).toBe("Page One")
  })

  test("labels unresolvable page as raw key", () => {
    const def = defOf("parent", [relationDef], resolver)
    expect(def.getLabel("unknown")).toBe("unknown")
  })

  test("labels __none__ as 'None'", () => {
    const def = defOf("parent", [relationDef], resolver)
    expect(def.getLabel("__none__")).toBe("No Value")
  })

  test("works without resolver", () => {
    const def = defOf("parent", [relationDef])
    expect(def.getLabel("p1")).toBe("p1")
  })

  test("works with null resolver", () => {
    const def = defOf("parent", [relationDef], null)
    expect(def.getLabel("p1")).toBe("p1")
  })
})

describe("getPageGroupDefinition — multi-relation", () => {
  const resolver: PageResolver = {
    resolve: (id) => {
      const pages: Record<string, string> = { p1: "Page One", p2: "Page Two" }
      const title = pages[id]
      return title ? { id, title } : null
    },
  }

  test("getKey returns first value", () => {
    const def = defOf("related", [multiRelationDef], resolver)
    expect(def.getKey(row("1", { related: ["p1", "p2"] }))).toBe("p1")
  })

  test("getKey returns __none__ for empty array", () => {
    const def = defOf("related", [multiRelationDef], resolver)
    expect(def.getKey(row("1", { related: [] }))).toBe("__none__")
  })

  test("getKey returns __none__ for non-string first element", () => {
    const def = defOf("related", [multiRelationDef], resolver)
    expect(def.getKey(row("1", { related: [42] }))).toBe("__none__")
  })

  test("getKeys returns all string values", () => {
    const def = defOf("related", [multiRelationDef], resolver)
    expect(keysOf(def)(row("1", { related: ["p1", "p2"] }))).toEqual(["p1", "p2"])
  })

  test("getKeys returns [__none__] for empty array", () => {
    const def = defOf("related", [multiRelationDef], resolver)
    expect(keysOf(def)(row("1", { related: [] }))).toEqual(["__none__"])
  })

  test("getKeys filters out non-string values", () => {
    const def = defOf("related", [multiRelationDef], resolver)
    expect(keysOf(def)(row("1", { related: ["p1", 99, "p2"] }))).toEqual(["p1", "p2"])
  })

  test("labels resolved page by name", () => {
    const def = defOf("related", [multiRelationDef], resolver)
    expect(def.getLabel("p1")).toBe("Page One")
  })

  test("labels __none__ as 'None'", () => {
    const def = defOf("related", [multiRelationDef], resolver)
    expect(def.getLabel("__none__")).toBe("No Value")
  })
})
