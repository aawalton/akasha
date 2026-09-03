import type { CarYear } from "../car-year.page-type.ts"

export const volvoEc402026 = {
  id: "019e4afe-3abd-7a69-9642-e5eed67118e6",
  pageTypeSlug: "car-year",
  slug: "volvo-ec40-2026",
  title: "2026",
  modelYear: 2026,
  refreshNotes:
    "EC40 returns to the US market for MY2026 after skipping MY2025 — the model was renamed from C40 Recharge as part of Volvo's BEV naming refresh. Mechanically the EC40 is the EX40 with a fastback roofline. Same CMA platform, same Single Motor / Twin Motor powertrain options. Source: https://www.kbb.com/volvo/ec40/, https://www.cars.com/research/volvo-ec40-2025/",
  shortList: false,
  sources:
    "- https://www.kbb.com/volvo/ec40/\n- https://www.volvocars.com/us/media/models/ec40/2025/press-releases/",
  exclusionReason: "All trims excluded",
  carModelSlug: "volvo-ec40",
} as const satisfies CarYear
