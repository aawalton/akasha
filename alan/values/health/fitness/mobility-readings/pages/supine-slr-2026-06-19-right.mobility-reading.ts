import type { MobilityReading } from "../mobility-reading.page-type.ts"

export const supineSlr20260619Right = {
  id: "019f01e1-c123-7cf4-bb30-b96b4d3bf88b",
  pageTypeSlug: "mobility-reading",
  slug: "supine-slr-2026-06-19-right",
  title: "supine-slr 2026-06-19 (right)",
  context: "standalone",
  mobilityReadingDate: "2026-06-19",
  mobilityReadingMetric: "supine-slr",
  side: "right",
  mobilityReadingValueNum: 45,
  mobilityReadingValueText: "~45°, tighter than left (~5/10 stretch vs left at the same angle)",
} as const satisfies MobilityReading
