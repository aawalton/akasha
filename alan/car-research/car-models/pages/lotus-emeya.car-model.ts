import type { CarModel } from "../car-model.page-type.ts"

export const lotusEmeya = {
  id: "019e4aec-72c3-74d3-a016-b769bf688327",
  pageTypeSlug: "car-model",
  slug: "lotus-emeya",
  title: "Emeya",
  bodyStyle: "sedan",
  generation: "1st gen (LFA platform / EPA)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The Lotus Emeya is the brand's first electric sedan/liftback, launched globally in 2024 as a four-door 'Hyper-GT' on the same 800V EPA platform as the Eletre. Built at Geely's Wuhan, China plant alongside the Eletre, the Emeya is positioned against the Porsche Taycan, Audi RS e-tron GT, Lucid Air, and BMW i7. It uses a 102 kWh battery pack, dual permanent-magnet motors (all-wheel drive), and supports DC fast charging up to 350 kW (10-80% in ~18 minutes). The top Emeya R produces 905 hp / 726 lb-ft with a 2-speed transmission on the rear axle, hitting 0-62 mph in under 2.8 seconds. For 2026 Lotus restructured the global Emeya lineup into six new trims (600, 600 GT, 600 GT SE, 600 SPORT SE, 900 SPORT, 900 SPORT CARBON), mirroring the Eletre. Sources: [Lotus Cars US — Emeya](https://www.lotuscars.com/en-US/emeya), [Electrek 2026 revamp](https://electrek.co/2025/04/02/lotus-revamps-2026-emeya-eletre-evs-dozen-new-trims-standard-features/), [InsideEVs first drive](https://insideevs.com/reviews/725170/lotus-emeya-first-drive-review/).",
  powertrainOptions: ["BEV"],
  segment: "luxury-full-size",
  shortList: false,
  sources:
    "- [Lotus Cars US — Emeya](https://www.lotuscars.com/en-US/emeya)\n- [Electrek — 2026 trim revamp](https://electrek.co/2025/04/02/lotus-revamps-2026-emeya-eletre-evs-dozen-new-trims-standard-features/)\n- [InsideEVs — 2025 Emeya first drive](https://insideevs.com/reviews/725170/lotus-emeya-first-drive-review/)\n- [Top Gear — Emeya 2026 review](https://www.topgear.com/car-reviews/lotus/emeya)\n- [EV Database — Emeya R](https://ev-database.org/car/2143/Lotus-Emeya-R)",
  exclusionReason: "All years excluded",
  carMakeSlug: "lotus",
} as const satisfies CarModel
