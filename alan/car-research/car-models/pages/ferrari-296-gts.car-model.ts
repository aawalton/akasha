import type { CarModel } from "../car-model.page-type.ts"

export const ferrari296Gts = {
  id: "019e4ad9-f670-7351-96b8-db519f6fb31d",
  pageTypeSlug: "car-model",
  slug: "ferrari-296-gts",
  title: "296 GTS",
  bodyStyle: "convertible",
  generation: "F171 (296 family)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "Open-top variant of the 296 GTB with a retractable hardtop (RHT). Same 2.9L twin-turbo V6 + electric motor PHEV powertrain rated at 819 hp combined; chassis reinforcement adds roughly 70 kg vs the GTB but performance is essentially identical (0-62 mph in 2.9 sec). Sources: https://en.wikipedia.org/wiki/Ferrari_296, https://www.ferrari.com/en-EN/auto/296-gts",
  powertrainOptions: ["PHEV"],
  segment: "exotic",
  shortList: false,
  sources:
    "- https://www.ferrari.com/en-EN/auto/296-gts\n- https://en.wikipedia.org/wiki/Ferrari_296\n- https://www.kbb.com/ferrari/296-gts/",
  exclusionReason: "All years excluded",
  carMakeSlug: "ferrari",
} as const satisfies CarModel
