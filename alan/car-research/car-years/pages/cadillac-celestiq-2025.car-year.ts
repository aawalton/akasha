import type { CarYear } from "../car-year.page-type.ts"

export const cadillacCelestiq2025 = {
  id: "019e4ad8-5bd1-7bd0-a0f2-0f255f0042dc",
  pageTypeSlug: "car-year",
  slug: "cadillac-celestiq-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    "First customer-delivery model year. Bespoke build-to-order ultra-luxury sedan, deliveries began June 2025. Base price ~$340,000 before bespoke options. 111-kWh battery, 655 hp / 646 lb-ft dual-motor AWD, 303-mile EPA range, 3.7 second 0-60. 55-inch dash-spanning display, 38-speaker AKG audio, electrochromic glass roof. Sources: [Wikipedia Celestiq](https://en.wikipedia.org/wiki/Cadillac_Celestiq), [KBB Celestiq](https://www.kbb.com/cadillac/celestiq/).",
  shortList: false,
  sources:
    "- [Wikipedia Celestiq](https://en.wikipedia.org/wiki/Cadillac_Celestiq)\n- [KBB Celestiq](https://www.kbb.com/cadillac/celestiq/)\n- [Cadillac Society 2025 Celestiq](https://www.crestcadillactx.com/cadillac-reviews/2025-celestiq.htm)",
  exclusionReason: "All trims excluded",
  carModelSlug: "cadillac-celestiq",
} as const satisfies CarYear
