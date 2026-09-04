import type { CarYear } from "../car-year.page-type.ts"

export const teslaModelX2026 = {
  id: "019e4af9-4187-761e-8e50-e49dab19e6d9",
  pageTypeSlug: "car-year",
  slug: "tesla-model-x-2026",
  title: "2026",
  modelYear: 2026,
  refreshNotes:
    "MY2026 announced as the FINAL Model X production year (Tesla announced January 2026 that S/X production ends Q2 2026). Specs carry over from MY2025: Long Range AWD $99,990 (352mi, 670hp), Plaid $114,990 (335mi, 1,020hp). Adds the 7yr/70k-mile High-Priced Propulsion-Related Part Warranty layered on the 8yr/150k-mile battery and drive-unit warranty. Sources: https://www.kbb.com/tesla/model-x/2026/specs/ , https://www.edmunds.com/tesla/model-x/2026/features-specs/ , https://cars.usnews.com/cars-trucks/tesla/model-x",
  shortList: false,
  sources:
    "- https://www.kbb.com/tesla/model-x/2026/specs/\n- https://www.edmunds.com/tesla/model-x/2026/features-specs/\n- https://cars.usnews.com/cars-trucks/tesla/model-x\n- https://www.tparts.com/blogs/tesla-latest-news/tesla-adds-7-year-propulsion-warranty-for-2026-models-in-us-and-canada",
  exclusionReason: "All trims excluded",
  carModelSlug: "tesla-model-x",
} as const satisfies CarYear
