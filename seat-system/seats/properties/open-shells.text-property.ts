import type { List } from "@akasha/pages/page-property"
import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type OpenShells = List<string>

export const openShells = {
  id: "01a06e54-0ecf-7959-818d-d60026e07e65",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "open-shells",
  propertySlug: "open-shells",
  definition: "every background command a seat started that is still live",
  maxLength: 64,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A background command is named by the task the transcript gives that command.",
    },
    {
      invariantKind: "departure",
      statement: "A command is listed until the notification naming that command is read.",
    },
  ],
} as const satisfies TextProperty
