import type { CarModel } from "../car-model.page-type.ts"

export const lexusNx = {
  id: "019e4ae8-0ad0-70e4-8a1a-fa81fbfdb76d",
  pageTypeSlug: "car-model",
  slug: "lexus-nx",
  title: "NX",
  bodyStyle: "suv",
  generation: "2nd gen (AZ20)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The Lexus NX is a luxury compact crossover, redesigned for 2022 as the 2nd-generation model (AZ20). The electrified variants are the NX 350h (hybrid) and NX 450h+ (plug-in hybrid). The NX 450h+ is Lexus's first plug-in hybrid in the US. The NX uses Toyota's TNGA-K platform shared with the Toyota RAV4 and Camry. Sources: https://www.lexus.com/models/NX , https://pressroom.lexus.com/lexus-nx/",
  powertrainOptions: ["HEV", "PHEV", "ICE"],
  segment: "luxury-compact",
  shortList: false,
  sources: "- Lexus NX: https://www.lexus.com/models/NX\n- EPA: https://www.fueleconomy.gov/",
  exclusionReason: "All years excluded",
  carMakeSlug: "lexus",
} as const satisfies CarModel
