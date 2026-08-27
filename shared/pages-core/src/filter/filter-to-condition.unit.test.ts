import { describe, expect, it } from "bun:test"
import { filterToCondition } from "./filter-to-condition"

describe("filterToCondition — literal-passthrough operators", () => {
  it("equals → access-layer eq", () => {
    expect(filterToCondition("status", "equals", "open")).toEqual([{ key: "status", eq: "open" }])
  })

  it("not_equals → access-layer neq", () => {
    expect(filterToCondition("status", "not_equals", "done")).toEqual([
      { key: "status", neq: "done" },
    ])
  })

  it("contains → access-layer contains (string only)", () => {
    expect(filterToCondition("title", "contains", "wid")).toEqual([
      { key: "title", contains: "wid" },
    ])
  })

  it("not_contains → access-layer notContains (string only)", () => {
    expect(filterToCondition("title", "not_contains", "wid")).toEqual([
      { key: "title", notContains: "wid" },
    ])
  })

  it("contains with non-string value → null", () => {
    expect(filterToCondition("title", "contains", 5)).toBeNull()
  })

  it("gt with literal number → access-layer gt", () => {
    expect(filterToCondition("count", "gt", 3)).toEqual([{ key: "count", gt: 3 }])
  })

  it("gte with literal number → access-layer gte", () => {
    expect(filterToCondition("count", "gte", 3)).toEqual([{ key: "count", gte: 3 }])
  })

  it("lt with literal number → access-layer lt", () => {
    expect(filterToCondition("count", "lt", 3)).toEqual([{ key: "count", lt: 3 }])
  })

  it("lte with literal number → access-layer lte", () => {
    expect(filterToCondition("count", "lte", 3)).toEqual([{ key: "count", lte: 3 }])
  })

  it("is_empty → access-layer isEmpty (no value)", () => {
    expect(filterToCondition("notes", "is_empty", undefined)).toEqual([
      { key: "notes", isEmpty: true },
    ])
  })

  it("is_not_empty → access-layer isNotEmpty (no value)", () => {
    expect(filterToCondition("notes", "is_not_empty", undefined)).toEqual([
      { key: "notes", isNotEmpty: true },
    ])
  })

  it("is_empty on a rich-document property opts out of SQL push (client-only)", () => {
    expect(filterToCondition("body", "is_empty", undefined, "rich-document")).toBeNull()
  })

  it("is_not_empty on a rich-document property opts out of SQL push (client-only)", () => {
    expect(filterToCondition("body", "is_not_empty", undefined, "rich-document")).toBeNull()
  })

  it("path_starts_with opts out of SQL push (client-only)", () => {
    expect(filterToCondition("crumbs", "path_starts_with", ["a"], "path-select")).toBeNull()
  })

  it("the four progress operators opt out of SQL push (client-only)", () => {
    for (const op of ["is_complete", "is_incomplete", "gte_percent", "lte_percent"] as const) {
      expect(filterToCondition("prog", op, 50, "progress")).toBeNull()
    }
  })
})

describe("filterToCondition — includes / not_includes use access-layer in / notIn", () => {
  it("includes single value → access-layer in [value]", () => {
    expect(filterToCondition("status", "includes", "open")).toEqual([
      { key: "status", in: ["open"] },
    ])
  })

  it("includes array → access-layer in array", () => {
    expect(filterToCondition("status", "includes", ["open", "in_progress"])).toEqual([
      { key: "status", in: ["open", "in_progress"] },
    ])
  })

  it("includes empty array → null (drop the filter)", () => {
    expect(filterToCondition("status", "includes", [])).toBeNull()
  })

  it("not_includes array → access-layer notIn", () => {
    expect(filterToCondition("status", "not_includes", ["done", "cancelled"])).toEqual([
      { key: "status", notIn: ["done", "cancelled"] },
    ])
  })
})

describe("filterToCondition — unsupported / malformed inputs", () => {
  it("unknown operator → null", () => {
    expect(filterToCondition("k", "wat", "v")).toBeNull()
  })

  it("equals with undefined value → null", () => {
    expect(filterToCondition("k", "equals", undefined)).toBeNull()
  })

  it("includes with non-array non-json value → null", () => {
    expect(filterToCondition("k", "includes", undefined)).toBeNull()
  })

  it("equals with sentinel and a non-date type → null", () => {
    expect(filterToCondition("status", "equals", { sentinel: "today" }, "select")).toBeNull()
  })
})

describe("filterToCondition — equals on an array-valued property uses containment (#13150)", () => {
  it("equals on a multi-relation → access-layer includes (array containment)", () => {
    expect(filterToCondition("persona", "equals", "aria", "multi-relation")).toEqual([
      { key: "persona", includes: "aria" },
    ])
  })

  it("equals on a multi-select → access-layer includes (array containment)", () => {
    expect(filterToCondition("tags", "equals", "eng", "multi-select")).toEqual([
      { key: "tags", includes: "eng" },
    ])
  })

  it("equals on a scalar relation stays scalar eq (regression guard)", () => {
    expect(filterToCondition("pageTypeId", "equals", "pt-1", "relation")).toEqual([
      { key: "pageTypeId", eq: "pt-1" },
    ])
  })

  it("equals with no type stays scalar eq (unchanged default)", () => {
    expect(filterToCondition("status", "equals", "open")).toEqual([{ key: "status", eq: "open" }])
  })
})

describe("filterToCondition — includes on an array-valued property uses containment (#14663)", () => {
  it("includes single value on a multi-relation → containment (not scalar in)", () => {
    expect(filterToCondition("persona", "includes", "aria", "multi-relation")).toEqual([
      { key: "persona", includes: "aria" },
    ])
  })

  it("includes single-element array on a multi-relation → single containment (no or)", () => {
    expect(filterToCondition("persona", "includes", ["aria"], "multi-relation")).toEqual([
      { key: "persona", includes: "aria" },
    ])
  })

  it("includes multi-value array on a multi-relation → ANY (or of containments)", () => {
    expect(filterToCondition("persona", "includes", ["aria", "mari"], "multi-relation")).toEqual([
      {
        or: [
          { key: "persona", includes: "aria" },
          { key: "persona", includes: "mari" },
        ],
      },
    ])
  })

  it("includes single value on a multi-select → containment", () => {
    expect(filterToCondition("tags", "includes", "eng", "multi-select")).toEqual([
      { key: "tags", includes: "eng" },
    ])
  })

  it("includes multi-value array on a multi-select → ANY (or of containments)", () => {
    expect(filterToCondition("tags", "includes", ["eng", "design"], "multi-select")).toEqual([
      {
        or: [
          { key: "tags", includes: "eng" },
          { key: "tags", includes: "design" },
        ],
      },
    ])
  })

  it("includes empty array on a multi-relation → null (drop the filter)", () => {
    expect(filterToCondition("persona", "includes", [], "multi-relation")).toBeNull()
  })

  it("includes on a scalar select stays scalar in (regression guard)", () => {
    expect(filterToCondition("status", "includes", ["open", "closed"], "select")).toEqual([
      { key: "status", in: ["open", "closed"] },
    ])
  })

  it("includes with no type stays scalar in (unchanged default)", () => {
    expect(filterToCondition("status", "includes", ["open"])).toEqual([
      { key: "status", in: ["open"] },
    ])
  })

  it("equals multi-value array on a multi-relation → ANY (no double-wrap)", () => {
    expect(filterToCondition("persona", "equals", ["aria", "mari"], "multi-relation")).toEqual([
      {
        or: [
          { key: "persona", includes: "aria" },
          { key: "persona", includes: "mari" },
        ],
      },
    ])
  })
})
