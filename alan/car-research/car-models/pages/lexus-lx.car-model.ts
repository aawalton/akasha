import type { CarModel } from "../car-model.page-type.ts"

export const lexusLx = {
  id: "019e4aed-2b84-7139-afab-f89bb0d2220f",
  pageTypeSlug: "car-model",
  slug: "lexus-lx",
  title: "LX",
  bodyStyle: "suv",
  generation: "4th gen (J310)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The Lexus LX is the flagship body-on-frame SUV, sharing platform with the Toyota Land Cruiser/Sequoia. The LX 700h introduced for MY2025 is the first hybrid LX, with i-FORCE MAX twin-turbo V6 hybrid producing 457 hp. Sources: https://www.lexus.com/models/LX , https://pressroom.lexus.com/2025-lexus-lx/",
  powertrainOptions: ["HEV", "ICE"],
  segment: "luxury-full-size",
  shortList: false,
  sources: "- Lexus LX\n- EPA",
  exclusionReason: "All years excluded",
  carMakeSlug: "lexus",
} as const satisfies CarModel
