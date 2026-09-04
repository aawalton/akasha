import type { CarModel } from "../car-model.page-type.ts"

export const bentleyFlyingSpur = {
  id: "019e4ad7-03a7-7f9f-9d99-b67f16491176",
  pageTypeSlug: "car-model",
  slug: "bentley-flying-spur",
  title: "Flying Spur",
  bodyStyle: "sedan",
  generation: "3rd gen facelift (2024+ PHEV-only)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "Bentley's flagship luxury sedan, redesigned for the 2025 model year as a PHEV-only lineup. Shares the Continental GT's twin-turbo 4.0L V8 plus electric motor and 25.9 kWh battery. Two power tunes: 671 hp/686 lb-ft (base, Azure) or 771 hp/738 lb-ft (Speed, Mulliner). Up to ~50 mi EV-mode range. AWD via 8-speed dual-clutch. 2026 lineup: base Flying Spur, Azure ($337,475 MSRP), Speed, Mulliner ($352,545 dealer-listed). Sources: https://www.bentleymotors.com/en/models/flying-spur.html ; https://www.bentleyofranchomirage.com/2025-bentley-flying-spur-speed ; https://www.bentleyofranchomirage.com/2026-bentley-flying-spur-azure",
  powertrainOptions: ["PHEV"],
  segment: "luxury-full-size",
  shortList: false,
  sources:
    "- https://www.bentleymotors.com/en/models/flying-spur.html\n- https://carbuzz.com/cars/bentley/flying-spur-speed/2025/\n- https://www.edmunds.com/bentley/flying-spur/\n- https://www.bentleymotors.com/en/models/flying-spur/flying-spur-mulliner.html",
  exclusionReason: "All years excluded",
  carMakeSlug: "bentley",
} as const satisfies CarModel
