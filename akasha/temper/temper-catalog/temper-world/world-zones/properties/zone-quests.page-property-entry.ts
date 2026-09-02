import type { PagePropertyEntry } from "@akasha/pages-system/page-property-entry"

export type ZoneQuests = "jsonl"

export const zoneQuests = {
  id: "01a06167-3f9b-700a-9b12-ff06441e9392",
  pageTypeSlug: "page-property-entry",
  slug: "zone-quests",
  propertySlug: "zone-quests",
  definition: "the quests a zone holds, one quest to a line",
  properties: [
    { pagePropertySlug: "eso-quest-id", required: true, many: false },
    { pagePropertySlug: "quest-name", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A quest here is one the game counts against the zone it is given in.",
    },
  ],
} as const satisfies PagePropertyEntry
