import type { CarModel } from "../car-model.page-type.ts"

export const volvoXc40 = {
  id: "019e4afd-5454-713f-a892-73fb2ffeb5b8",
  pageTypeSlug: "car-model",
  slug: "volvo-xc40",
  title: "XC40",
  bodyStyle: "suv",
  generation: "1st gen (CMA platform, 2018–present)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The XC40 is Volvo's gas-powered compact luxury SUV — the ICE/MHEV counterpart to the all-electric EX40. Built in Ghent, Belgium on the CMA platform shared with the EX40/EC40 and Polestar 2. Every US XC40 is electrified via Volvo's 48V mild-hybrid system: B4 (194 hp, FWD only) is the new standard powertrain starting MY2025 and replaces the prior turbo-only T-engines; B5 (247 hp, AWD) is the uplevel powertrain. Trims include Core, Plus, Ultra, and an Ultra Black Edition (B5 only). The MHEV system provides modest fuel-economy gains and smoother start/stop, not meaningful electric-only driving. Sources: https://www.volvocars.com/us/cars/xc40/, https://www.greencars.com/expert-insights/mild-hybrid-major-comfort-reviewing-the-2026-volvo-xc40, https://www.empirevolvocarssmithtown.com/blog/2025/july/16/new-2026-volvo-xc40-trim-levels-explained.htm",
  powertrainOptions: ["MHEV"],
  segment: "luxury-compact",
  shortList: false,
  sources:
    "- https://www.volvocars.com/us/cars/xc40/\n- https://www.greencars.com/expert-insights/mild-hybrid-major-comfort-reviewing-the-2026-volvo-xc40",
  exclusionReason: "All years excluded",
  carMakeSlug: "volvo",
} as const satisfies CarModel
