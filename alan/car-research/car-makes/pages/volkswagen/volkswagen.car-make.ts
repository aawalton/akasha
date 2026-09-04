import type { CarMake } from "../../car-make.page-type.ts"

export const volkswagen = {
  id: "019e4afb-6cd8-7f95-bc07-c0dcedf6f005",
  pageTypeSlug: "car-make",
  slug: "volkswagen",
  title: "Volkswagen",
  chargingNetworkAccess:
    "All MY2026 VW EVs (ID.4) ship with a NACS-to-CCS1 DC adapter as standard equipment, unlocking ~25,000 Tesla Superchargers; existing MY2024-MY2025 ID.4 and 2025 ID. Buzz owners can purchase the same VW-branded adapter (PN 11A054411). Native NACS port is not on any 2025 or 2026 US-market VW EV. Standard charging port remains CCS1. New buyers receive a 2-year Electrify America Pass+ membership including Plug & Charge. ChargePoint and EVgo are reachable via the universal CCS1 plug. Sources: https://media.vw.com/releases/1891 ; https://parts.vw.com/p/Volkswagen_2026_ID4/NACS-to-CCS-DC-Adapter/147936830/11A054411.html ; https://www.vw.com/en/models/id-4.html",
  country: "Germany",
  drmPolicy:
    'Volkswagen ships ID-series EVs with an always-on cellular modem under the rear seat that transmits telemetry even when the owner has not subscribed to Car-Net / myVW+. Connected services (remote start, remote climate, geofencing, Wi-Fi hotspot, premium navigation, premium speech, premium audio) are subscription-gated through the myVW+ / Car-Net portal. Owner forums document recurring failures where Car-Net reports "your vehicle does not have the required subscription to perform this action" even when the subscription is active, and owners who attempt to opt out of all data sharing report the modem continues to transmit; the only mitigation discussed in the community is physically disconnecting the antenna lead, which also disables the automatic post-crash 911 call. The data collected (braking, steering, acceleration behavior) has been sold to third-party insurance partners. Sources: https://www.vwidtalk.com/threads/disable-all-connected-services.15608/ ; https://www.vwidtalk.com/threads/how-to-turn-off-myvw-car-net.12008/ ; https://www.vwidtalk.com/threads/car-net-issues-post-new-subscription.2354/ ; https://carnet.vw.com/',
  electrificationStrategy:
    "Volkswagen brand targets 55% BEV sales share in North America by 2030 (raised from 50%) and 80% BEV sales in Europe (raised from 70%), as part of the Group ACCELERATE strategy announced in March 2021 and updated in March 2023. The brand plans to launch ten new BEV models globally by 2026 and aims for 8 of 10 new Volkswagens sold worldwide to be battery-electric by 2030. In the US specifically, VW is BEV-first with the ID.4 (assembled in Chattanooga, TN) and the ID. Buzz, while full-hybrid (HEV) variants of Tiguan and Atlas have been pushed to 2028 and 2029 respectively. Sources: https://electrek.co/2023/03/07/volkswagen-group-passenger-cars-evs-2030-sales-target/ ; https://insideevs.com/news/520085/volkswagen-new-auto-strategy-2030/ ; https://topelectricsuv.com/news/volkswagen/vw-atlas-hybrid-tiguan-hybrid/",
  foundingYear: 1937,
  killSwitchPolicy:
    "Volkswagen has not made a public statement specifically describing its compliance plan for IIJA Section 24220 (the federal impaired-driving-detection mandate, draft rule originally due November 2024, expected MY2027 compliance). The NHTSA rule itself remains not-yet-final as of mid-2026. VW already ships in-cabin driver-attention monitoring (drowsiness/fatigue camera) as part of the standard IQ.DRIVE suite on all 2025/2026 ID.4 and ID. Buzz trims, which positions the brand to satisfy a passive-monitoring rule without additional hardware. No public VW press release commits to a specific implementation, bypass policy, or hardware-vs-software approach. Sources: https://www.kbb.com/car-news/nhtsas-new-kill-switch-law-approaches-key-deadline/ ; https://www.cbtnews.com/the-kill-switch-mandate-is-real/",
  nacsAdoption: "adapter",
  parentCorporation: "Volkswagen AG",
  reliabilityNotes:
    "Consumer Reports has historically rated the ID.4 as below-average reliability, citing software glitches (touchscreen freezes, infotainment crashes, phantom warnings) and a string of recalls in the 2021-2024 model years (door handle, rear motor pulse inverter, charging-related software). VW issued a major over-the-air ID. Software 3.0 update across the ID family to address many of these complaints. The 2025/2026 ID.4 is built in Chattanooga, TN and received the updated software stack from the factory. The ID. Buzz launched in the US for MY2025 with no track record yet but has inherited the MEB platform and the same ID. Software stack. Sources: https://insideevs.com/news/533041/volkswagen-id4-awd-epa-range/ ; https://www.vwidtalk.com/",
  trims: "jsonl",
  shortList: false,
  sources:
    "- https://www.vw.com/en/electric-vehicles.html (VW official US EV lineup)\n- https://www.vw.com/en/models.html (VW US models index)\n- https://media.vw.com/releases/1891 (NACS adapter announcement)\n- https://media.vw.com/releases/1894 (2025 ID. Buzz NHTSA 5-star)\n- https://electrek.co/2023/03/07/volkswagen-group-passenger-cars-evs-2030-sales-target/ (2030 EV sales targets)\n- https://topelectricsuv.com/news/volkswagen/vw-atlas-hybrid-tiguan-hybrid/ (Tiguan/Atlas hybrid timing)\n- https://www.cars.com/articles/volkswagen-id-buzz-skips-u-s-market-for-2026-519884/ (ID. Buzz MY2026 US skip)",
  exclusionReason: "All models excluded",
} as const satisfies CarMake
