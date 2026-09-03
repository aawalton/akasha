import type { CarYear } from "../car-year.page-type.ts"

export const chevroletSilveradoEv2025 = {
  id: "019e4add-0a20-73a1-821d-95d1f8e2735a",
  pageTypeSlug: "car-year",
  slug: "chevrolet-silverado-ev-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    "2025 added LT and RST consumer trims to the previously fleet-only WT lineup; expanded battery options (Standard Range ~270 mi, Extended Range up to 422 mi, Max Range up to 492 mi). RST First Edition $94,500 sold out and replaced by regular RST. Source: [GM Newsroom 2025 Silverado EV](https://news.gm.com/home.detail.html/Pages/news/us/en/2024/oct/1007-silveradoev.html).",
  shortList: false,
  sources:
    "- [Chevrolet 2025 Silverado EV](https://www.chevrolet.com/electric/previous-year/silverado-ev)\n- [Edmunds 2025](https://www.edmunds.com/chevrolet/silverado-ev/2025/)\n- [GM 2025 Newsroom](https://news.gm.com/home.detail.html/Pages/news/us/en/2024/oct/1007-silveradoev.html)",
  exclusionReason: "All trims excluded",
  carModelSlug: "chevrolet-silverado-ev",
} as const satisfies CarYear
