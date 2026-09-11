import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const openAgents = {
  id: "01a06e54-0ed0-7742-a4ff-9477de411c0c",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "open-agents",
  propertySlug: "open-agents",
  definition: "every subagent a seat started that is still live",
  maxLength: 64,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A subagent is named by the task the transcript gives that subagent.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent awaited within the turn that started that subagent is not listed.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
