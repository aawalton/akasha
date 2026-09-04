import type { CarModel } from "../car-model.page-type.ts"

export const bentleyContinentalGtc = {
  id: "019e4ad6-e705-7c58-8a9c-3426568faa5c",
  pageTypeSlug: "car-model",
  slug: "bentley-continental-gtc",
  title: "Continental GTC",
  bodyStyle: "convertible",
  generation: "4th gen (Mk IV, 2024+ PHEV-only)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "Convertible (drop-top) variant of the Continental GT, marketed by Bentley as a distinct model line. Shares the GT's PHEV V8 powertrain (671 hp base/Azure/S; 771 hp Speed/Mulliner), 25.9 kWh battery, ~39 mi EV range. Slightly heavier (~5,952 lb) and slower (3.3 s 0-60 in Speed) than the coupe due to the folding-roof structure; trunk drops to 4.7 cu ft. 2026 lineup mirrors 2025 with five trims: base GTC, Azure, S, Speed, Mulliner. Sources: https://www.bentleyofranchomirage.com/2025-continental-gtc-speed ; https://carbuzz.com/cars/bentley/continental-gt-speed-convertible/2025/ ; https://www.autoblog.com/reviews/i-drove-the-2025-bentley-continental-gtc-speed-heres-my-honest-review",
  powertrainOptions: ["PHEV"],
  segment: "exotic",
  shortList: false,
  sources:
    "- https://www.bentleymotors.com/en/models/continental-gt.html\n- https://carbuzz.com/cars/bentley/continental-gt-speed-convertible/2025/\n- https://www.bentleyofranchomirage.com/2025-continental-gtc-speed\n- https://clevelandmotorsports.com/bentley-continental-gtc-model-review-cleveland-oh",
  exclusionReason: "All years excluded",
  carMakeSlug: "bentley",
} as const satisfies CarModel
