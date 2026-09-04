import type { CarModel } from "../car-model.page-type.ts"

export const bmwXm = {
  id: "019e4ad7-dbf9-7aad-8b49-4df3bf9b6da1",
  pageTypeSlug: "car-model",
  slug: "bmw-xm",
  title: "XM",
  bodyStyle: "suv",
  generation: "1st gen (G09, 2023-)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The BMW XM is BMW M's flagship plug-in hybrid performance SUV, launched MY2023 as the first standalone M model since the original M1. It pairs a 4.4L M TwinPower Turbo V8 with an electric motor for a combined 644 hp (XM base, MY2025) or 738 hp (XM Label, MY2026). The XM is BMW's most powerful production M car. For MY2026 BMW consolidated the lineup to a single XM Label trim at $159,600 (down from the $187k Label Red of MY2025), dropping the lower-power base XM. 30-mile EPA-rated electric range.\n\nSources:\n- https://www.bmwusa.com/vehicles/m-series/xm/bmw-xm.html\n- https://www.bmwblog.com/2026/01/14/2026-bmw-xm-price-cut-charging-updates/",
  powertrainOptions: ["PHEV"],
  segment: "luxury-full-size",
  shortList: false,
  sources:
    "- BMW USA XM — https://www.bmwusa.com/vehicles/m-series/xm/bmw-xm.html\n- BMW Blog XM 2026 update — https://www.bmwblog.com/2026/01/14/2026-bmw-xm-price-cut-charging-updates/\n- Edmunds 2026 XM Label — https://www.edmunds.com/bmw/xm-label/\n- Edmunds 2025 XM — https://www.edmunds.com/bmw/xm/",
  exclusionReason: "All years excluded",
  carMakeSlug: "bmw",
} as const satisfies CarModel
