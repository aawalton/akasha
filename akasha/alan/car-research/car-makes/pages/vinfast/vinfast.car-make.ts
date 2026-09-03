import type { CarMake } from "../../car-make.page-type.ts"

export const vinfast = {
  id: "019e4afa-1f62-712b-8ffd-058e64db9ef7",
  pageTypeSlug: "car-make",
  slug: "vinfast",
  title: "VinFast",
  chargingNetworkAccess:
    "VinFast vehicles in the US ship with the CCS1 (Combined Charging System) port for DC fast charging and a J1772 connector for Level 2 AC. VinFast offers a complimentary Electrify America charging credit promotion to new buyers (historically up to several years of free 30-minute sessions, exact terms vary by promotion period). VinFast announced in 2023 it would adopt Tesla NACS on future US vehicles, but no in-production model has shipped with NACS as of MY2026; activation of Supercharger access via adapter has been delayed and is not yet live. Public CCS networks supported: Electrify America (partner/promo), EVgo, ChargePoint, and other CCS-compatible networks. Sources: https://vinfastauto.us/charging https://community.vinfastauto.us/forums/discussion/adopting-nacs-standard-for-charging/",
  country: "Vietnam",
  drmPolicy:
    "VinFast vehicles include built-in 4G connectivity and the VinFast C-App for remote control, navigation, diagnostics, and OTA updates. After launch, VinFast quietly DISCONTINUED its controversial mandatory Battery-as-a-Service (BaaS) subscription model in North America during 2023-2024 — the option vanished from the website and is no longer offered to US buyers, meaning batteries are now purchased outright with the vehicle (no battery DRM). VinFast pushes frequent OTA software updates (e.g., FRS 9.6.1.x series) to fix bugs and add features; some early updates were dealer-installed. The vehicle does not require continuous internet to drive, but connected features (remote control, GPS, OTA, voice assistant) require the VinFast cloud and 4G subscription. No known cases of VinFast remotely disabling already-delivered features. Sources: https://driveteslacanada.ca/news/vinfast-abandons-battery-subscription-plans-for-north-america/ https://electrek.co/2022/04/14/vinfast-finally-breaks-down-us-pricing-to-include-details-of-its-mandatory-battery-subscription/ https://community.vinfastauto.us/forums/discussion/battery-subscription-gone/",
  electrificationStrategy:
    "VinFast is an all-electric brand. In July 2022, founder/CEO Pham Nhat Vuong announced the company would stop producing internal-combustion vehicles by the end of 2022 to focus exclusively on battery-electric vehicles. The US lineup is 100% BEV (VF 6, VF 7, VF 8, VF 9). Sources: https://insideevs.com/news/596946/vinfast-stop-production-ice-cars-end-2022/ https://vinfastauto.us/",
  foundingYear: 2017,
  killSwitchPolicy:
    "VinFast has made no public statements specific to the US IIJA-driven impaired-driving-detection mandate (anticipated ~2027). All current US-market VinFast vehicles include camera-based driver-monitoring as part of the standard ADAS suite (drowsiness/inattention warnings) but do not include an in-cabin alcohol/impairment sensor capable of disabling the vehicle. As a 4G-connected, OTA-capable platform, VinFast is technically positioned to deliver such a feature via software update if and when the federal rule is finalized, but no policy commitment has been published. Sources: https://vinfastauto.us/ https://www.nhtsa.gov/laws-regulations/advanced-impaired-driving-prevention-technology",
  nacsAdoption: "announced",
  parentCorporation: "Vingroup JSC",
  reliabilityNotes:
    "VinFast is a very young brand in the US (first deliveries March 2023) and reliability data is thin. Consumer Reports notes insufficient sample size to score the brand. Owner forums and journalist long-term reviews (Out of Spec, Edmunds) report numerous early software glitches — Apple CarPlay bugs, Electronic Stability Control and Hydraulic Brake Assist warnings, blank driver displays, range display inaccuracies — many addressed by subsequent OTA updates. NHTSA has issued multiple VF 8 recalls including airbag defects, blank driver display, and an August 2025 ADAS recall affecting ~6,000 VF 8s for spurious steering interventions during wide turns. The brand is in active warranty-driven repair mode; the 10yr/125k mile basic + 10yr/unlimited battery warranty is the strongest in the segment, partly compensating for first-generation quality risk. Sources: https://www.consumerreports.org/cars/vinfast/vf-8/2025/reliability/ https://www.nhtsa.gov/vehicle/2023/VINFAST/VF8 https://www.slashgear.com/2001584/are-vinfast-cars-reliable-what-owners-say/",
  trims: "jsonl",
  shortList: false,
  sources:
    "https://vinfastauto.us/ https://en.wikipedia.org/wiki/VinFast https://www.fueleconomy.gov/feg/PowerSearch.do?action=noform&path=1&year1=2025&year2=2026&make=Vinfast https://insideevs.com/news/596946/vinfast-stop-production-ice-cars-end-2022/ https://driveteslacanada.ca/news/vinfast-abandons-battery-subscription-plans-for-north-america/ https://www.consumerreports.org/cars/vinfast/ https://www.nhtsa.gov/vehicle/2023/VINFAST/VF8 https://www.kbb.com/vinfast/",
  exclusionReason: "No US dealer/service network — no Utah presence",
} as const satisfies CarMake
