import type { CarModel } from "../car-model.page-type.ts"

export const bmwI4 = {
  id: "019e4ad6-a480-7d5c-a411-d838a14367f7",
  pageTypeSlug: "car-model",
  slug: "bmw-i4",
  title: "i4",
  bodyStyle: "sedan",
  generation: "1st gen (G26, 2022-)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The BMW i4 is the all-electric variant of the BMW 4 Series Gran Coupe, launched for the 2022 model year on the modified CLAR platform. It is BMW's volume-selling electric sedan / 5-door fastback in the US, slotting between the i3 (discontinued in 2022) and the i5. For 2026 BMW refreshed the i4 with more power, longer range, and renamed the M50 to M60. Three trims: eDrive40 (RWD), xDrive40 (AWD), M60 (AWD performance). Targets the Tesla Model 3 and Polestar 2 in the luxury-compact EV sedan segment.\n\nSources:\n- https://www.bmwusa.com/vehicles/bmw-i-series/i4/bmw-i4-gran-coupe.html\n- https://www.bmwblog.com/2025/12/11/2026-bmw-i4-power-range-updates/",
  powertrainOptions: ["BEV"],
  segment: "luxury-compact",
  shortList: false,
  sources:
    "- BMW USA — https://www.bmwusa.com/vehicles/bmw-i-series/i4/bmw-i4-gran-coupe.html\n- BMW press 2026 i4 — https://www.press.bmwgroup.com/usa/article/detail/T0453773EN_US/\n- BMW Blog 2026 i4 update — https://www.bmwblog.com/2025/12/11/2026-bmw-i4-power-range-updates/\n- Edmunds 2026 BMW i4 — https://www.edmunds.com/bmw/i4/",
  exclusionReason: "All years excluded",
  carMakeSlug: "bmw",
} as const satisfies CarModel
