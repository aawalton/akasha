import type { PagePropertyEntry } from "@akasha/pages-system/page-property-entry"

export type Cases = "jsonl"

export const cases = {
  id: "01a053eb-6b25-7c2a-a50f-f804c41457e3",
  pageTypeSlug: "page-property-entry",
  slug: "cases",
  propertySlug: "cases",
  definition: "the labelled texts a prompt is judged by",
  properties: [
    { pagePropertySlug: "case-page", required: true, many: false },
    { pagePropertySlug: "definition", required: true, many: false },
    { pagePropertySlug: "case-statement", required: true, many: false },
    { pagePropertySlug: "case-answer", required: true, many: false },
  ],
} as const satisfies PagePropertyEntry
