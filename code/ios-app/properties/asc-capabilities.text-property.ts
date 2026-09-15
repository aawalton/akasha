import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const ascCapabilities = {
  id: "01a05f87-1b05-7b14-8908-d107128af1be",
  type: "page-type/text-property",
  slug: "asc-capabilities",
  propertySlug: "asc-capabilities",
  definition: "the capabilities Apple enables on an app's identifier",
  maxLength: 60,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A capability is spelled as App Store Connect spells that capability.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A capability newly enabled remakes every App Store profile for that identifier.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A widget's own identifier is given no capability here.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
