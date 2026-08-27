import { describe, expect, it } from "bun:test"
import type { PropertyDefinition } from "@shared/pages-core/types"
import { computeInboundSpecs, type InboundSpec, referrerWhere } from "./use-referrers"

const TARGET = "pt-target"
const SOURCE_A = "pt-source-a"
const SOURCE_B = "pt-source-b"

function def(
  id: string,
  type: PropertyDefinition["type"],
  targetPageTypeId?: string
): PropertyDefinition {
  return {
    id,
    title: id,
    type,
    ...(targetPageTypeId != null ? { config: { targetPageTypeId } } : {}),
  }
}

function map(
  entries: ReadonlyArray<readonly [string, readonly PropertyDefinition[]]>
): Map<string, readonly PropertyDefinition[]> {
  return new Map(entries)
}

const slugById = new Map<string, string>([
  [TARGET, "target"],
  [SOURCE_A, "source-a"],
  [SOURCE_B, "source-b"],
])

describe("computeInboundSpecs", () => {
  it("returns [] when pageTypeId is undefined", () => {
    const specs = computeInboundSpecs({
      pageTypeId: undefined,
      pageTypePropertiesMap: map([[SOURCE_A, [def("ref", "relation", TARGET)]]]),
      pageTypeSlugById: slugById,
    })
    expect(specs).toEqual([])
  })

  it("includes a single relation def whose target is the viewed type", () => {
    const specs = computeInboundSpecs({
      pageTypeId: TARGET,
      pageTypePropertiesMap: map([[SOURCE_A, [def("ref", "relation", TARGET)]]]),
      pageTypeSlugById: slugById,
    })
    expect(specs).toEqual([
      { sourcePageTypeSlug: "source-a", propertyId: "ref", propertyTitle: "ref", kind: "relation" },
    ])
  })

  it("includes a multi-relation def and records its cardinality", () => {
    const specs = computeInboundSpecs({
      pageTypeId: TARGET,
      pageTypePropertiesMap: map([[SOURCE_A, [def("refs", "multi-relation", TARGET)]]]),
      pageTypeSlugById: slugById,
    })
    expect(specs).toEqual([
      {
        sourcePageTypeSlug: "source-a",
        propertyId: "refs",
        propertyTitle: "refs",
        kind: "multi-relation",
      },
    ])
  })

  it("excludes relation defs targeting a different type", () => {
    const specs = computeInboundSpecs({
      pageTypeId: TARGET,
      pageTypePropertiesMap: map([[SOURCE_A, [def("ref", "relation", "pt-other")]]]),
      pageTypeSlugById: slugById,
    })
    expect(specs).toEqual([])
  })

  it("excludes non-relation properties even when config names the target", () => {
    const specs = computeInboundSpecs({
      pageTypeId: TARGET,
      pageTypePropertiesMap: map([[SOURCE_A, [def("text", "text", TARGET)]]]),
      pageTypeSlugById: slugById,
    })
    expect(specs).toEqual([])
  })

  it("excludes a relation def with no targetPageTypeId in config", () => {
    const specs = computeInboundSpecs({
      pageTypeId: TARGET,
      pageTypePropertiesMap: map([[SOURCE_A, [def("ref", "relation")]]]),
      pageTypeSlugById: slugById,
    })
    expect(specs).toEqual([])
  })

  it("skips source page-types absent from the slug map", () => {
    const specs = computeInboundSpecs({
      pageTypeId: TARGET,
      pageTypePropertiesMap: map([["pt-unmapped", [def("ref", "relation", TARGET)]]]),
      pageTypeSlugById: slugById,
    })
    expect(specs).toEqual([])
  })

  it("collects inbound seams across multiple source page-types", () => {
    const specs = computeInboundSpecs({
      pageTypeId: TARGET,
      pageTypePropertiesMap: map([
        [SOURCE_A, [def("ref", "relation", TARGET), def("noise", "select")]],
        [SOURCE_B, [def("refs", "multi-relation", TARGET)]],
      ]),
      pageTypeSlugById: slugById,
    })
    expect(specs).toHaveLength(2)
    expect(specs.map((s) => s.sourcePageTypeSlug).sort()).toEqual(["source-a", "source-b"])
  })
})

describe("referrerWhere", () => {
  const base: Omit<InboundSpec, "kind"> = {
    sourcePageTypeSlug: "source-a",
    propertyId: "ref",
    propertyTitle: "ref",
  }

  it("single relation → eq containment on the scalar id", () => {
    expect(referrerWhere({ ...base, kind: "relation" }, "page-1")).toEqual([
      { key: "ref", eq: "page-1" },
    ])
  })

  it("multi-relation → includes containment on the array", () => {
    expect(referrerWhere({ ...base, kind: "multi-relation" }, "page-1")).toEqual([
      { key: "ref", includes: "page-1" },
    ])
  })
})
