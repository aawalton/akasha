import type { CarModel } from "../car-model.page-type.ts"

export const ferrari296Speciale = {
  id: "019e4ada-1e17-7db3-80e6-8ec62ffc775c",
  pageTypeSlug: "car-model",
  slug: "ferrari-296-speciale",
  title: "296 Speciale",
  bodyStyle: "coupe",
  generation: "F171 (296 family) - Speciale derivative",
  modelYearsAvailable: "2026",
  overview:
    "Hardcore, track-focused Speciale derivative of the 296 GTB; announced April 2025, sales begin as a MY2026 vehicle. ICE V6 is tuned up 36 hp to 690 hp, electric motor liberates 177 hp, combined output rises to 868 hp. Dry weight 1,410 kg (~60 kg lighter than GTB) yields ~616 hp/tonne. Successor in spirit to the 458 Speciale and 488 Pista lineage. Sources: https://www.ferrari.com/en-EN/auto/296-speciale, https://www.topgear.com/car-reviews/ferrari/296-speciale, https://en.wikipedia.org/wiki/Ferrari_296",
  powertrainOptions: ["PHEV"],
  segment: "exotic",
  shortList: false,
  sources:
    "- https://www.ferrari.com/en-EN/auto/296-speciale\n- https://www.topgear.com/car-reviews/ferrari/296-speciale\n- https://en.wikipedia.org/wiki/Ferrari_296",
  exclusionReason: "All years excluded",
  carMakeSlug: "ferrari",
} as const satisfies CarModel
