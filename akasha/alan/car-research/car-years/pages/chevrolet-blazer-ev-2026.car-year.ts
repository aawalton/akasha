import type { CarYear } from "../car-year.page-type.ts"

export const chevroletBlazerEv2026 = {
  id: "019e4ada-34fd-7bb2-9a76-5a13c6994679",
  pageTypeSlug: "car-year",
  slug: "chevrolet-blazer-ev-2026",
  title: "2026",
  modelYear: 2026,
  refreshNotes:
    "For 2026, the rear-wheel-drive RS trim was discontinued; lineup now LT (FWD/AWD), RS (AWD only), and SS (AWD only). Small price increases (LT $44,600, RS $50,400, SS $60,600 - excluding destination). Range up to 312 mi (LT/RS FWD), 283 mi AWD, 302 mi SS. Carryover hardware. Sources: [Spitzer 2026 trims](https://www.spitzernorthfield.com/chevrolet-information/2026-chevy-blazer-ev-trim-levels-prices/), [KBB 2026](https://www.kbb.com/chevrolet/blazer-ev/).",
  shortList: false,
  sources:
    "- [Chevrolet 2026 Blazer EV](https://www.chevrolet.com/electric/blazer-ev)\n- [Edmunds 2026](https://www.edmunds.com/chevrolet/blazer-ev/)\n- [KBB 2026](https://www.kbb.com/chevrolet/blazer-ev/)",
  exclusionReason: "American car manufacturer — personal exclusion",
  carModelSlug: "chevrolet-blazer-ev",
} as const satisfies CarYear
