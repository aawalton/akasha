import type { MobilityReading } from "../mobility-reading.page-type.ts"

export const supineSlr20260619Left = {
  id: "019f01e1-c05e-70ef-a211-dc2beadb1f9c",
  pageTypeSlug: "mobility-reading",
  slug: "supine-slr-2026-06-19-left",
  title: "supine-slr 2026-06-19 (left)",
  context: "standalone",
  mobilityReadingDate: "2026-06-19",
  mobilityReadingMetric: "supine-slr",
  side: "left",
  mobilityReadingValueNum: 45,
  mobilityReadingValueText: "~45° straight-leg raise (well below ~80° normal)",
} as const satisfies MobilityReading
