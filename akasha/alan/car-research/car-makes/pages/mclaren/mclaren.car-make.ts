import type { CarMake } from "../../car-make.page-type.ts"

export const mclaren = {
  id: "019e4aec-0f19-778a-9fe6-acb2e1831c19",
  pageTypeSlug: "car-make",
  slug: "mclaren",
  title: "McLaren",
  chargingNetworkAccess:
    "McLaren has not announced any partnership with Tesla Supercharger, Electrify America, EVgo, ChargePoint, or other DC fast-charge networks. The Artura PHEV uses a Type 2 (EU) / J1772 (US) AC inlet for its 7.4 kWh pack; there is no DC fast-charge capability on the Artura. Owners charge at home via L2 or use any standard J1772 public AC charger. The W1 hypercar similarly relies on AC home/garage charging. No free-charging promotions exist. Source: https://cars.mclaren.com/us_en/artura",
  country: "United Kingdom",
  drmPolicy:
    "McLaren vehicles use the IRIS infotainment platform with optional 'McLaren Pure Connect' connected services (vehicle tracking, geofencing, valet mode, service reminders, stolen-vehicle protection). The Track Telemetry app is a paid-option software unlock through IRIS rather than a recurring subscription; the optional Video Data Logger (VDL) adds hardware cameras. No public evidence of post-sale remote feature reduction or pay-to-unlock heated-seat-style schemes. As ultra-low-volume exotics, McLarens depend on dealer service tools for many calibration tasks, which is a de facto connectivity dependence even though the car itself runs offline. No published remote-bricking incidents. Sources: https://cars.mclaren.com/gl_en/ownership/mclaren-track-telemetry ; https://play.google.com/store/apps/details?id=com.ikontechnologies.mclarenpure.connect",
  electrificationStrategy:
    "McLaren has explicitly rejected a near-term pure BEV strategy. CEO Nick Collins stated in 2025 that McLaren will only introduce an EV 'when the market requires it' and that 'real supercars' with electric power will not arrive until around 2030. Current strategy centers on V8 PHEV supercars (using a new Ricardo-developed V8 paired with a small ~10 kWh battery from Nio under a 2024 technology partnership) and the limited-production W1 PHEV hypercar. A V8 hybrid four-door SUV (codename P47) is planned for 2028 under the new CYVN ownership. All models launching in 2030 are expected to remain combustion-based with hybrid assistance. Sources: https://www.motor1.com/news/690229/mclaren-boss-supercar-not-electric-2030/ ; https://www.autoblog.com/news/mclaren-says-no-to-evs-as-it-prepares-new-hypercars-and-an-suv ; https://eletric-vehicles.com/mclaren/mclaren-ceo-says-no-plans-for-ev-model-a-year-after-gaining-access-to-nios-tech/",
  foundingYear: 1985,
  killSwitchPolicy:
    "Data unavailable: McLaren has made no public statement regarding compliance with the IIJA Section 24220 advanced impaired-driving prevention technology mandate. As a low-volume exotic manufacturer (well under 10,000 US units/year), McLaren has historically lagged mainstream OEMs on ADAS implementation and would likely adopt whatever passive detection system NHTSA's eventual rule prescribes once finalized. Searches of mclaren.com, McLaren press releases, and SAE filings returned no policy statement as of 2026-05-21.",
  nacsAdoption: "no",
  parentCorporation: "CYVN Holdings (Abu Dhabi)",
  reliabilityNotes:
    "McLaren is not rated by Consumer Reports, J.D. Power VDS, or TrueDelta due to insufficient sample size. Owner forums (McLarenLife, McLaren Owners Club) report significant Artura early-build issues: hybrid 12V charging system failures that can render the car unable to unlock or release doors, transmission oil leaks (NHTSA TSB MC-11012444), and multiple recalls (battery fire risk 2023; fuel pipe loosening 2023; brake line routing 2020-2025; low-pressure fuel pipe 2023-2024). 2024-2025 builds reportedly have most early bugs resolved. Sources: https://www.mclarenlife.com/threads/reliability-issues-with-my-2025-artura.118924/ ; https://www.hotcars.com/mclaren-arturas-problem-is-a-warning-for-all-hybrid-supercars/ ; https://www.cars.com/research/mclaren-artura/recalls/",
  trims: "jsonl",
  shortList: false,
  sources:
    "- https://en.wikipedia.org/wiki/McLaren_Group\n- https://en.wikipedia.org/wiki/Mumtalakat_Holding_Company\n- https://www.marketsgroup.org/news/bahrain-assumes-full-ownership-of-mclaren\n- https://cars.mclaren.com/us_en/artura\n- https://cars.mclaren.com/us_en/W1\n- https://www.motor1.com/news/690229/mclaren-boss-supercar-not-electric-2030/\n- https://www.cars.com/research/mclaren-artura/recalls/\n- https://www.mclarenlife.com/threads/reliability-issues-with-my-2025-artura.118924/",
  exclusionReason: "All models excluded",
} as const satisfies CarMake
