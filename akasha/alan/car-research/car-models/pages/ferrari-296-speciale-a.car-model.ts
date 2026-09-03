import type { CarModel } from "../car-model.page-type.ts"

export const ferrari296SpecialeA = {
  id: "019e4ada-4009-7839-b9e8-8505a7381525",
  pageTypeSlug: "car-model",
  slug: "ferrari-296-speciale-a",
  title: "296 Speciale A",
  bodyStyle: "convertible",
  generation: "F171 (296 family) - Speciale Aperta derivative",
  modelYearsAvailable: "2026",
  overview:
    "Open-top 'Aperta' variant of the 296 Speciale (the A stands for Aperta, Italian for 'open'). Shares the Speciale's aero bodywork, not the GTS's, with a carbon-fiber-covered retractable hardtop. Same 868 hp combined PHEV output as the 296 Speciale coupe. MY2026-onward. Sources: https://en.wikipedia.org/wiki/Ferrari_296, https://www.encycarpedia.com/us/ferrari/25-296-speciale-aperta-convertible",
  powertrainOptions: ["PHEV"],
  segment: "exotic",
  shortList: false,
  sources:
    "- https://en.wikipedia.org/wiki/Ferrari_296\n- https://www.encycarpedia.com/us/ferrari/25-296-speciale-aperta-convertible\n- https://www.autoevolution.com/cars/ferrari-296-speciale-a-2025.html",
  exclusionReason: "All years excluded",
  carMakeSlug: "ferrari",
} as const satisfies CarModel
