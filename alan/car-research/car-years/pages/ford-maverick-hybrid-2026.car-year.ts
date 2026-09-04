import type { CarYear } from "../car-year.page-type.ts"

export const fordMaverickHybrid2026 = {
  id: "019e4adf-57b7-72f3-9fc7-0db2ab207b7c",
  pageTypeSlug: "car-year",
  slug: "ford-maverick-hybrid-2026",
  title: "2026",
  modelYear: 2026,
  refreshNotes:
    "MY2026 Maverick carries over 2025's refresh with minor pricing changes. Trim mix unchanged: XL, XLT, Lariat (Hybrid available); Lobo, Tremor (EcoBoost-only). 2.5L Hybrid (184 hp combined per Ford 2026 specs; 191 hp via prior Ford literature) with eCVT, FWD standard or AWD optional (~$1,000 FWD upgrade / $2,220 AWD). All-in starting MSRP from $28,840. Lariat is AWD-standard; on Lariat the hybrid is a $2,220 upcharge. Sources: [Ford.com 2026 Maverick](https://www.ford.com/trucks/maverick/), [Edmunds 2026 Maverick Hybrid](https://www.edmunds.com/ford/maverick/2026/hybrid/), [Cars.com 2026 Maverick](https://www.cars.com/research/ford-maverick-2026/).",
  shortList: false,
  sources:
    "- [Ford.com 2026 Maverick](https://www.ford.com/trucks/maverick/)\n- [Edmunds 2026 Maverick Hybrid](https://www.edmunds.com/ford/maverick/2026/hybrid/)\n- [J.D. Power 2026 Maverick](https://www.jdpower.com/cars/2026/ford/maverick)",
  exclusionReason: "All trims excluded",
  carModelSlug: "ford-maverick-hybrid",
} as const satisfies CarYear
