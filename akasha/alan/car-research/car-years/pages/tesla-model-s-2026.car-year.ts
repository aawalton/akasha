import type { CarYear } from "../car-year.page-type.ts"

export const teslaModelS2026 = {
  id: "019e4af9-1aee-7f12-a941-964a351caba1",
  pageTypeSlug: "car-year",
  slug: "tesla-model-s-2026",
  title: "2026",
  modelYear: 2026,
  refreshNotes:
    "MY2026 announced as the FINAL Model S production year (Tesla announced January 2026 that S/X production ends Q2 2026). Pricing and specs essentially carry over from MY2025: Long Range AWD $86,630, Plaid $101,630. Adds 7yr/70k-mile High-Priced Propulsion-Related Part Warranty on top of the existing 8yr/150k-mile battery and drive-unit warranty. No federal tax credit (price cap and post-Sep 30 2025 expiration). Sources: https://www.kbb.com/tesla/model-s/2026/specs/ , https://cars.usnews.com/cars-trucks/tesla/model-s , https://www.tparts.com/blogs/tesla-latest-news/tesla-adds-7-year-propulsion-warranty-for-2026-models-in-us-and-canada",
  shortList: false,
  sources:
    "- https://www.kbb.com/tesla/model-s/2026/specs/\n- https://cars.usnews.com/cars-trucks/tesla/model-s\n- https://www.tparts.com/blogs/tesla-latest-news/tesla-adds-7-year-propulsion-warranty-for-2026-models-in-us-and-canada\n- https://www.edmunds.com/tesla/model-s/2026/st-402085866/features-specs/",
  exclusionReason: "All trims excluded",
  carModelSlug: "tesla-model-s",
} as const satisfies CarYear
