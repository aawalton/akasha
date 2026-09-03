import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"

export type SelectionPolicy = Page

export const selectionPolicy = {
  id: "01a06838-7a9d-7d0a-8e41-674ebea29caf",
  pageTypeSlug: "page-type",
  slug: "selection-policy",
  definition: "the numbers the coach picks and bounds a session by",
  pluralSlug: "selection-policies",
  extendsSlug: "page-type/page",
  properties: [],
  invariants: [
    {
      invariantKind: "departure",
      statement: "One page carries the numbers, and there is never a second.",
    },
    {
      invariantKind: "departure",
      statement: "Every number the selector weighs by stands on this page rather than in code.",
    },
    {
      invariantKind: "constraint",
      statement: "A number missing here stops the selector rather than coming from somewhere else.",
    },
    {
      invariantKind: "gap",
      statement: "Each number the selector reads stands as a property of this page type.",
    },
  ],
} as const satisfies PageType
