import type { CarYear } from "../car-year.page-type.ts"

export const chevroletEquinoxEv2025 = {
  id: "019e4ad6-af69-75da-9210-6c892bbd5d43",
  pageTypeSlug: "car-year",
  slug: "chevrolet-equinox-ev-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    "2025 was the second model year for the Equinox EV. Trim structure simplified to LT and RS only (down from 1LT/2LT/3LT/2RS/3RS for 2024) with packages used to recreate higher-trim equivalents. FWD horsepower raised from 213 hp to 220 hp; AWD horsepower raised from 288 hp to 300 hp. EPA range up to 319 mi FWD / 285 mi AWD. Base price held near $34,995 including destination. Sources: [Cars.com 2025 Equinox EV intro](https://www.cars.com/articles/2025-chevrolet-equinox-ev-more-power-and-available-features-same-base-price-486275/), [Edmunds 2025 Equinox EV](https://www.edmunds.com/chevrolet/equinox-ev/2025/).",
  shortList: false,
  sources:
    "- [Cars.com 2025 Equinox EV](https://www.cars.com/research/chevrolet-equinox_ev-2025/)\n- [Edmunds 2025](https://www.edmunds.com/chevrolet/equinox-ev/2025/)\n- [KBB 2025 specs](https://www.kbb.com/chevrolet/equinox-ev/2025/specs/)",
  exclusionReason: "American car manufacturer — personal exclusion",
  carModelSlug: "chevrolet-equinox-ev",
} as const satisfies CarYear
