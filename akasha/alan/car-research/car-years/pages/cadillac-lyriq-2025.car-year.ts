import type { CarYear } from "../car-year.page-type.ts"

export const cadillacLyriq2025 = {
  id: "019e4ad7-789f-740e-9850-208ca0be33da",
  pageTypeSlug: "car-year",
  slug: "cadillac-lyriq-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    "First sales year for the Lyriq under the simplified Luxury 1/2/3 + Sport 1/2/3 trim ladder. Cadillac dropped the base Tech trim, cut pricing $2,000-$2,700 across the lineup. Starting MSRP $58,600 for Luxury 1 RWD; AWD adds ~$3,500. Up to 326 mile EPA range (RWD), 515 hp AWD / 365 hp RWD. Sources: [Edmunds 2025 Lyriq](https://www.edmunds.com/cadillac/lyriq/2025/), [KBB 2025 Lyriq](https://www.kbb.com/cadillac/lyriq/2025/).",
  shortList: false,
  sources:
    "- [Edmunds 2025 Lyriq](https://www.edmunds.com/cadillac/lyriq/2025/)\n- [KBB 2025 Lyriq](https://www.kbb.com/cadillac/lyriq/2025/)\n- [Cadillac.com 2025 Lyriq archive](https://www.cadillac.com/electric/preceding-year/lyriq)",
  exclusionReason: "All trims excluded",
  carModelSlug: "cadillac-lyriq",
} as const satisfies CarYear
