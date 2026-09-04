import type { List } from "@akasha/pages-system/page-property"
import type { TextProperty } from "@akasha/pages-system/text-property"

export type AscCapability = string

export type AscCapabilities = List<AscCapability>

export const ascCapabilities = {
  id: "01a05f87-1b05-7b14-8908-d107128af1be",
  pageTypeSlug: "text-property",
  slug: "asc-capabilities",
  propertySlug: "asc-capabilities",
  definition: "the capabilities Apple enables on an app's identifier",
  max: 60,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A capability is spelled as App Store Connect spells that capability.",
    },
    {
      invariantKind: "departure",
      statement: "A capability newly enabled remakes every App Store profile for that identifier.",
    },
    {
      invariantKind: "absence",
      statement: "A widget's own identifier is given no capability here.",
    },
  ],
} as const satisfies TextProperty
