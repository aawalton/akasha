import type { CarMake } from "../../car-make.page-type.ts"

export const polestar = {
  id: "019e4af2-5e49-7c02-b428-089f08689f28",
  pageTypeSlug: "car-make",
  slug: "polestar",
  title: "Polestar",
  chargingNetworkAccess:
    "Polestar signed an NACS agreement with Tesla in 2023. As of 2025 model year and forward, new Polestar vehicles sold in North America ship with the NACS port natively (Polestar 3, Polestar 4); pre-2025 CCS1 vehicles (Polestar 2) gained Tesla Supercharger access via a $230 Polestar-branded NACS adapter and OTA software update starting late 2024. Vehicles also continue to support CCS1 fast-charging via included/optional adapter. No Polestar-specific bundled-free-charging promotion is publicly active in 2026, though Plug & Charge is supported at compatible CCS networks (Electrify America). Sources: https://www.engadget.com/transportation/evs/north-american-polestar-owners-can-now-use-the-tesla-supercharger-network-164046134.html, https://www.greencarreports.com/news/1144867_polestar-and-volvo-gain-tesla-supercharger-access-nacs-adapters-cost-230",
  country: "Sweden",
  drmPolicy:
    "Polestar vehicles are heavily software-defined and rely on cellular connectivity for the full feature set (Google built-in services, Google Maps with real-time energy routing, Google Assistant, OTA updates, Polestar Connect app for remote control, charging status, preconditioning). Core driving works offline, but navigation, voice assistant, remote app control, charging-network roaming, and connected services degrade when the cellular link or Google account session is unavailable. OTA updates are free and delivered over cellular; the Performance Software Upgrade (e.g. ~$1,200 for Polestar 2 Dual Motor adding ~68 hp) is sold online as a paid software unlock — a clear precedent of horsepower gated behind a one-time DRM purchase rather than a hardware change. No public examples of post-sale remote feature removal/downgrade for paying owners have surfaced, but the OTA architecture means the manufacturer retains technical capability to alter feature behavior remotely. Sources: https://www.polestar.com/us/owning-a-polestar/ota/, https://www.polestar.com/us/support/faq/over-the-air-updates/, https://www.currentnotesev.com/p/thoughts-on-polestar-2-software-update",
  electrificationStrategy:
    "Polestar is a pure-electric performance brand. Originally a Volvo racing/performance partner (Flash Engineering, founded 1996; rebranded Polestar Racing; acquired by Volvo in 2015), it was spun out in October 2017 as a standalone all-electric brand jointly owned by Volvo Cars and Geely Holding. Its entire current and announced lineup (Polestar 2, 3, 4, 5, 6, 7) is battery-electric — there are no PHEV, HEV, MHEV, or ICE products. Sources: https://en.wikipedia.org/wiki/Polestar, https://www.polestar.com/us/",
  foundingYear: 1996,
  killSwitchPolicy:
    "Data unavailable: No Polestar-specific public statement found on its implementation plan for the IIJA-mandated advanced impaired driving prevention technology (NHTSA rulemaking, ~2027 target). Polestar already ships driver-monitoring cameras (Smart Eye driver-monitoring system in the Polestar 3 and Polestar 4) as part of its standard ADAS suite, which positions the platform for a software-implemented passive-monitoring approach if/when the federal rule lands, but no confirmed roadmap has been published. Sources: https://www.polestar.com/us/polestar-3/, https://www.kbb.com/car-news/nhtsas-new-kill-switch-law-approaches-key-deadline/",
  nacsAdoption: "yes",
  parentCorporation:
    "Geely Holding Group / Volvo Cars (joint ownership; Geely-affiliated PSD Investment is largest shareholder as of 2024)",
  reliabilityNotes:
    "Polestar has limited Consumer Reports/J.D. Power history because of small US volumes and recent model launches. The Polestar 2 has generally been judged solid mechanically (shared Volvo CMA platform) but with recurring infotainment/connectivity gripes from owners. The Polestar 3 has had a rough early-production reliability record: 5 NHTSA recalls in 2025 (rear-view camera display failure on reverse, panoramic glass sunroof detachment risk, water damage to front bumper electrical harness connectors, missing hood-wing bumper bolts, 12V system fluctuations damaging the HV-to-LV converter module), plus owner reports of Pilot Assist/lane-keeping dropouts, frozen infotainment screens, and onboard AC charger failures leaving cars unable to home-charge. Sources: https://recharged.com/articles/2025-polestar-3-reliability, https://www.consumerreports.org/cars/polestar/3/2025/reliability/",
  trims: "jsonl",
  shortList: false,
  sources:
    "- https://en.wikipedia.org/wiki/Polestar\n- https://www.polestar.com/us/\n- https://www.polestar.com/us/polestar-2/\n- https://www.polestar.com/us/polestar-3/\n- https://www.polestar.com/us/polestar-4/\n- https://www.polestar.com/us/polestar-5/\n- https://www.engadget.com/transportation/evs/north-american-polestar-owners-can-now-use-the-tesla-supercharger-network-164046134.html\n- https://recharged.com/articles/2025-polestar-3-reliability\n- https://carbuzz.com/2026-polestar-3-updates/\n- https://electrek.co/2025/06/03/2026-polestar-4-officially-on-sale-us-priced-slightly-higher/",
  exclusionReason: "All models excluded",
} as const satisfies CarMake
