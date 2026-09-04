import type { CarModel } from "../car-model.page-type.ts"

export const hondaCrVHybrid = {
  id: "019e4ae1-2ad2-7700-bf46-152f3156b09a",
  pageTypeSlug: "car-model",
  slug: "honda-cr-v-hybrid",
  title: "CR-V Hybrid",
  bodyStyle: "suv",
  generation: "6th gen (RS chassis, debuted MY2023)",
  modelYearsAvailable: "2023, 2024, 2025, 2026",
  overview:
    "The CR-V Hybrid is the electrified version of Honda's compact crossover, in its 6th generation (MY2023+). It uses the same two-motor e:HEV system as the Accord — 2.0L Atkinson-cycle four plus two motors for a combined 204 hp — with standard AWD on hybrid trims. Honda has confirmed that hybrid versions are roughly 50% of CR-V sales. For MY2025 the hybrid lineup was Sport Hybrid (FWD/AWD), Sport-L Hybrid (AWD), and Sport Touring Hybrid (AWD). For MY2026 Honda introduced the new TrailSport Hybrid trim with off-road-oriented tires, exclusive Ash Green Metallic paint, color-contrast accents, and a 360-degree camera, plus a standard 9-inch touchscreen and wireless CarPlay/Android Auto across all trims. There is also a hydrogen fuel-cell version, CR-V e:FCEV, which is excluded from this BEV/PHEV/HEV/MHEV-scoped tree.\n\nSources:\n- https://hondanews.com/en-US/releases/release-0d29cf91ab5515b985a1c286910cc6fb-rugged-electrified-and-refreshed-best-selling-honda-cr-v-gains-new-trailsport-hybrid-trim-and-more-standard-tech-as-2026-lineup-arriving-in-dealers-now\n- https://automobiles.honda.com/cr-v",
  powertrainOptions: ["HEV"],
  segment: "compact",
  shortList: false,
  sources:
    "- https://automobiles.honda.com/cr-v\n- https://www.edmunds.com/honda/cr-v/2025/hybrid/\n- https://hondanews.com/en-US/releases/release-0d29cf91ab5515b985a1c286910cc6fb-rugged-electrified-and-refreshed-best-selling-honda-cr-v-gains-new-trailsport-hybrid-trim-and-more-standard-tech-as-2026-lineup-arriving-in-dealers-now",
  exclusionReason: "All years excluded",
  carMakeSlug: "honda",
} as const satisfies CarModel
