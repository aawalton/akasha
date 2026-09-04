import type { CarYear } from "../car-year.page-type.ts"

export const subaruSolterra2025 = {
  id: "019e4af7-e191-7389-b9ec-2fdf38715cb3",
  pageTypeSlug: "car-year",
  slug: "subaru-solterra-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    "MY2025 brought a significant MSRP reduction across all trims (>$6,500 vs MY2024) [https://media.subaru.com/pressrelease/2264/1/2025-subaru-solterra-press-kit&searchresult]. No major hardware changes: still 72.8 kWh battery, dual 80 kW motors, 215 hp combined, ~222-227 mi EPA range, CCS1 charging (max ~100 kW DCFC). Trim lineup: Premium, Limited, Touring, Touring Onyx Edition. Tesla Supercharger access added via SubaruConnect app starting October 2025 using a Subaru-supplied NACS adapter [https://media.subaru.com/newsrelease.do?id=2384]. Lease-credit pathway: $7,500 commercial-clean-vehicle credit applied to lease payments through Subaru Motors Finance, available until 9/30/2025.",
  shortList: true,
  sources:
    "- https://media.subaru.com/pressrelease/2264/1/2025-subaru-solterra-press-kit&searchresult\n- https://www.subaru.com/vehicles/solterra/2025/specs-trim.html\n- https://www.iihs.org/ratings/vehicle/subaru/solterra-4-door-suv/2025",
  carModelSlug: "subaru-solterra",
} as const satisfies CarYear
