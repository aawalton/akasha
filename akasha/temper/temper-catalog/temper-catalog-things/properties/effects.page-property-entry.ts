import type { PagePropertyEntry } from "@akasha/pages-system/page-property-entry"

export type Effects = "jsonl"

export const effects = {
  id: "01a05fb0-3ceb-742c-998f-6122c9954a30",
  pageTypeSlug: "page-property-entry",
  slug: "effects",
  propertySlug: "effects",
  definition: "what a thing does, one effect to a line",
  properties: [
    { pagePropertySlug: "metric-id", required: false, many: false },
    { pagePropertySlug: "effect-type", required: false, many: false },
    { pagePropertySlug: "effect-value", required: false, many: false },
    { pagePropertySlug: "effect-seconds", required: false, many: false },
    { pagePropertySlug: "buff-id", required: false, many: false },
    { pagePropertySlug: "debuff-id", required: false, many: false },
    { pagePropertySlug: "slotted-behavior", required: false, many: false },
    { pagePropertySlug: "value-type", required: false, many: false },
    { pagePropertySlug: "armor-weight", required: false, many: false },
    { pagePropertySlug: "value-per-piece", required: false, many: false },
    { pagePropertySlug: "value-per-ability", required: false, many: false },
    { pagePropertySlug: "skill-line-id", required: false, many: false },
    { pagePropertySlug: "effect-weapon-types", required: false, many: true, max: null },
    { pagePropertySlug: "per-weapon", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An effect moves a metric or puts a buff on whoever carries the effect.",
    },
    {
      invariantKind: "departure",
      statement: "An effect stating no metric states a buff or a debuff.",
    },
    {
      invariantKind: "departure",
      statement: "Which further fields an effect states is settled by the effect type.",
    },
  ],
} as const satisfies PagePropertyEntry
