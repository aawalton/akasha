import type { CarMake } from "../../car-make.page-type.ts"

export const rollsRoyce = {
  id: "019e4af6-54ce-71a5-b01a-6c549455f33d",
  pageTypeSlug: "car-make",
  slug: "rolls-royce",
  title: "Rolls-Royce",
  chargingNetworkAccess:
    "Rolls-Royce announced in late 2023 that its EVs (Spectre and successors) would gain Tesla Supercharger access via a CCS1-to-NACS adapter starting in 2025 and that future models would ship with native NACS ports. The BMW Group rollout slipped from the original early-2025 target with no firm replacement date as of 2026. Spectre owners currently use the broader US public-charging ecosystem (Electrify America, EVgo, ChargePoint) via CCS1 and have access to the Rolls-Royce home Wallbox (9.6 kW). Sources: https://www.greencarreports.com/news/1141149_bmw-mini-rolls-royce-will-adopt-tesla-charge-port-us-and-canada , https://www.rolls-roycemotorcars.com/en_US/ownership/charging.html",
  country: "United Kingdom",
  drmPolicy:
    "Rolls-Royce vehicles ship with the BMW Group connected-services stack rebadged as 'Rolls-Royce Connected' and the owners' app 'Whispers'. Connectivity is used for remote status (lock/window state, mileage, service due, Rolls-Royce Assist eCall), OTA map and infotainment updates, and concierge integration. The brand does not publicly disclose a subscription gate on the type of comfort hardware (heated seats, ADAS) that BMW famously trialed and retreated from in 2022-2023; in the ultra-luxury segment Rolls-Royce treats nearly every feature as standard or bespoke-included at order time rather than subscription-locked. No public reports of post-sale remote feature removal on Spectre have surfaced. The car remains drivable when disconnected from servers — infotainment, navigation, and core driving systems work offline — but Rolls-Royce Assist eCall and remote app functions naturally require cellular service. Source: https://www.rolls-roycemotorcars.com/en_US/ownership/your-motor-car.html , https://www.rollsroycemotorcarsparamus.com/ownership/rolls-royce-whispers-app.htm",
  electrificationStrategy:
    "Rolls-Royce has committed to becoming a fully electric brand by 2030, retiring all internal-combustion models by the end of the decade. The Spectre (launched 2023) is the first BEV. Project Nightingale (limited 100-unit electric drophead coupe, deliveries 2028) was unveiled April 2026. A full-size electric SUV is targeted for early 2027 and a sedan for late 2028. Sources: https://evmagazine.com/news/everything-you-need-to-know-about-rolls-royces-new-ev , https://www.greencarreports.com/news/1144538_rolls-royce-doubles-down-on-evs-planning-suv-and-sedan , https://www.bmwblog.com/2026/04/14/rolls-royce-project-nightingale-first-electric-convertible/",
  foundingYear: 1998,
  killSwitchPolicy:
    "Rolls-Royce has issued no make-specific public statement on the IIJA Section 24220 advanced-impaired-driving-detection mandate. As a BMW Group subsidiary, Rolls-Royce will inherit BMW's compliance approach: in-cabin driver-monitoring camera (already deployed in BMW for attention/drowsiness on Highway Assistant systems) extended to impairment detection once NHTSA finalizes the rule (currently delayed past the 2024 statutory deadline). The Spectre already ships with the BMW-derived Driving Assistant Professional camera array, which is the likely hardware substrate. No public statement on bypassability. Sources: https://www.kbb.com/car-news/nhtsas-new-kill-switch-law-approaches-key-deadline/ , https://www.theautopian.com/new-cars-sold-in-america-will-be-actively-watching-and-judging-you-and-may-decide-to-not-let-you-drive/",
  nacsAdoption: "announced",
  parentCorporation: "BMW Group",
  reliabilityNotes:
    "Spectre is too new and too low-volume to have meaningful Consumer Reports or J.D. Power reliability scores. Two early NHTSA recalls (electrical ground cable fire risk on early 2024 builds; integrated brake system servomotor weld failure affecting 2024-2025) have been the main quality signals. Rolls-Royce dealer warranty service is white-glove, including pickup/delivery and loaner. Source: https://www.greencarreports.com/news/1142154_2024-rolls-royce-spectre-ev-recalled , https://www.cars.com/research/rolls_royce-spectre/recalls/",
  trims: "jsonl",
  shortList: false,
  sources:
    "- https://www.rolls-roycemotorcars.com/en_US/showroom/spectre.html\n- https://www.rolls-roycemotorcars.com/en_US/ownership/charging.html\n- https://www.kbb.com/rolls-royce/electric-cars/\n- https://www.greencarreports.com/news/1144538_rolls-royce-doubles-down-on-evs-planning-suv-and-sedan\n- https://www.bmwblog.com/2026/04/14/rolls-royce-project-nightingale-first-electric-convertible/\n- https://www.greencarreports.com/news/1141149_bmw-mini-rolls-royce-will-adopt-tesla-charge-port-us-and-canada\n- https://www.greencarreports.com/news/1142154_2024-rolls-royce-spectre-ev-recalled",
  exclusionReason: "All models excluded",
} as const satisfies CarMake
