import type { CarYear } from "../car-year.page-type.ts"

export const mazdaCx902025 = {
  id: "019e4aed-5700-7840-a157-3d905977ebed",
  pageTypeSlug: "car-year",
  slug: "mazda-cx-90-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    "The 2025 CX-90 (inline-6 MHEV) carried the launch architecture from 2024 with minor running changes. Affected by 2024-2025 recalls covering PCM/ECM software (loss of drive power), i-stop restart failures, surround-view camera software, and false-positive automatic braking. Six trims: Turbo Select, Turbo Preferred, Turbo Premium, Turbo Premium Plus, Turbo S Premium, Turbo S Premium Plus. Source: https://www.consumerreports.org/cars/car-recalls-defects/mazda-cx-90-and-cx-70-recalled-for-software-related-problems-a4795490684/",
  shortList: false,
  sources:
    "- Cox Mazda trim guide: https://www.coxmazda.com/manufacturer-information/mazda-cx-90-trim-levels/\n- Consumer Reports recall coverage: https://www.consumerreports.org/cars/car-recalls-defects/mazda-cx-90-and-cx-70-recalled-for-software-related-problems-a4795490684/",
  exclusionReason: "All trims excluded",
  carModelSlug: "mazda-cx-90",
} as const satisfies CarYear
