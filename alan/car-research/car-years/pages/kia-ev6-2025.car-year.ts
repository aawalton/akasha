import type { CarYear } from "../car-year.page-type.ts"

export const kiaEv62025 = {
  id: "019e4ae3-90c8-7758-b35f-e88bac742440",
  pageTypeSlug: "car-year",
  slug: "kia-ev6-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    "Significant mid-cycle refresh: revised front/rear styling, longer overall length and wheelbase, new dashboard with dual 12.3-inch curved displays, larger 84 kWh long-range battery (up from 77.4 kWh) for ~319 mi EPA range on Wind RWD, V2L support, integrated NACS port on Plug & Charge for native Tesla Supercharger access (mid-2025 production onward; earlier MY25 builds shipped CCS1 + free NACS-to-CCS1 adapter), revised steering wheel with capacitive controls. GT performance variant retained at 601 hp / 0-60 in 3.4 s. Sources: https://evchargingstations.com/chargingnews/2026-kia-ev6-lower-msrp/ , https://www.kiamedia.com/us/en/models/ev6/2025",
  shortList: false,
  sources:
    "https://www.kiamedia.com/us/en/models/ev6/2025\nhttps://www.kia.com/us/en/ev6/specs-compare\nhttps://cars.usnews.com/cars-trucks/kia/ev6/2025",
  exclusionReason: "All trims excluded",
  carModelSlug: "kia-ev6",
} as const satisfies CarYear
