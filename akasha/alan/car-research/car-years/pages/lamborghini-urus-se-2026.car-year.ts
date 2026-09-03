import type { CarYear } from "../car-year.page-type.ts"

export const lamborghiniUrusSe2026 = {
  id: "019e4ae5-c6c2-707e-b2b1-2b68df2c75d8",
  pageTypeSlug: "car-year",
  slug: "lamborghini-urus-se-2026",
  title: "2026",
  modelYear: 2026,
  refreshNotes:
    "MY2026 Urus SE: carryover from MY25 with a modest price bump (KBB lists ~$280,736 starting vs ~$276,741 MY25). Same powertrain, same EPA numbers, same chassis. The MY26 Urus lineup in the US continues to offer Urus S (ICE), Urus SE (PHEV), and Urus Performante (ICE) — the SE is the only electrified trim. Sources: https://www.kbb.com/lamborghini/urus/ , https://www.edmunds.com/lamborghini/urus/",
  shortList: false,
  sources:
    "1. https://www.lamborghini.com/en-en/models/urus/urus-se\n2. https://www.kbb.com/lamborghini/urus/\n3. https://www.edmunds.com/lamborghini/urus/\n4. https://carbuzz.com/cars/lamborghini/urus-se/",
  exclusionReason: "All trims excluded",
  carModelSlug: "lamborghini-urus-se",
} as const satisfies CarYear
