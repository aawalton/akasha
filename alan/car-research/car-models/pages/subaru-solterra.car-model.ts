import type { CarModel } from "../car-model.page-type.ts"

export const subaruSolterra = {
  id: "019e4af6-e98d-70c2-b736-0db8df942a2e",
  pageTypeSlug: "car-model",
  slug: "subaru-solterra",
  title: "Solterra",
  bodyStyle: "suv",
  generation: "1st gen (e-TNGA / Toyota bZ4X platform)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The Solterra is Subarus first mass-market battery-electric SUV, jointly developed with Toyota (the platform twin is the Toyota bZ4X). Introduced for MY2023, it is built on the dedicated e-TNGA platform and exclusively sold with Symmetrical AWD (dual motors). Positioned as a Forester-sized compact electric SUV with light off-road credentials (X-MODE, 8.3 in ground clearance). For MY2025 Subaru cut MSRP by $6,500+ across the line [https://media.subaru.com/pressrelease/2264/1/2025-subaru-solterra-press-kit&searchresult]. For MY2026 it received a major refresh: new high-capacity 74.7 kWh battery, ~288 mi range, 150 kW DC fast charging (10-80% in ~28 min), uprated motors (233 hp standard, 338 hp on new XT trims), 14-inch touchscreen, and a native NACS port [https://media.subaru.com/newsrelease.do?id=2376]. The Solterra was assembled in Japan, so the federal 30D new-purchase tax credit historically did not apply, but Subaru Motors Finance has applied the $7,500 commercial lease credit through 9/30/2025.",
  powertrainOptions: ["BEV"],
  segment: "compact",
  shortList: true,
  sources:
    "- https://www.subaru.com/vehicles/solterra/2026.html\n- https://media.subaru.com/newsrelease.do?id=2376\n- https://media.subaru.com/pressrelease/2264/1/2025-subaru-solterra-press-kit&searchresult\n- https://www.edmunds.com/subaru/solterra/2026/features-specs/\n- https://www.iihs.org/ratings/vehicle/subaru/solterra-4-door-suv/2025",
  carMakeSlug: "subaru",
} as const satisfies CarModel
