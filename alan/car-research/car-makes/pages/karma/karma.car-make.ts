import type { CarMake } from "../../car-make.page-type.ts"

export const karma = {
  id: "019e4ae1-f89b-7b62-aadd-4da7871d1198",
  pageTypeSlug: "car-make",
  slug: "karma",
  title: "Karma",
  chargingNetworkAccess:
    "Karma has not announced partnerships with Tesla Supercharger, Electrify America, EVgo, or ChargePoint. The Revero EREV uses a CCS1 port for DC fast charging; the upcoming Kaveya BEV is also expected to ship with CCS1 at launch. No free-charging promo programs have been announced. Sources: https://karmaautomotive.com/revero/, https://en.wikipedia.org/wiki/Karma_Revero",
  country: "United States",
  drmPolicy:
    "Karma vehicles ship with mandatory connectivity: an embedded telematics system providing OTA software / map updates plus a Karma mobile app for remote door lock/unlock, climate preconditioning, charge scheduling, vehicle-health reporting, and an AR user manual. Karma has publicly announced subscription-style purchases of vehicle features for MY2024+ Reveros via the connected-car app surface built by Audax Labs, but specific feature SKUs and prices have not been disclosed; no public examples of post-sale remote feature reduction. Given the extremely low production volume (160 Reveros globally) and recency of the 3rd-gen platform, there is essentially no third-party / forum reporting on offline operation. Sources: https://audaxlabs.com/connected-car-app/, https://www.prnewswire.com/news-releases/rightware-kanzi-powers-the-digital-cockpit-and-infotainment-system-in-the-new-karma-revero-592762191.html",
  electrificationStrategy:
    "Karma is an all-electrified luxury brand built on Extended Range Electric Vehicle (EREV) technology, which it positions as the marketplace pioneer of the segment. After originally planning a fully-electric future, Karma pivoted in 2024-2025 to lead with EREV/PHEV models (Revero, Gyesera) due to slower-than-expected EV take-rates in the ultra-luxury segment, with full BEVs (Kaveya) layered in on top. Sources: https://karmaautomotive.com/news/karma-automotives-new-era-dawns/, https://www.greencarreports.com/news/1145678_karma-claims-these-evs-and-phevs-are-coming-in-2025-and-2026",
  foundingYear: 2014,
  killSwitchPolicy:
    "Data unavailable: Karma has made no public statement on the IIJA-driven federal impaired-driving-detection mandate. As a low-volume (146 vehicles sold in 2024) ultra-luxury maker, Karma will be subject to the same NHTSA rulemaking as every other OEM but has not signaled a hardware vs software approach. Search of Karma press releases, dealer FAQs, and trade press (The Autopian, Green Car Reports) surfaces no commitment either way as of May 2026.",
  nacsAdoption: "no",
  parentCorporation: "Wanxiang Group",
  reliabilityNotes:
    "Data unavailable: Karma has no Consumer Reports, J.D. Power, or TrueDelta coverage due to volumes well below the reporting thresholds (146 US vehicles sold in 2024). Anecdotal reports on Karma owner forums and Reddit mention long parts lead times and limited dealer service network as the dominant ownership concerns rather than mechanical reliability per se. Sources: https://www.theautopian.com/karma-automotive-sold-just-146-vehicles-last-year-its-ceo-told-me-thats-the-appeal/",
  trims: "jsonl",
  shortList: false,
  sources:
    "- https://karmaautomotive.com/\n- https://en.wikipedia.org/wiki/Karma_Automotive\n- https://en.wikipedia.org/wiki/Karma_Revero\n- https://karmaautomotive.com/news/karma-automotives-new-era-dawns/\n- https://www.greencarreports.com/news/1145678_karma-claims-these-evs-and-phevs-are-coming-in-2025-and-2026\n- https://www.theautopian.com/karma-automotive-sold-just-146-vehicles-last-year-its-ceo-told-me-thats-the-appeal/",
  exclusionReason: "All models excluded",
} as const satisfies CarMake
