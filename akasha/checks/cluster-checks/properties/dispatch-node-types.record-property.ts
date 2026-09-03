import type { List } from "@akasha/pages-system/page-property"
import type { RecordProperty } from "@akasha/pages-system/record-property"
import type { NodeKind } from "./node-kind.text-property.ts"
import type { Under } from "./under.text-property.ts"

export type DispatchNodeType = {
  nodeKind: NodeKind
  under?: Under
}

export type DispatchNodeTypes = List<DispatchNodeType>

export const dispatchNodeTypes = {
  id: "01a0680b-1003-7cc4-9e2b-70e7fed87534",
  pageTypeSlug: "record-property",
  slug: "dispatch-node-types",
  propertySlug: "dispatch-node-types",
  definition: "the tree nodes whose change wakes a check, each narrowed to a path or not",
  properties: [
    { pagePropertySlug: "node-kind", required: true, many: false },
    { pagePropertySlug: "under", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A check naming no node type here is woken by nothing on its own.",
    },
    {
      invariantKind: "departure",
      statement: "An entry naming no path is woken by that node kind anywhere in the tree.",
    },
  ],
} as const satisfies RecordProperty
