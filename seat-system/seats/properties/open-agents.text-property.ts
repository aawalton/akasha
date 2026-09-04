import type { List } from "@akasha/pages-system/page-property"
import type { TextProperty } from "@akasha/pages-system/text-property"

export type OpenAgents = List<string>

export const openAgents = {
  id: "01a06e54-0ed0-7742-a4ff-9477de411c0c",
  pageTypeSlug: "text-property",
  slug: "open-agents",
  propertySlug: "open-agents",
  definition: "every subagent a seat started that is still live",
  max: 64,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A subagent is named by the task the transcript gives it.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent awaited within the turn that started it is not listed.",
    },
  ],
} as const satisfies TextProperty
