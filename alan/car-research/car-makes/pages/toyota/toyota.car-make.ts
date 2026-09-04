import type { CarMake } from "../../car-make.page-type.ts"

export const toyota = {
  id: "019e4af8-0169-7d7b-8c4f-2f2637f99415",
  pageTypeSlug: "car-make",
  slug: "toyota",
  title: "Toyota",
  chargingNetworkAccess:
    "Toyota announced October 2023 adoption of the NACS (Tesla) connector beginning in 2025 model year vehicles built for the US/Canada/Mexico, with CCS-to-NACS adapters available for existing bZ4X owners. Toyota was a co-founding member of the IONNA charging network joint venture (BMW, GM, Honda, Hyundai, Kia, Mercedes-Benz, Stellantis) launched February 2024, planning 30,000+ public DC fast-charge stalls in North America. The 2025 bZ4X retains CCS1 with a NACS adapter; native NACS port expected on the 2026 refresh / 2026 bZ. Existing bZ4X owners received complimentary access to EVgo via the Toyota app; some EA access via ChargeNow. Sources: https://pressroom.toyota.com/toyota-to-adopt-nacs-connectors-in-its-bevs-from-2025/ ; https://www.ionnaev.com/ ; https://www.toyota.com/bz4x/charging/",
  country: "Japan",
  drmPolicy:
    "Toyota Connected Services include Remote Connect (remote start, lock/unlock), Service Connect (vehicle health), Safety Connect (SOS, stolen vehicle locator), Wi-Fi Connect, and Drive Connect (cloud navigation). Most trials are 3-10 years, then subscription-required. Remote Connect via key fob was historically free but Toyota attempted to move it behind a subscription in 2021 — significant owner backlash followed and Toyota walked back parts of the change for older vehicles. Source: https://www.theverge.com/2021/12/14/22834474/toyota-remote-start-subscription-key-fob-connected-services ; https://www.thedrive.com/news/43329/toyota-walks-back-controversial-key-fob-remote-start-subscription-decision-for-older-cars . Toyota Connected has experienced data breaches (2023 — 2.15M customer records exposed via cloud misconfiguration). Source: https://global.toyota/en/newsroom/corporate/39132982.html",
  electrificationStrategy:
    "Toyota has taken a multi-pathway strategy emphasizing hybrids (HEVs) as the bridge to electrification, with selective BEV and PHEV offerings. CEO Koji Sato (April 2023) accelerated BEV plans, targeting 1.5M BEV annual sales by 2030 and 3.5M by 2030 across all electrified types. Toyota has stated it does not believe BEVs are the sole answer and continues investing in hydrogen fuel cells (Mirai). Sources: https://global.toyota/en/newsroom/corporate/38635541.html ; https://pressroom.toyota.com/toyota-accelerates-electrification-roadmap/ ; https://www.reuters.com/business/autos-transportation/toyota-ceo-says-ev-only-strategy-not-answer-2023-04-07/",
  foundingYear: 1937,
  killSwitchPolicy:
    "Toyota has not publicly committed to a specific implementation of the IIJA-mandated impaired-driving-detection system (NHTSA rulemaking ongoing, expected to begin model years 2026-2027). Toyota is a participant in the DADSS (Driver Alcohol Detection System for Safety) industry consortium since the program's inception. DADSS develops breath-based and touch-based blood-alcohol sensors. No public Toyota statement on hardware vs software, bypass policy, or model deployment yet. Sources: https://www.dadss.org/ ; https://www.nhtsa.gov/laws-regulations/advanced-impaired-driving-prevention-technology",
  nacsAdoption: "announced",
  parentCorporation: "Toyota Motor Corporation",
  reliabilityNotes:
    "Toyota consistently ranks at the top of Consumer Reports brand reliability surveys; #1 brand in CR 2024 and #2 in 2023. J.D. Power 2024 Vehicle Dependability Study ranked Toyota mid-pack but Lexus #1. Hybrid powertrains (Atkinson-cycle ICE + eCVT) are recognized as exceptionally durable — many Prius taxis have exceeded 300k miles. The bZ4X had a wheel-detachment recall in mid-2022 (hub bolts could loosen). Sources: https://www.consumerreports.org/cars/car-reliability-owner-satisfaction/who-makes-the-most-reliable-new-cars-a7824554938/ ; https://www.jdpower.com/business/press-releases/2024-us-vehicle-dependability-study ; https://www.nhtsa.gov/recalls (NHTSA campaign 22V-460)",
  trims: "jsonl",
  shortList: true,
  sources:
    "- https://global.toyota/en/newsroom/corporate/38635541.html (electrification strategy)\n- https://pressroom.toyota.com/toyota-to-adopt-nacs-connectors-in-its-bevs-from-2025/ (NACS)\n- https://www.toyota.com/ (lineup)\n- https://www.fueleconomy.gov/ (EPA data)\n- https://www.iihs.org/ratings/ (safety)\n- https://www.nhtsa.gov/ratings (NHTSA, recalls)\n- https://www.consumerreports.org/cars/toyota/ (reliability)",
} as const satisfies CarMake
