import type { CarModel } from "../car-model.page-type.ts"

export const volvoEc40 = {
  id: "019e4afc-bb8f-73f0-86a5-93bac97cc7ed",
  pageTypeSlug: "car-model",
  slug: "volvo-ec40",
  title: "EC40",
  bodyStyle: "crossover",
  generation: "1st gen (CMA platform, renamed from C40 Recharge in MY2026)",
  modelYearsAvailable: "2026",
  overview:
    "The EC40 is Volvo's compact coupe-style BEV — sloped-roof sibling of the EX40, formerly sold as the C40 Recharge. Volvo skipped MY2025 for the US market and brought it back as the EC40 for MY2026, on the same CMA platform and powertrain offerings as the EX40 (Single Motor RWD ~297 mi or Twin Motor AWD). Built in Ghent, Belgium. The fastback profile costs a small amount of cargo and rear headroom vs. the EX40 in exchange for a more distinctive look. Sources: https://www.kbb.com/volvo/ec40/, https://www.cars.com/research/volvo-ec40-2025/, https://www.volvocars.com/us/media/models/ec40/2025/press-releases/",
  powertrainOptions: ["BEV"],
  segment: "luxury-compact",
  shortList: false,
  sources:
    "- https://www.kbb.com/volvo/ec40/\n- https://www.volvocars.com/us/media/models/ec40/2025/press-releases/",
  exclusionReason: "All years excluded",
  carMakeSlug: "volvo",
} as const satisfies CarModel
