import type { CarModel } from "../car-model.page-type.ts"

export const hondaPrelude = {
  id: "019e4ae1-5a4a-78ec-81b8-3e41ef35d740",
  pageTypeSlug: "car-model",
  slug: "honda-prelude",
  title: "Prelude",
  bodyStyle: "coupe",
  generation: "6th gen (new, MY2026 launch)",
  modelYearsAvailable: "2026",
  overview:
    "The Prelude returns for MY2026 as a hybrid-electric sports coupe — Honda's first new Prelude since the fifth generation (BB8) was discontinued in 2001. It pairs the two-motor e:HEV system from the Civic Hybrid (2.0L Atkinson-cycle four plus two motors, 200 hp / 232 lb-ft combined) with Civic Type R chassis hardware (dual-axis front suspension, larger brakes) and Honda's new S+ Shift, a simulated 8-speed paddle-shift mode meant to give the e-CVT a more engaging feel. 0-60 lands near 6.5 seconds. The Prelude is positioned as Honda's halo electrified-driving model, expanding the hybrid lineup to four (Civic / Accord / CR-V / Prelude). Available in two trims: standard Hybrid and Hybrid Two-Tone. Arrives at dealers fall 2025 as a 2026 model; no 2025-MY Prelude exists.\n\nSources:\n- https://hondanews.com/en-US/honda-automobiles/releases/2026-honda-prelude-revealed-iconic-model-returns-with-hybrid-electric-power-type-r-chassis-hardware-and-new-honda-s-shift\n- https://hondanews.com/en-US/honda-automobiles/releases/release-0af91089c672e8c7eef0558d7600fbde-new-2026-honda-prelude-sports-coupe-expands-honda-hybrid-electric-lineup-to-four-fun-to-drive-and-fuel-efficient-models\n- https://automobiles.honda.com/prelude",
  powertrainOptions: ["HEV"],
  segment: "sports",
  shortList: false,
  sources:
    "- https://automobiles.honda.com/prelude\n- https://hondanews.com/en-US/honda-automobiles/releases/2026-honda-prelude-revealed-iconic-model-returns-with-hybrid-electric-power-type-r-chassis-hardware-and-new-honda-s-shift\n- https://www.edmunds.com/honda/prelude/2026/",
  exclusionReason: "All years excluded",
  carMakeSlug: "honda",
} as const satisfies CarModel
