import type { CarMake } from "../../car-make.page-type.ts"

export const bentley = {
  id: "019e4ad6-6587-7a93-8b17-6d69620a2122",
  pageTypeSlug: "car-make",
  slug: "bentley",
  title: "Bentley",
  chargingNetworkAccess:
    "Bentley does not have a public NACS adoption announcement as of May 2026; PHEVs in the lineup use the J1772 (Type 1) port for AC L2 home/public charging and do not DC fast-charge (peak ~11 kW AC). No bundled charging-network partnership equivalent to Mercedes-Benz/Electrify America or Ford/Tesla. Buyers can use any J1772 EVgo/ChargePoint/EA L2 station; the 25.9 kWh Continental/Flying Spur PHEV battery and 18 kWh Bentayga Hybrid battery do not require DC fast charging. Sources: https://www.bentleymotors.com/en/models/continental-gt/continental-gt-speed.html",
  country: "United Kingdom",
  drmPolicy:
    "Bentley vehicles use the 'My Bentley' connected services platform for OTA updates, remote functions, concierge, and navigation/traffic data, broadly comparable to Audi/Porsche connect (shared VW Group MIB infotainment stack). The car operates fully without connectivity for core driving functions, but connected features (remote lock/unlock, find-my-car, live traffic, OTA map updates) require an active My Bentley subscription after the initial complimentary period. No publicly documented cases of Bentley remotely disabling post-sale features. The Continental GT/GTC and Flying Spur PHEVs share the Porsche Panamera E-Hybrid drivetrain electronics, which run a Porsche-style modular OTA system. Sources: https://support.bentleymotors.com/eu/en/support-bentley.html",
  electrificationStrategy:
    "Bentley's revised Beyond100+ strategy (announced Nov 2024) pushes the all-electric-only target from 2030 to 2035. The plan calls for a new PHEV or BEV model every year of the next decade, with PHEV lifecycles extended beyond 2030. The first Bentley BEV — a 'Luxury Urban SUV' positioned below the Bentayga — is slated to debut in 2026. As of MY2025 the Continental GT, Continental GTC, and Flying Spur lineups are 100% PHEV (V8 + electric); the Bentayga is sold as either a V6 PHEV ('Hybrid') or a V8 (ICE). Sources: https://www.bentleymedia.com/en/newsitem/1648 ; https://theevreport.com/bentley-extends-beyond100-strategy-to-2035 ; https://www.bentleymotors.com/en/about-bentley/beyond-100/coming-this-way.html",
  foundingYear: 1919,
  killSwitchPolicy:
    "No Bentley-specific public statement on the IIJA-driven federal impaired-driving-detection mandate (NHTSA missed its 2024 deadline; rulemaking remains open as of 2026). Bentley vehicles inherit the VW Group driver-monitoring camera system used in newer Audi/Porsche/VW models (camera-based attention monitoring), which is a likely substrate for any future impairment-detection compliance, but Bentley has not committed publicly to a hardware vs. software approach. Sources: https://www.kbb.com/car-news/nhtsas-new-kill-switch-law-approaches-key-deadline/ ; https://www.congress.gov/bill/119th-congress/house-bill/1137",
  nacsAdoption: "no",
  parentCorporation: "Volkswagen AG",
  reliabilityNotes:
    "Bentley is not separately ranked in J.D. Power's 2025 Vehicle Dependability Study (too-low-volume brand). Consumer Reports does not publish full Bentley reliability scores either. Anecdotal industry consensus (Edmunds, MotorTrend, owner forums): post-Bentayga-generation Bentleys (2016+) are materially more reliable than the W12-era cars but still trail mainstream luxury (Lexus, Porsche) on long-term cost; common complaints involve infotainment quirks, air-suspension component costs, and PHEV-era electronics. NHTSA recall 2025-2026: high-pressure fuel pump bolt joint on V8 Evo engine (affects Continental GT/GTC and 2025 Flying Spur), 17 units, fire-risk. Sources: https://www.jdpower.com/cars/2025/bentley/bentayga ; https://www.jdpower.com/cars/2025/bentley/flying-spur ; https://www.thetruthaboutcars.com/cars/news-blog/recall-alert-2025-2026-bentley-continental-gtc-continental-gt-flying-spur-45131539",
  trims: "jsonl",
  shortList: false,
  sources:
    "- https://www.bentleymotors.com/en/models/bentley-hybrids.html (Bentley Hybrids range)\n- https://www.bentleymedia.com/en/newsitem/1648 (Beyond100+ Nov 2024 announcement)\n- https://www.bentleymotors.com/en/about-bentley/beyond-100/coming-this-way.html (Bentley electrification overview)\n- https://www.bentleymotors.com/en/models/continental-gt/continental-gt-speed.html (Continental GT Speed PHEV)\n- https://www.bentleymotors.com/en/models/flying-spur.html (Flying Spur PHEV)\n- https://www.bentleymotors.com/en/models/bentayga.html (Bentayga V8 + Hybrid)\n- https://theevreport.com/bentley-extends-beyond100-strategy-to-2035\n- https://www.thetruthaboutcars.com/cars/news-blog/recall-alert-2025-2026-bentley-continental-gtc-continental-gt-flying-spur-45131539",
  exclusionReason: "All models excluded",
} as const satisfies CarMake
