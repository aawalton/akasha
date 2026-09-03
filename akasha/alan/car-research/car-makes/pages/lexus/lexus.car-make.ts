import type { CarMake } from "../../car-make.page-type.ts"

export const lexus = {
  id: "019e4ae5-bf97-7876-a806-b410a038b353",
  pageTypeSlug: "car-make",
  slug: "lexus",
  title: "Lexus",
  chargingNetworkAccess:
    "Lexus RZ owners get charging credits via the EVgo network (per Lexus RZ launch materials). Lexus announced in 2023 it would adopt NACS (Tesla connector) for future BEVs starting 2025; current RZ 450e uses CCS1. Adapter availability and Supercharger access through Toyota/Lexus charging programs is rolling out. Sources: https://pressroom.lexus.com/lexus-and-tesla-nacs/ , https://www.evgo.com/ , https://www.lexus.com/electrified/charging",
  country: "Japan",
  drmPolicy:
    "Lexus vehicles use the Lexus Enform Connected Services platform (parallel to Toyota Connected Services). Many subscription services come with trial periods then require subscription. Lexus Drive Connect (cloud navigation, voice assistant, intelligent assistant) and Remote Connect (remote start, lock/unlock via app) operate on trial-to-paid subscriptions. Lexus has been criticized for moving previously-included features behind paywalls (e.g., remote start). Most core driving and safety functions operate without connectivity, but cloud navigation and OTA updates require it. Sources: https://www.lexus.com/connected-services , https://pressroom.lexus.com/lexus-app/ , https://www.thedrive.com/news/lexus-connected-services-paywall",
  electrificationStrategy:
    "Lexus has announced a goal to sell only battery-electric vehicles in North America, Europe, and China by 2030, and globally by 2035. The brand is part of Toyota Group, which has historically favored hybrid technology over BEVs. Sources: https://pressroom.lexus.com/lexus-on-the-road-to-electrification/ , https://www.toyota.com/usa/electrification/ , https://global.toyota/en/newsroom/corporate/38818143.html",
  foundingYear: 1989,
  killSwitchPolicy:
    "Lexus parent Toyota has not made detailed public statements on the federal HALT Drunk Driving Act (IIJA 2021) mandate for impaired-driving detection by ~2027. Toyota Group is a member of the Driver Alcohol Detection System for Safety (DADSS) program, which is developing in-vehicle breath/touch-based alcohol sensors. Implementation will likely be camera + sensor based (passive monitoring), integrated with existing Lexus Safety System+ driver monitoring. No public statement on bypassability has been made. Sources: https://www.dadss.org/ , https://www.nhtsa.gov/laws-regulations/iija-section-24220 , https://www.iihs.org/topics/impaired-driving",
  nacsAdoption: "announced",
  parentCorporation: "Toyota Motor Corporation",
  reliabilityNotes:
    "Lexus consistently ranks #1 or top-tier in Consumer Reports brand reliability rankings (2024, 2025), and JD Power Vehicle Dependability Study (VDS). Hybrid drivetrains (shared with Toyota) are particularly proven. The newer RZ BEV is too new for long-term data but uses proven Toyota e-TNGA platform. Sources: https://www.consumerreports.org/cars/car-reliability-owner-satisfaction/ , https://www.jdpower.com/business/press-releases/2024-us-vehicle-dependability-study , https://www.lexus.com/quality",
  trims: "jsonl",
  shortList: false,
  sources:
    "- Lexus US Pressroom: https://pressroom.lexus.com/\n- Lexus.com: https://www.lexus.com/\n- Toyota Electrification: https://www.toyota.com/usa/electrification/\n- EPA fueleconomy.gov: https://www.fueleconomy.gov/\n- IIHS: https://www.iihs.org/\n- Consumer Reports reliability: https://www.consumerreports.org/cars/\n- DADSS: https://www.dadss.org/",
  exclusionReason: "All models excluded",
} as const satisfies CarMake
