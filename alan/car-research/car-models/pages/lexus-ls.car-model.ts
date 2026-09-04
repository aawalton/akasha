import type { CarModel } from "../car-model.page-type.ts"

export const lexusLs = {
  id: "019e4aee-1d8c-70ff-bd6e-cf7154f3e290",
  pageTypeSlug: "car-model",
  slug: "lexus-ls",
  title: "LS",
  bodyStyle: "sedan",
  generation: "5th gen (XF50)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The Lexus LS is the flagship full-size luxury sedan. The LS 500h is the hybrid variant with V6 + multi-stage hybrid system producing 354 hp combined. Lower-volume but still sold in US in 2025 and 2026. Sources: https://www.lexus.com/models/LS , https://pressroom.lexus.com/lexus-ls/",
  powertrainOptions: ["HEV", "ICE"],
  segment: "luxury-full-size",
  shortList: false,
  sources: "- Lexus LS\n- EPA",
  exclusionReason: "All years excluded",
  carMakeSlug: "lexus",
} as const satisfies CarModel
