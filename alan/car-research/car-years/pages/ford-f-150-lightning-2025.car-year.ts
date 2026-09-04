import type { CarYear } from "../car-year.page-type.ts"

export const fordF150Lightning2025 = {
  id: "019e4ade-ad72-7946-9249-25fe063b5957",
  pageTypeSlug: "car-year",
  slug: "ford-f-150-lightning-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    "Five-trim MY2025 lineup: Pro (fleet/retail), XLT, Flash, Lariat, Platinum. Standard Range 98 kWh battery on Pro/XLT/Lariat with up to 240 mi range; Extended Range 131 kWh on Flash/Platinum (standard) or optional on XLT/Lariat, up to 320 mi (300 mi on Platinum with 22-in wheels). Tesla Supercharger access via NACS adapter. Production paused for six weeks Nov 18 2024 - Jan 6 2025 (originally), then **paused indefinitely from Oct 2025** after a Novelis aluminum plant fire and citing better profitability on gas/hybrid F-150. MY2025 inventory continues at US dealers as of May 2026. Sources: [Edmunds 2025 Lightning](https://www.edmunds.com/ford/f-150-lightning/), [US News 2025 Lightning](https://cars.usnews.com/cars-trucks/ford/f-150-lightning), [Ford.com 2025 Lightning](https://www.ford.com/trucks/f150-lightning/).",
  shortList: false,
  sources:
    "- [Ford.com 2025 Lightning](https://www.ford.com/trucks/f150-lightning/)\n- [Edmunds 2025 Lightning](https://www.edmunds.com/ford/f-150-lightning/)\n- [KBB 2025 specs](https://www.kbb.com/ford/f150-lightning/2025/specs/)",
  exclusionReason: "All trims excluded",
  carModelSlug: "ford-f-150-lightning",
} as const satisfies CarYear
