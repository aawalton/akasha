import type { CarModel } from "../car-model.page-type.ts"

export const chevroletEquinoxEv = {
  id: "019e4ad6-8813-754f-8443-586b0ffef6f2",
  pageTypeSlug: "car-model",
  slug: "chevrolet-equinox-ev",
  title: "Equinox EV",
  bodyStyle: "suv",
  generation: "1st gen (Ultium / BEV3 platform)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The Chevrolet Equinox EV is a compact battery-electric crossover built on GM's Ultium / BEV3 platform. It launched in mid-2024 as a 2024 model, becoming Chevrolet's volume affordable BEV after the original Bolt EV/EUV ended production. It shares its skateboard with the Blazer EV and Cadillac Lyriq but in a smaller, lower-priced package. Target buyers: mainstream compact-SUV shoppers trading in a RAV4/CR-V/Equinox ICE. The 2025 and 2026 model years carry the same nameplate, with a price/option-package reshuffle for 2026 but no major hardware change. Sources: [Chevrolet Equinox EV](https://www.chevrolet.com/electric/equinox-ev), [Wikipedia](https://en.wikipedia.org/wiki/Chevrolet_Equinox_EV).",
  powertrainOptions: ["BEV"],
  segment: "compact",
  shortList: false,
  sources:
    "- [Chevrolet Equinox EV product page](https://www.chevrolet.com/electric/equinox-ev)\n- [Edmunds 2025](https://www.edmunds.com/chevrolet/equinox-ev/2025/)\n- [Edmunds 2026](https://www.edmunds.com/chevrolet/equinox-ev/)\n- [Wikipedia Chevrolet Equinox EV](https://en.wikipedia.org/wiki/Chevrolet_Equinox_EV)",
  exclusionReason: "American car manufacturer — personal exclusion",
  carMakeSlug: "chevrolet",
} as const satisfies CarModel
