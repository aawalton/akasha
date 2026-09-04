import type { CarYear } from "../car-year.page-type.ts"

export const mclarenArtura2025 = {
  id: "019e4aec-a467-7c6f-8d86-e4355d39d773",
  pageTypeSlug: "car-year",
  slug: "mclaren-artura-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    "Major mid-cycle update. Combined output raised from 671 hp to 690 hp (M630 V6 plus axial-flux E-motor). Transmission gets revised calibration and a new pre-fill feature delivering 25% quicker gear shifts. EPA-rated electric-only range increased from ~11 mi to 21 mi via revised battery management calibration. The Artura Spider retractable-hardtop convertible joins the coupe (top stows in 11s; +136 lb over the coupe). New options: Performance Spider, MSO ('McLaren Special Operations') paint and trim package, updated Pirelli Cyber Tyre integration. Base coupe MSRP starts around $254,100. Source: https://www.edmunds.com/mclaren/artura/ ; https://cars.mclaren.com/us_en/artura",
  shortList: false,
  sources:
    "- https://www.edmunds.com/mclaren/artura/2025/features-specs/\n- https://www.cars.com/research/mclaren-artura-2025/\n- https://carbuzz.com/cars/mclaren/artura/2025/",
  exclusionReason: "All trims excluded",
  carModelSlug: "mclaren-artura",
} as const satisfies CarYear
