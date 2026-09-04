import type { CarYear } from "../car-year.page-type.ts"

export const dodgeChargerDaytona2025 = {
  id: "019e4ad9-9215-7989-9592-8df99ba73834",
  pageTypeSlug: "car-year",
  slug: "dodge-charger-daytona-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    "MY2025 added the 4-door sedan body style (the MY2024 launched as 2-door coupe only); R/T and Scat Pack trims continued. R/T MSRP $54,930 (coupe); R/T AWD $57,995, Scat Pack AWD $64,995. Same 100.5 kWh (93.9 usable) battery and dual-motor AWD as MY2024. MY2025 caught both NHTSA recalls: instrument-cluster blank-out software fault (~20,271 units MY2024+MY2025 combined) and missing pedestrian-warning amplifier software (~8,390 units). Sources: https://carbuzz.com/cars/dodge/charger-daytona/2025/specs-and-trims/ ; https://www.cars.com/research/dodge-charger_daytona-2025/specs/ ; https://moparinsiders.com/stellantis-recalls-charger-daytona-ev-and-wagoneer-s-for-display-failure/",
  shortList: false,
  sources:
    "- https://www.cars.com/research/dodge-charger_daytona-2025/specs/\n- https://carbuzz.com/cars/dodge/charger-daytona/2025/specs-and-trims/\n- https://cars.usnews.com/cars-trucks/dodge/charger-daytona\n- https://www.edmunds.com/dodge/charger/2025/st-402063906/features-specs/",
  exclusionReason: "All trims excluded",
  carModelSlug: "dodge-charger-daytona",
} as const satisfies CarYear
