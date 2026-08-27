import { describe, expect, it } from "bun:test"
import type { PropertyDefinition } from "@shared/pages-core/types"
import { computeSubpageSpecs, type SubpageSpec, subpageWhere } from "./use-subpages"

const SOURCE_A = "pt-source-a"
const SOURCE_B = "pt-source-b"

function def(id: string, type: PropertyDefinition["type"]): PropertyDefinition {
  return { id, title: id, type }
}

function map(
  entries: ReadonlyArray<readonly [string, readonly PropertyDefinition[]]>
): Map<string, readonly PropertyDefinition[]> {
  return new Map(entries)
}

const slugById = new Map<string, string>([
  [SOURCE_A, "source-a"],
  [SOURCE_B, "source-b"],
])

describe("computeSubpageSpecs", () => {
  it("yields a relation spec for a page-type with a parentId relation prop", () => {
    const specs = computeSubpageSpecs({
      pageTypePropertiesMap: map([[SOURCE_A, [def("parentId", "relation")]]]),
      pageTypeSlugById: slugById,
    })
    expect(specs).toEqual([
      { sourcePageTypeSlug: "source-a", propertyId: "parentId", kind: "relation" },
    ])
  })

  it("yields a multi-relation spec for a page-type with a parents multi-relation prop", () => {
    const specs = computeSubpageSpecs({
      pageTypePropertiesMap: map([[SOURCE_A, [def("parents", "multi-relation")]]]),
      pageTypeSlugById: slugById,
    })
    expect(specs).toEqual([
      { sourcePageTypeSlug: "source-a", propertyId: "parents", kind: "multi-relation" },
    ])
  })

  it("yields nothing for a page-type with neither containment prop", () => {
    const specs = computeSubpageSpecs({
      pageTypePropertiesMap: map([[SOURCE_A, [def("title", "text"), def("owner", "relation")]]]),
      pageTypeSlugById: slugById,
    })
    expect(specs).toEqual([])
  })

  it("ignores a parentId whose type is not relation, and parents whose type is not multi-relation", () => {
    const specs = computeSubpageSpecs({
      pageTypePropertiesMap: map([
        [SOURCE_A, [def("parentId", "text"), def("parents", "relation")]],
      ]),
      pageTypeSlugById: slugById,
    })
    expect(specs).toEqual([])
  })

  it("skips source page-types absent from the slug map", () => {
    const specs = computeSubpageSpecs({
      pageTypePropertiesMap: map([["pt-unmapped", [def("parentId", "relation")]]]),
      pageTypeSlugById: slugById,
    })
    expect(specs).toEqual([])
  })

  it("does not require any targetPageTypeId match — emits regardless of config", () => {
    const specs = computeSubpageSpecs({
      pageTypePropertiesMap: map([[SOURCE_A, [def("parentId", "relation")]]]),
      pageTypeSlugById: slugById,
    })
    expect(specs).toHaveLength(1)
  })

  it("collects containment seams across multiple source page-types", () => {
    const specs = computeSubpageSpecs({
      pageTypePropertiesMap: map([
        [SOURCE_A, [def("parentId", "relation"), def("noise", "select")]],
        [SOURCE_B, [def("parents", "multi-relation")]],
      ]),
      pageTypeSlugById: slugById,
    })
    expect(specs).toHaveLength(2)
    expect(specs.map((s) => s.sourcePageTypeSlug).sort()).toEqual(["source-a", "source-b"])
  })
})

describe("subpageWhere", () => {
  const relationSpec: SubpageSpec = {
    sourcePageTypeSlug: "source-a",
    propertyId: "parentId",
    kind: "relation",
  }
  const multiSpec: SubpageSpec = {
    sourcePageTypeSlug: "source-a",
    propertyId: "parents",
    kind: "multi-relation",
  }

  it("single relation → eq containment on the scalar id", () => {
    expect(subpageWhere(relationSpec, "page-1")).toEqual([{ key: "parentId", eq: "page-1" }])
  })

  it("multi-relation → includes containment on the array", () => {
    expect(subpageWhere(multiSpec, "page-1")).toEqual([{ key: "parents", includes: "page-1" }])
  })
})
