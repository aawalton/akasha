import type { TextProperty } from "@akasha/pages/text-property"

export type DispatchedAs = string

export const dispatchedAs = {
  id: "01a05978-f2e3-737b-8b65-7a65013f5626",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "dispatched-as",
  propertySlug: "dispatched-as",
  definition: "the kind of agent a subagent was run as",
  maxLength: 100,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A kind is spelled as the tool running the kind takes the name.",
    },
    {
      invariantKind: "departure",
      statement: "A kind states this name and a subagent run as that kind repeats this name.",
    },
    {
      invariantKind: "gap",
      statement: "This property is a relation to an agent kind.",
    },
  ],
} as const satisfies TextProperty
