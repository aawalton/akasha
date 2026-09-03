import type { TextProperty } from "@akasha/pages-system/text-property"

export type SubagentModel = string

export const subagentModel = {
  id: "01a06861-f664-7cf4-a6e6-849205f43fff",
  pageTypeSlug: "text-property",
  slug: "subagent-model",
  propertySlug: "subagent-model",
  definition: "the model a seat's subagents answer on rather than the seat's own",
  max: 40,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A subagent whose kind names no model answers on the model named here.",
    },
  ],
} as const satisfies TextProperty
