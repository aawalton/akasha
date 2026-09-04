import type { CarMake } from "../../car-make.page-type.ts"

export const lincoln = {
  id: "019e4ae7-bed0-77bd-9e00-db5232adca7d",
  pageTypeSlug: "car-make",
  slug: "lincoln",
  title: "Lincoln",
  chargingNetworkAccess:
    "Lincoln EV/PHEV owners have access to Tesla's Supercharger network (15,000+ stalls) starting spring 2024 via a Ford-supplied CCS-to-NACS adapter, plus the BlueOval Charge Network aggregating Electrify America, EVgo, ChargePoint, and others (~120,000 chargers). Future Lincoln EVs starting MY2025 were announced to ship with the native NACS port, but with no Lincoln BEV currently in market, this has not materialized — the Corsair PHEV uses J1772 for Level 2 only (no DC fast charging). Sources: https://www.northtownelincoln.com/blog/2024/march/20/lincoln-customers-can-now-charge-on-tesla-are-you-ready-to-make-the-switch.htm , https://www.tesla.com/NACS",
  country: "United States",
  drmPolicy:
    "Lincoln vehicles rely on FordPass Connect / Lincoln Connected Services for OTA updates, remote start, vehicle status, and the Lincoln Way app. The driver-assist suite BlueCruise requires an active Connected Service plan — newer vehicles come with a complimentary 4-year subscription, after which renewal is required to keep hands-free highway driving functional. There is no public documentation of Ford/Lincoln remotely disabling already-paid features post-sale (in contrast to, e.g., Tesla / BMW heated seats). Cars operate without internet for core driving but lose connected features (remote start, OTA, BlueCruise) without subscription. Sources: https://www.lincoln.com/technology/connected-services/ , https://www.lincoln.com/support/how-tos/lincoln-technology/driver-assist-features/lincoln-bluecruise-frequently-asked-questions/",
  electrificationStrategy:
    "Lincoln initially announced plans to deliver three new fully electric vehicles by mid-decade and add a fourth by the end of 2026, including electric versions of the Corsair, Nautilus, Aviator, and Navigator. This plan has been substantially scaled back. Parent Ford CEO Jim Farley has stated Ford/Lincoln will pivot away from an all-electric lineup in favor of hybrid and EREV (extended-range electric vehicle) powertrains, with BEVs concentrated on the affordable end. As of MY2026, Lincoln has no BEV in the US market and only two electrified offerings: the Corsair Grand Touring PHEV and the Nautilus Hybrid (full hybrid). The Aviator Grand Touring PHEV was discontinued after MY2023. Sources: https://www.motorauthority.com/news/1135061_lincoln-reportedly-plans-up-to-five-evs-through-2026-including-electric-navigator , https://carbuzz.com/lincolns-no-ev-policy-might-be-smart/ , https://www.chargedfleet.com/10168361/lincoln-plans-to-produce-four-ev-models-by-2026",
  foundingYear: 1917,
  killSwitchPolicy:
    "Data unavailable: No specific public Lincoln/Ford statement located regarding the IIJA Section 24220 impaired-driving-detection mandate. Lincoln already ships a driver-facing infrared camera as part of BlueCruise that tracks eye gaze and head position for drowsy/distracted detection, which provides a hardware foundation for compliance with whatever final NHTSA rule emerges. As of May 2026, NHTSA has not finalized the rule (original Nov 2024 deadline missed); the rule has been delayed because no commercially available passive BAC detection technology has been validated. Implementation in production vehicles is unlikely before late 2027. Sources: https://www.kbb.com/car-news/nhtsas-new-kill-switch-law-approaches-key-deadline/ , https://www.carscoops.com/2026/03/nhtsa-impaired-driving-detection-tech/",
  nacsAdoption: "adapter",
  parentCorporation: "Ford Motor Company",
  reliabilityNotes:
    "Consumer Reports has historically rated Lincoln below the industry average. The 2024-2025 Nautilus redesign (Ford CX430 platform, China-built) introduced significant new infotainment hardware (48-inch panoramic display) that has drawn early reliability concerns; the Corsair remains on a long-running platform shared with the Ford Escape. J.D. Power 2024 Initial Quality awards rated Lincoln Nautilus as 'Highest Ranked' in its segment but the brand overall scores mid-pack. Sources: https://www.consumerreports.org/cars/lincoln/ , https://www.jdpower.com/cars/ratings/initial-quality/2024/lincoln",
  trims: "jsonl",
  shortList: false,
  sources:
    "- Lincoln US site: https://www.lincoln.com\n- Lincoln hybrid/EV overview: https://www.lincoln.com/hybrid-electric-vehicles/\n- Ford 8-K NACS announcement (May 2023): https://www.sec.gov/Archives/edgar/data/0000037996/000003799623000036/exhibit99tomay2520238-k.htm\n- MotorAuthority on Lincoln EV plan: https://www.motorauthority.com/news/1135061_lincoln-reportedly-plans-up-to-five-evs-through-2026-including-electric-navigator\n- CarBuzz on Lincoln no-EV-in-2026: https://carbuzz.com/lincolns-no-ev-policy-might-be-smart/\n- Ford Authority on Aviator PHEV discontinuation: https://fordauthority.com/2023/10/lincoln-aviator-grand-touring-phev-will-be-discontinued/",
  exclusionReason: "All models excluded",
} as const satisfies CarMake
