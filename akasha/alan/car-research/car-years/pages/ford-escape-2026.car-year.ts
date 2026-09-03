import type { CarYear } from "../car-year.page-type.ts"

export const fordEscape2026 = {
  id: "019e4adf-b109-7587-be3e-50bd405f17dd",
  pageTypeSlug: "car-year",
  slug: "ford-escape-2026",
  title: "2026",
  modelYear: 2026,
  refreshNotes:
    "MY2026 Escape is the **final model year**. US production ended Dec 2025 at Louisville Assembly; what's at dealers is what was built. Six trims continue (Active, ST-Line, ST-Line Select, ST-Line Elite, Platinum, PHEV) but **MY2026 Escape is not offered for sale in California, New York, Massachusetts, Vermont, Oregon, or Washington** — Ford declined CARB recertification for a final-year model. PHEV remains 14.4 kWh, 37 mi EV range, FWD-only, MSRP $35,400 + $1,495 destination = $36,895. National inventory is large (~11,000+ units). After 2026 Ford pivots fully away from Escape; no replacement announced. Sources: [Edmunds 2026 Escape PHEV](https://www.edmunds.com/ford/escape/2026/plug-in-hybrid/), [Jay Malone 2026 Escape trims](https://www.jaymaloneford.com/blog/2026/april/11/2026-ford-escape-trim-levels-active-st-line-st-line-select-st-line-elite-platinum-phev.htm), [AutoTechSpot - Escape discontinuation](https://autotechspot.com/car-updates/ford-escape-discontinued-2026), [Ford Authority - 2026 Escape packages](https://fordauthority.com/2025/10/2026-ford-escape-all-available-packages/).",
  shortList: false,
  sources:
    "- [Edmunds 2026 Escape PHEV](https://www.edmunds.com/ford/escape/2026/plug-in-hybrid/)\n- [Jay Malone Ford 2026 trims](https://www.jaymaloneford.com/blog/2026/april/11/2026-ford-escape-trim-levels-active-st-line-st-line-select-st-line-elite-platinum-phev.htm)\n- [Ford Authority - 2026 packages](https://fordauthority.com/2025/10/2026-ford-escape-all-available-packages/)",
  exclusionReason: "All trims excluded",
  carModelSlug: "ford-escape",
} as const satisfies CarYear
