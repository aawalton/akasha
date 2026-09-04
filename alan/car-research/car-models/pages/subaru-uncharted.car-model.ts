import type { CarModel } from "../car-model.page-type.ts"

export const subaruUncharted = {
  id: "019e4af7-a591-78b4-b31e-5c12c0a8b070",
  pageTypeSlug: "car-model",
  slug: "subaru-uncharted",
  title: "Uncharted",
  bodyStyle: "crossover",
  generation: "1st gen (Toyota C-HR EV platform sibling)",
  modelYearsAvailable: "2026",
  overview:
    "All-new for MY2026, the Uncharted is Subarus subcompact BEV, slotted below the Solterra. It is the Subaru sibling of the new (US-market) Toyota C-HR EV, sharing platform and 74.7 kWh battery. The base Premium FWD trim ($34,995 MSRP) is Subarus first FWD-only vehicle in the US in many years and offers up to ~308 mi EPA range and 221 hp; upper Sport and GT trims add a rear motor for AWD and 338 hp combined output [https://media.subaru.com/pressrelease/2403/1/all-new-2026-subaru-uncharted-ev-arrives-more]. 10-80% DC fast charge in ~28 min via standard NACS port (Tesla Supercharger access). Class-leading 8.2 in ground clearance for the segment. Arrival: spring 2026.",
  powertrainOptions: ["BEV"],
  segment: "subcompact",
  shortList: true,
  sources:
    "- https://www.subaru.com/vehicles/uncharted/2026.html\n- https://media.subaru.com/pressrelease/2403/1/all-new-2026-subaru-uncharted-ev-arrives-more\n- https://www.subaru.com/2026-subaru-uncharted-ev.html\n- https://www.edmunds.com/subaru/uncharted/2026/features-specs/\n- https://www.kbb.com/subaru/uncharted/2026/specs/",
  carMakeSlug: "subaru",
} as const satisfies CarModel
