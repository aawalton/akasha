import type { PagePropertyEntry } from "akasha/page/property-entry/page-property-entry.page-type.types.ts"

export const rapportDailies = {
  id: "01a0e0eb-6d9b-7d1b-89e5-763c8a530c6d",
  type: "page-type/page-property-entry",
  slug: "rapport-dailies",
  propertySlug: "rapport-dailies",
  definition: "the daily quests a companion likes, one quest to a line",
  properties: [{ pageProperty: "text-property/quest-name", required: true, many: false }],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A daily is named as a player finds it, with the giver where the name needs one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Doing a daily a companion likes with that companion out raises its rapport.",
    },
  ],
  types: "ts",
} as const satisfies PagePropertyEntry
