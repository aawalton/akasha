import type { PagePropertyEntry } from "akasha/page/property-entry/page-property-entry.page-type.types.ts"

export const companionQuests = {
  id: "01a0e091-e9da-78c5-a2f3-0a14822277f1",
  type: "page-type/page-property-entry",
  slug: "companion-quests",
  propertySlug: "companion-quests",
  definition:
    "the quests a companion offers, one quest to a line, in the order a player takes them",
  properties: [
    { pageProperty: "number-property/eso-quest-id", required: true, many: false },
    { pageProperty: "text-property/quest-name", required: true, many: false },
    { pageProperty: "number-property/required-rapport-level", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A quest stating no rapport level is offered as soon as the companion is met.",
    },
  ],
  types: "ts",
} as const satisfies PagePropertyEntry
