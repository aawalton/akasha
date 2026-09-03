import type { CarMake } from "../../car-make.page-type.ts"

export const astonMartin = {
  id: "019e4ad5-11c1-77bf-8c9e-323b5f9527c2",
  pageTypeSlug: "car-make",
  slug: "aston-martin",
  title: "Aston Martin",
  chargingNetworkAccess:
    "Aston Martin has not announced an NACS / Tesla Supercharger partnership. The Valhalla (the only electrified Aston Martin in MY2025/2026) is a PHEV with ~9 mi EV range and a small 6.1 kWh battery; charging-network access is not a marketed feature. No bundled free-charging promotion identified. Future BEV (~2030) charging-port strategy unannounced; Aston Martin's technical partnership with Lucid (NACS-aligned) is suggestive but not confirmed. Sources: https://windingroad.com/articles/features/automakers-embrace-tesla-nacs-proprietary-supercharger-network/ ; https://www.astonmartin.com/en-us/models/valhalla",
  country: "United Kingdom",
  drmPolicy:
    "Aston Martin Connected Car Services (telematics, remote lock/unlock, vehicle location, OTA, app) are provided complimentary for the first 3 years from warranty start. After that, owners must subscribe to retain Connected services; pricing is set 'at the prevailing annual rate' and not publicly disclosed. App functionality requires a paid 'Convenience', 'Advantage', 'Vehicle Maintenance', 'Vehicle Service', or 'Support Services' package. Core driving functions are not known to be subscription-locked, but remote/app features lapse without renewal. No public reports of Aston Martin remotely disabling propulsion or features post-sale. Sources: https://www.astonmartin.com/en-us/legal/am-connected-car-system-terms-and-conditions ; https://www.astonmartin.com/en-us/legal/aston-martin-connected-car-system-privacy-policy",
  electrificationStrategy:
    "Aston Martin has delayed its first BEV from 2026 to the end of the decade (now targeted around 2030). The current strategy emphasizes plug-in hybrid (PHEV) and mild-hybrid (MHEV) derivatives. The Valhalla (launched as a 2026 model) is the brand's first PHEV. A BEV is planned for around 2030, joined by another PHEV the same year, with hybrid derivatives continuing through 2035. Sources: https://www.wardsauto.com/news/aston-martin-delays-bev-model-targeting-more-hybrids-and-keeping-v-12/778352/ ; https://www.electrive.com/2022/02/03/aston-martin-to-focus-on-hybrid-and-electric-cars-from-2026/",
  foundingYear: 1913,
  killSwitchPolicy:
    "Data unavailable: No public statement from Aston Martin specific to the federal IIJA impaired-driving-detection mandate (NHTSA Advance Notice of Proposed Rulemaking) was found in searches of news, regulatory filings, and forums as of 2026-05. As a low-volume luxury OEM (~6,000 units/yr globally), Aston Martin is expected to follow the Alliance for Automotive Innovation industry position (which argues more research is needed before mandate) and implement whatever NHTSA finalizes via passive driver-monitoring camera/biometric sensing already present in DB12/Vantage/DBX driver-attention systems. No confirmed hardware versus software path. Sources: https://www.kbb.com/car-news/nhtsas-new-kill-switch-law-approaches-key-deadline/",
  nacsAdoption: "no",
  parentCorporation: "Aston Martin Lagonda Global Holdings plc",
  reliabilityNotes:
    "Aston Martin's sales volume is too small for Consumer Reports' annual brand-reliability survey to rank the marque. J.D. Power lists individual models but most recent model-years return 'No data' due to insufficient sample size; the brand is not included in J.D. Power's Vehicle Dependability Study brand awards. Anecdotal owner reports (PistonHeads, AstonMartinLife) cite electronics, infotainment, and Mercedes-AMG-shared powertrain wear as the most common issues — typical of low-volume luxury GTs. Sources: https://www.jdpower.com/cars/ratings/aston-martin ; https://www.jdpower.com/cars/2025/aston-martin/vantage",
  trims: "jsonl",
  shortList: false,
  sources:
    "- Aston Martin USA Valhalla page: https://www.astonmartin.com/en-us/models/valhalla\n- Aston Martin Connected Car Terms: https://www.astonmartin.com/en-us/legal/am-connected-car-system-terms-and-conditions\n- WardsAuto on BEV delay: https://www.wardsauto.com/news/aston-martin-delays-bev-model-targeting-more-hybrids-and-keeping-v-12/778352/\n- Wikipedia Aston Martin Valhalla: https://en.wikipedia.org/wiki/Aston_Martin_Valhalla\n- J.D. Power Aston Martin ratings: https://www.jdpower.com/cars/ratings/aston-martin\n- Electrive on hybrid strategy: https://www.electrive.com/2022/02/03/aston-martin-to-focus-on-hybrid-and-electric-cars-from-2026/",
  exclusionReason: "All models excluded",
} as const satisfies CarMake
