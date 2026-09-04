import type { CarYear } from "../car-year.page-type.ts"

export const mazdaCx90Phev2025 = {
  id: "019e4aed-1da3-7158-a5f2-c0a113f2dd3e",
  pageTypeSlug: "car-year",
  slug: "mazda-cx-90-phev-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    "The 2025 CX-90 PHEV is largely a carryover of the launch-year 2024 model. Mid-cycle running changes addressed early reliability complaints (smoother PHEV-to-ICE transitions). Inverter software was recalled and reflashed under NHTSA recall (loss of drive power in EV mode). Trims: PHEV Preferred, PHEV Premium, PHEV Premium Plus. Sources: https://www.consumerreports.org/cars/car-recalls-defects/mazda-cx-90-and-cx-70-recalled-for-software-related-problems-a4795490684/, https://www.edmunds.com/mazda/cx-90/2025/plug-in-hybrid/",
  shortList: false,
  sources:
    "- Edmunds 2025 CX-90 PHEV: https://www.edmunds.com/mazda/cx-90/2025/plug-in-hybrid/\n- Consumer Reports recall coverage: https://www.consumerreports.org/cars/car-recalls-defects/mazda-cx-90-and-cx-70-recalled-for-software-related-problems-a4795490684/",
  exclusionReason: "All trims excluded",
  carModelSlug: "mazda-cx-90-phev",
} as const satisfies CarYear
