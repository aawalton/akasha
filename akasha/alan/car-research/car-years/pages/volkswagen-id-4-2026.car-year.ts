import type { CarYear } from "../car-year.page-type.ts"

export const volkswagenId42026 = {
  id: "019e4afc-6396-7bf3-963d-d91e218bdb67",
  pageTypeSlug: "car-year",
  slug: "volkswagen-id-4-2026",
  title: "2026",
  modelYear: 2026,
  refreshNotes:
    "The big 2026 change is standard inclusion of a VW-branded NACS-to-CCS1 DC adapter, granting access to ~25,000 Tesla Superchargers from day one. AWD output bumped slightly (still 335 hp combined, but updated software / cooling). Lineup remains Pro (RWD or AWD), Pro S (RWD or AWD), Pro S Plus (AWD only). Base MSRP rose roughly $5,100 vs MY2025 according to CarsDirect: Pro $45,095, Pro S $50,195, Pro S Plus $57,655 (excluding the $1,475 destination fee). 12.9-inch touchscreen and IQ.DRIVE remain standard. 2-year Electrify America Pass+ with Plug & Charge included. Sources: https://www.carsdirect.com/automotive-news/2026-volkswagen-id-4-base-price-increasing-5-100 ; https://media.vw.com/releases/1891 ; https://www.vw.com/en/models/id-4.html ; https://www.cars.com/articles/how-much-is-the-2026-volkswagen-id-4-519597/",
  shortList: false,
  sources:
    "- https://www.vw.com/en/models/id-4.html\n- https://media.vw.com/releases/1891\n- https://www.carsdirect.com/automotive-news/2026-volkswagen-id-4-base-price-increasing-5-100\n- https://www.cars.com/articles/how-much-is-the-2026-volkswagen-id-4-519597/\n- https://www.howtogeek.com/2026-vw-id4-tesla-supercharger-access-more-power/",
  exclusionReason: "All trims excluded",
  carModelSlug: "volkswagen-id-4",
} as const satisfies CarYear
