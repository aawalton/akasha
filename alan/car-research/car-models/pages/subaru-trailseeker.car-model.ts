import type { CarModel } from "../car-model.page-type.ts"

export const subaruTrailseeker = {
  id: "019e4af7-7a50-7a0e-a33f-f98582953a66",
  pageTypeSlug: "car-model",
  slug: "subaru-trailseeker",
  title: "Trailseeker",
  bodyStyle: "suv",
  generation: "1st gen (Toyota e-TNGA / bZ Woodland platform sibling)",
  modelYearsAvailable: "2026",
  overview:
    "All-new for MY2026, the Trailseeker is Subarus second BEV. Positioned above the Solterra in the lineup; it is the Subaru sibling of the Toyota bZ Woodland (also based on the e-TNGA platform). Larger and more rugged than the Solterra: 8.5 in of ground clearance, X-MODE Dual-Mode (Snow/Dirt + Deep Snow/Mud), Grip Control and Downhill Assist Control [https://www.subaru.com/vehicles/trailseeker/2026.html]. Standard dual-motor Symmetrical AWD produces 375 hp; 0-60 mph in 4.4 sec; 3,500 lb towing capacity. 74.7 kWh lithium-ion battery, EPA-estimated up to ~260 mi range, 150 kW DC fast charge (10-80% in ~28 min), native NACS port. 14-inch touchscreen (largest ever in a Subaru). Three trims: Premium, Limited, Touring. Starts at $39,995 MSRP. On sale early 2026 [https://media.subaru.com/pressrelease/2397/1/all-new-2026-subaru-trailseeker-combines-375-horsepower].",
  powertrainOptions: ["BEV"],
  segment: "compact",
  shortList: true,
  sources:
    "- https://www.subaru.com/vehicles/trailseeker/2026.html\n- https://media.subaru.com/pressrelease/2397/1/all-new-2026-subaru-trailseeker-combines-375-horsepower\n- https://www.subaru.com/vehicles/trailseeker/2026/specs-trim.html\n- https://www.cargurus.com/research/articles/2026-subaru-trailseeker-pricing-specs-release-date",
  carMakeSlug: "subaru",
} as const satisfies CarModel
