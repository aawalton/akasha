import type { CarModel } from "../car-model.page-type.ts"

export const lotusEletre = {
  id: "019e4aec-4045-73c9-ab8f-614a6347be1a",
  pageTypeSlug: "car-model",
  slug: "lotus-eletre",
  title: "Eletre",
  bodyStyle: "suv",
  generation: "1st gen (LFA platform / EPA)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The Lotus Eletre is the brand's first SUV and first mainstream battery-electric vehicle, launched globally in 2023 and arriving in the US for the 2024/2025 model year. Built on Lotus's bespoke 800V **Electric Premium Architecture (EPA)** at Geely's Wuhan, China plant, the Eletre is a full-size 5-passenger luxury electric SUV positioned against the Porsche Cayenne EV, BMW iX, Audi SQ8 e-tron, and Tesla Model X Plaid. It uses a 112 kWh battery pack, dual permanent-magnet motors (all-wheel drive), and supports DC fast charging up to 350+ kW. The Eletre R variant uses a 905-hp dual-motor setup with a 2-speed transmission on the rear axle for a 2.95-second 0-62 mph time. For 2026 Lotus revamped the global lineup into six new trims (600, 600 GT, 600 GT SE, 600 SPORT SE, 900 SPORT, 900 SPORT CARBON), replacing the prior Eletre / Eletre R two-trim split. Sources: [Lotus Cars US](https://www.lotuscars.com/en-US/eletre), [Electrek 2026 revamp](https://electrek.co/2025/04/02/lotus-revamps-2026-emeya-eletre-evs-dozen-new-trims-standard-features/), [Edmunds Eletre US pricing](https://www.edmunds.com/car-news/2025-lotus-eletre-pricing-announced.html).",
  powertrainOptions: ["BEV"],
  segment: "luxury-full-size",
  shortList: false,
  sources:
    "- [Lotus Cars US — Eletre](https://www.lotuscars.com/en-US/eletre)\n- [Electrek — 2026 trim revamp](https://electrek.co/2025/04/02/lotus-revamps-2026-emeya-eletre-evs-dozen-new-trims-standard-features/)\n- [Edmunds — 2025 Eletre US pricing announced](https://www.edmunds.com/car-news/2025-lotus-eletre-pricing-announced.html)\n- [CarBuzz — 2025 Eletre specs](https://carbuzz.com/cars/lotus/eletre/2025/)\n- [EV Database — Lotus Eletre](https://ev-database.org/car/1767/Lotus-Eletre)",
  exclusionReason: "All years excluded",
  carMakeSlug: "lotus",
} as const satisfies CarModel
