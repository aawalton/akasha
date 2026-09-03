import type { CarMake } from "../../car-make.page-type.ts"

export const ferrari = {
  id: "019e4ad9-8d6d-7bf1-87d2-678a838303e1",
  pageTypeSlug: "car-make",
  slug: "ferrari",
  title: "Ferrari",
  chargingNetworkAccess:
    "Ferrari has not announced NACS adoption nor a Tesla Supercharger access partnership as of May 2026 — Ferrari is absent from the public NACS-adopter list (which includes GM, Ford, Rivian, Hyundai/Kia, BMW, Mercedes-Benz, the Audi/Porsche/VW group, Volvo/Polestar, and most recently Stellantis in March 2026). Current PHEVs ship with a Type 2 (Europe) / J1772 (US) AC port only — no DC fast charging on the 7.45 kWh (296 family) or 7.9 kWh (SF90 family) packs; L2 home charging is the intended top-up path. The forthcoming Elettrica BEV charging spec has not been publicly confirmed but is expected to be CCS1 in the US given Ferrari's silence on NACS. Sources: https://electrek.co/2026/03/19/the-last-domino-falls-stellantis-evs-now-have-tesla-supercharger-access/, https://www.tesla.com/NACS",
  country: "Italy",
  drmPolicy:
    "Ferrari ships MyFerrari Connect telematics on every electrified model (296 GTB/GTS, SF90 Stradale/Spider, SF90 XX, Purosangue, Roma Spider) starting MY2023. The system continuously transmits chassis number, mileage, speed, battery state, charging timelines, software version, infotainment data, work history, scheduled maintenance, fuel level, tire pressure, emissions, and energy-consumption telemetry from the onboard CPUs to Ferrari and the owner's dealer; a Privacy Mode toggle in the MyFerrari app can suspend the data feed and GPS, but the system is not removable. Connected services are included in the new-car price (no separate subscription tier surfaced publicly). Ferrari has not publicly disclosed a remote feature-disablement program, but the telemetry surface and OTA capability mean the technical capability exists. No documented mass remote-disablement incidents post-sale as of May 2026 — bespoke clientele plus dealer-mediated warranty model differs from the Tesla/GM mass-market OTA pattern. Sources: https://www.ferrari.com/en-EN/auto/myferrari-connect, https://www.continentalautosports.com/ferrari-information/myferrari-app/",
  electrificationStrategy:
    "Ferrari's revised 2030 plan (Capital Markets Day 2025, October 2025) targets a lineup of 40% ICE, 40% hybrid, and 20% BEV by 2030 — halved from the original 40% BEV target set in 2022. CEO Benedetto Vigna framed the first EV (the Elettrica/Luce) as 'an addition, not a transition.' The PHEV lineup (SF90 family, 296 family) is the practical electrification surface today; the BEV (Elettrica/Luce) was unveiled October 2025, pre-orders opened to invited US clients March 2026, World Premiere May 2026, deliveries late 2026. Sources: https://www.cnbc.com/2025/10/09/ferrari-unveils-first-electric-vehicle-and-cuts-2030-ev-sales-target.html, https://www.ferrari.com/en-EN/corporate/articles/ferrari-capital-markets-day-2030-strategic-plan, https://www.ferrari.com/en-EN/corporate/articles/ferrari-elettrica",
  foundingYear: 1939,
  killSwitchPolicy:
    "Data unavailable: Ferrari has made no public statement on the IIJA Section 24220 impaired-driving-detection mandate as of May 2026. Industry-wide context: NHTSA's March 2026 report to Congress acknowledged the technology is not ready, with current systems showing unacceptable false-positive rates even at 99.9% accuracy. Ferrari's electrified lineup ships driver-monitoring camera hardware (drowsiness detection ADAS) that could be repurposed when the rule lands, but no announced compliance plan. Sources: https://www.kbb.com/car-news/nhtsas-new-kill-switch-law-approaches-key-deadline/, https://www.theautopian.com/new-cars-sold-in-america-will-be-actively-watching-and-judging-you-and-may-decide-to-not-let-you-drive/",
  nacsAdoption: "no",
  parentCorporation: "Ferrari N.V.",
  reliabilityNotes:
    "Ferrari is excluded from Consumer Reports and J.D. Power mainstream reliability rankings due to insufficient sample sizes — the brand sells roughly 13–14k cars per year globally, below the survey threshold. Anecdotal owner reports surface software/infotainment glitches (screen errors, sensor false alarms), occasional dashboard warning lights, power-window and key-fob issues; mechanical reliability on newer (2020+) models is reported as improved versus historical Ferrari norms thanks to updated electronics and materials. Parts and labor costs run 3-10x mass-market equivalents; dealer-mediated maintenance schedules are inflexible. Sources: https://www.icartea.com/en/wiki/ferrari-reliability-what-owners-need-to-know-in-2025, https://jdpower.com/cars/ratings/ferrari",
  trims: "jsonl",
  shortList: false,
  sources:
    "- https://www.ferrari.com/en-EN/corporate/articles/ferrari-capital-markets-day-2030-strategic-plan\n- https://www.cnbc.com/2025/10/09/ferrari-unveils-first-electric-vehicle-and-cuts-2030-ev-sales-target.html\n- https://www.ferrari.com/en-EN/corporate/articles/ferrari-elettrica\n- https://www.ferrari.com/en-EN/auto/myferrari-connect\n- https://en.wikipedia.org/wiki/Ferrari_296\n- https://en.wikipedia.org/wiki/Ferrari_SF90_Stradale\n- https://www.kbb.com/car-news/nhtsas-new-kill-switch-law-approaches-key-deadline/\n- https://jdpower.com/cars/ratings/ferrari",
  exclusionReason: "All models excluded",
} as const satisfies CarMake
