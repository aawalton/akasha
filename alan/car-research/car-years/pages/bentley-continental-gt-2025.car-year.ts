import type { CarYear } from "../car-year.page-type.ts"

export const bentleyContinentalGt2025 = {
  id: "019e4ad7-5ebb-7cbf-ba67-37c16dc5abd2",
  pageTypeSlug: "car-year",
  slug: "bentley-continental-gt-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    "Major redesign: the 2025 Continental GT is the first PHEV-only generation. V8 ICE-only trims discontinued. New 4.0L twin-turbo V8 + electric motor combos (671 hp base/Azure/S; 771 hp Speed/Mulliner) with a 25.9 kWh battery. ~400 lb weight gain vs. prior GT due to PHEV components. EPA-rated 52 MPGe / 19 mpg gas / ~39 mi EV range (Speed). Source: https://www.edmunds.com/car-news/2025-bentley-continental-gt-speed-first-drive-review.html ; https://carbuzz.com/cars/bentley/continental-gt-speed/2025/",
  shortList: false,
  sources:
    "- https://www.edmunds.com/car-news/2025-bentley-continental-gt-speed-first-drive-review.html\n- https://carbuzz.com/cars/bentley/continental-gt-speed/2025/\n- https://www.kbb.com/bentley/continental-gt/2025/specs/\n- https://www.edmunds.com/bentley/continental/2025/st-402064470/features-specs/",
  exclusionReason: "All trims excluded",
  carModelSlug: "bentley-continental-gt",
} as const satisfies CarYear
