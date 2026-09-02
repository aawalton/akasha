import type { TextProperty } from "@akasha/pages-system/text-property"

export type CompletionItemPath = string

export const completionItemPath = {
  id: "01a05fc6-81fb-729c-8013-4df821b1c2d7",
  pageTypeSlug: "text-property",
  slug: "completion-item-path",
  propertySlug: "completion-item-path",
  definition: "one step of the way down a completion card to the item counted",
  max: 100,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A path is read in the order the page states each step.",
    },
  ],
} as const satisfies TextProperty
