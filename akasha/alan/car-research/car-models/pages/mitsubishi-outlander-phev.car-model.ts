import type { CarModel } from "../car-model.page-type.ts"

export const mitsubishiOutlanderPhev = {
  id: "019e4af2-2af2-7ee3-8555-5861d10053cf",
  pageTypeSlug: "car-model",
  slug: "mitsubishi-outlander-phev",
  title: "Outlander PHEV",
  bodyStyle: "suv",
  generation: "4th gen (GN0W, 2023+ US-market launch; mid-cycle refresh for MY2026)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The Outlander PHEV is a three-row (5+2) compact plug-in hybrid SUV — the only electrified Mitsubishi sold new in the US as of 2026-05-21. It uses a 2.4L Atkinson-cycle four paired with twin (front+rear) electric motors for standard Super All-Wheel Control (S-AWC) twin-motor AWD. The current generation launched as a US 2023 model with a 20.0 kWh battery and 38 mi EPA all-electric range; the 2026 mid-cycle refresh enlarges the battery to 22.7 kWh and lifts EV range to 45 mi and combined system output to 297 hp. The PHEV uses CHAdeMO for DC fast charging (top trims only) and J1772 for AC charging. The Outlander PHEV is positioned as a value PHEV three-row alternative to Toyota RAV4 Prime, Hyundai Tucson PHEV, and Kia Sportage PHEV. Sources: [Mitsubishi Outlander PHEV product page](https://www.mitsubishicars.com/cars-and-suvs/outlander-phev), [Mitsubishi 2026 PHEV refresh release](https://media.mitsubishicars.com/en-US/releases/2026-mitsubishi-outlander-plug-in-hybrid-mid-cycle-refresh-pricing-to-start-at-43245).",
  powertrainOptions: ["PHEV"],
  segment: "compact",
  shortList: false,
  sources:
    "- [Mitsubishi Outlander PHEV product page](https://www.mitsubishicars.com/cars-and-suvs/outlander-phev)\n- [Mitsubishi 2026 Outlander PHEV refresh press release](https://media.mitsubishicars.com/en-US/releases/2026-mitsubishi-outlander-plug-in-hybrid-mid-cycle-refresh-pricing-to-start-at-43245)\n- [Edmunds 2025 Outlander PHEV trims](https://www.edmunds.com/mitsubishi/outlander-phev/2025/trims/)\n- [KBB: 2026 PHEV price increase coverage](https://www.kbb.com/car-news/mitsubishi-outlander-plug-in-hybrid-increases-by-2800-for-2026/)",
  exclusionReason: "All years excluded",
  carMakeSlug: "mitsubishi",
} as const satisfies CarModel
