import type { TextProperty } from "@akasha/pages-system/text-property"

export type NodeId = string

export const nodeId = {
  id: "01a05fc6-81fc-7831-9ded-1ba2e1d47ca1",
  pageTypeSlug: "text-property",
  slug: "node-id",
  propertySlug: "node-id",
  definition: "the name a node answers to inside its own tree",
  max: 100,
  nameFormatSlug: null,
  invariants: [
    { invariantKind: "gap", statement: "This property is a relation to a node of the same tree." },
  ],
} as const satisfies TextProperty
