import type { CarModel } from "../car-model.page-type.ts"

export const gmcHummerEvPickup = {
  id: "019e4adf-1297-796a-8b1b-5c6d486b9f51",
  pageTypeSlug: "car-model",
  slug: "gmc-hummer-ev-pickup",
  title: "Hummer EV Pickup",
  bodyStyle: "truck",
  generation: "1st gen (BT1 / Ultium platform)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The GMC Hummer EV Pickup is a full-size, ultra-premium electric pickup based on GM Ultium battery architecture (800V). Resurrects the Hummer nameplate as a GMC sub-brand. Targets buyers wanting a tech-flagship halo EV with extreme off-road capability (CrabWalk, adjustable air suspension, Extract Mode), 1,000 hp in top tri-motor form, and Watts-to-Freedom launch mode. Production at GM Factory Zero in Detroit-Hamtramck since late 2021. Sources: https://en.wikipedia.org/wiki/GMC_Hummer_EV ; https://www.gmc.com/electric/hummer-ev/pickup-truck ; https://www.edmunds.com/gmc/hummer-ev/",
  powertrainOptions: ["BEV"],
  segment: "full-size",
  shortList: false,
  sources:
    "- https://www.gmc.com/electric/hummer-ev/pickup-truck\n- https://en.wikipedia.org/wiki/GMC_Hummer_EV\n- https://www.edmunds.com/gmc/hummer-ev/\n- https://www.kbb.com/gmc/hummer-ev-pickup/2025/specs/",
  exclusionReason: "All years excluded",
  carMakeSlug: "gmc",
} as const satisfies CarModel
