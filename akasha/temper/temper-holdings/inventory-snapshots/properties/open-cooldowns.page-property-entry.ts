import type { PagePropertyEntry } from "@akasha/pages-system/page-property-entry"

export type OpenCooldowns = "jsonl"

export const openCooldowns = {
  id: "01a0675a-f185-721b-a712-f182fa1ba39b",
  pageTypeSlug: "page-property-entry",
  slug: "open-cooldowns",
  propertySlug: "open-cooldowns",
  definition: "when each timed activity comes round again, one activity to a line",
  properties: [
    { pagePropertySlug: "cooldown-key", required: true, many: false },
    { pagePropertySlug: "ready-at", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "One line is one cooldown a reading found.",
    },
    {
      invariantKind: "departure",
      statement: "A cooldown names when it comes round again rather than how long is left.",
    },
  ],
} as const satisfies PagePropertyEntry
