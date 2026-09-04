import type { CarYear } from "../car-year.page-type.ts"

export const ferrari296Speciale2026 = {
  id: "019e4adb-6e09-7081-ab7a-e12ed79fb72b",
  pageTypeSlug: "car-year",
  slug: "ferrari-296-speciale-2026",
  title: "2026",
  modelYear: 2026,
  refreshNotes:
    "First MY for the 296 Speciale (announced April 2025). 36 hp more from the V6 ICE, e-motor liberated to 177 hp, 868 hp total. 60 kg lighter dry weight (1,410 kg). Aero upgrades, new active rear wing, race-tuned suspension. Sources: https://www.ferrari.com/en-EN/auto/296-speciale, https://www.topgear.com/car-reviews/ferrari/296-speciale",
  shortList: false,
  sources:
    "- https://www.ferrari.com/en-EN/auto/296-speciale\n- https://www.topgear.com/car-reviews/ferrari/296-speciale\n- https://en.wikipedia.org/wiki/Ferrari_296",
  exclusionReason: "All trims excluded",
  carModelSlug: "ferrari-296-speciale",
} as const satisfies CarYear
