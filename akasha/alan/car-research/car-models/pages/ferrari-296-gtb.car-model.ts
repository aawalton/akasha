import type { CarModel } from "../car-model.page-type.ts"

export const ferrari296Gtb = {
  id: "019e4ad9-d740-78d4-98a1-e894655ca89b",
  pageTypeSlug: "car-model",
  slug: "ferrari-296-gtb",
  title: "296 GTB",
  bodyStyle: "coupe",
  generation: "F171 (296 family)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "Mid-engine plug-in hybrid two-seat coupe; Ferrari's first V6 road car since the Dino. Combines a 2.9L 120-degree twin-turbo V6 (654 hp ICE) with a 165 hp electric motor between engine and 8-speed DCT for a combined 819 hp through RWD. Targets the segment between the entry-level GT cars and the SF90 hypercar. Launched 2022; continues through MY2026 alongside the new 296 Speciale derivative. Sources: https://en.wikipedia.org/wiki/Ferrari_296, https://www.ferrari.com/en-EN/auto/296-gtb",
  powertrainOptions: ["PHEV"],
  segment: "exotic",
  shortList: false,
  sources:
    "- https://www.ferrari.com/en-EN/auto/296-gtb\n- https://en.wikipedia.org/wiki/Ferrari_296\n- https://www.cars.com/research/ferrari-296_gtb-2025/\n- https://www.kbb.com/ferrari/296-gtb/",
  exclusionReason: "All years excluded",
  carMakeSlug: "ferrari",
} as const satisfies CarModel
