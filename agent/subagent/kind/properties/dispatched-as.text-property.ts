import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const dispatchedAs = {
  id: "01a05978-f2e3-737b-8b65-7a65013f5626",
  type: "page-type/text-property",
  slug: "dispatched-as",
  propertySlug: "dispatched-as",
  definition: "the kind of agent a subagent was run as",
  maxLength: 100,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A kind is spelled as the tool running the kind takes the name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A kind states this name and a subagent run as that kind repeats this name.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "A kind's tool spelling is capitalised and that kind's page name is not.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "This property is a relation to an agent kind.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
