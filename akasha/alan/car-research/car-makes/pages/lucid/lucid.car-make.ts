import type { CarMake } from "../../car-make.page-type.ts"

export const lucid = {
  id: "019e4aea-25d9-7113-b0e4-3922f1c54bfc",
  pageTypeSlug: "car-make",
  slug: "lucid",
  title: "Lucid",
  chargingNetworkAccess:
    "All Lucid Air owners (2022+ model years) gained access to the Tesla Supercharger network on July 31, 2025 via a Lucid-supplied DC NACS-to-CCS1 adapter ($220). Charging on Superchargers is capped at ~50 kW. The newly launched 2026 Air still uses a native CCS1 port; the upcoming Gravity SUV is the first Lucid with a native NACS port (per Lucid's NACS adoption announcement). Lucid customers also get access to Electrify America (older promos provided 3 years of free charging at launch; current promos vary by trim/quarter) and the ChargePoint/EVgo networks via standard CCS1.\n\nSources:\n- https://lucidmotors.com/stories/2026-lucid-air-tesla-superchargers\n- https://lucidmotors.com/stories/lucid-adopt-nacs\n- https://ir.lucidmotors.com/news-releases/news-release-details/all-lucid-airs-gain-access-23500-tesla-superchargers-2026-lucid/",
  country: "United States",
  drmPolicy:
    "Lucid vehicles are deeply connected: the Lucid mobile app is described by Lucid as 'a core part of Lucid ownership' and is used for remote climate, charging, locking, and Supercharger payment initiation. Connectivity is currently included; Lucid has publicly stated it will eventually charge for connectivity (DreamConnect Premium has been mentioned by sales reps as Gravity-specific at launch). OTA updates push new features and bug fixes regularly (e.g., DreamDrive enhancements, Apple CarPlay arrived via OTA). No public reports of Lucid remotely disabling owned vehicles' core driving function post-sale; the principal connectivity-dependent features are app remote control, navigation routing, voice assistant, and Supercharger payment.\n\nSources:\n- https://lucidmotors.com/knowledge/ownership/lucid-app/the-basics/the-lucid-app\n- https://lucidowners.com/threads/subscription-for-enhanced-connectivity.12962/\n- https://lucidowners.com/threads/dreamconnect-premium.11537/",
  electrificationStrategy:
    "Lucid is a pure-play BEV manufacturer; every vehicle it sells (Air, Gravity) is battery-electric, with no ICE/HEV/PHEV products planned. The company positions its in-house high-voltage architecture (900V on Air, 926V on Gravity) and class-leading efficiency (~5 mi/kWh on Air Pure) as the strategy. A midsize platform launched on Gravity (Nov 2024) is the basis of a forthcoming midsize SUV/sedan (~$50k target) expected late 2026.\n\nSources:\n- https://lucidmotors.com/air\n- https://lucidmotors.com/gravity\n- https://en.wikipedia.org/wiki/Lucid_Motors",
  foundingYear: 2007,
  killSwitchPolicy:
    "Data unavailable: No public Lucid statement found on hardware vs software implementation of the federal IIJA impaired-driving-detection mandate (expected ~2027). Lucid's DreamDrive driver-assistance suite uses driver-monitoring cameras for attention tracking (hands-free Highway Assist), which provides existing hardware that could be repurposed. As of May 2026, NHTSA has not finalized the rulemaking, and Lucid (like most makers) has not made trim-level commitments. Searched: Lucid press releases, owners forum threads, NHTSA docket.",
  nacsAdoption: "adapter",
  parentCorporation:
    "Lucid Group, Inc. (majority-owned by Saudi Arabia's Public Investment Fund, ~60%+)",
  reliabilityNotes:
    "Consumer Reports has rated Lucid Air predicted reliability below average for several years (small sample, with reported software glitches, 12V battery drain issues, and door/window control quirks early on); 2024-2025 OTA updates resolved many software issues. J.D. Power 2024 U.S. Initial Quality Study placed Lucid above the premium segment average for the Air (relative to other luxury EVs). Owners report the powertrain, range, and ride quality as exceptional, with most complaints centered on the infotainment/UX and early build-quality items (panel fit). Gravity launched late 2024 / early 2025 in low volume so reliability data is still thin.\n\nSources:\n- https://www.consumerreports.org/cars/lucid/air/\n- https://www.jdpower.com/business/press-releases/2024-us-initial-quality-study-iqs",
  trims: "jsonl",
  shortList: false,
  sources:
    "- Lucid Air official: https://lucidmotors.com/air\n- Lucid Gravity official: https://lucidmotors.com/gravity\n- Lucid Investor Relations: https://ir.lucidmotors.com/\n- Wikipedia: https://en.wikipedia.org/wiki/Lucid_Motors\n- NACS adoption announcement: https://lucidmotors.com/stories/lucid-adopt-nacs\n- 2026 Supercharger access: https://lucidmotors.com/stories/2026-lucid-air-tesla-superchargers\n- Air 2026 review (Car and Driver): https://www.caranddriver.com/lucid/air\n- Gravity 2026 review (U.S. News): https://cars.usnews.com/cars-trucks/lucid/gravity",
  exclusionReason: "All models excluded",
} as const satisfies CarMake
