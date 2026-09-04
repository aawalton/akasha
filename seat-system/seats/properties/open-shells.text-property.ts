import type { List } from "@akasha/pages-system/page-property"
import type { TextProperty } from "@akasha/pages-system/text-property"

export type OpenShells = List<string>

export const openShells = {
  id: "01a06e54-0ecf-7959-818d-d60026e07e65",
  pageTypeSlug: "text-property",
  slug: "open-shells",
  propertySlug: "open-shells",
  definition: "every background command a seat started that is still live",
  max: 64,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A background command is named by the task the transcript gives it.",
    },
    {
      invariantKind: "departure",
      statement: "A command is listed until the notification naming it is read.",
    },
  ],
} as const satisfies TextProperty
