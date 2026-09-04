import type { CarYear } from "../car-year.page-type.ts"

export const kiaEv92025 = {
  id: "019e4ae6-5678-7518-9db0-740b96a06c11",
  pageTypeSlug: "car-year",
  slug: "kia-ev9-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    "Carryover MY following 2024 launch. Five trims: Light (RWD), Light Long Range (RWD), Wind (AWD), Land (AWD), GT-Line (AWD). CCS1 charging port; NACS adapter program for free if delivered after 2024-09-04. Same E-GMP platform, same 76.1 kWh / 99.8 kWh battery options. Source: https://www.kbb.com/kia/ev9/2025/specs/",
  shortList: false,
  sources:
    "https://www.kiamedia.com/us/en/models/ev9/2025\nhttps://cars.usnews.com/cars-trucks/kia/ev9/2025\nhttps://www.edmunds.com/kia/ev9/2025/trims/",
  exclusionReason: "All trims excluded",
  carModelSlug: "kia-ev9",
} as const satisfies CarYear
