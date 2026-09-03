import type { CarMake } from "../../car-make.page-type.ts"

export const gmc = {
  id: "019e4ade-dff6-708e-9c18-da675a011163",
  pageTypeSlug: "car-make",
  slug: "gmc",
  title: "GMC",
  chargingNetworkAccess:
    "GMC EVs ship with CCS1 ports (MY2025) and use a GM-approved NACS-to-CCS adapter (~$225 via the GMC app) to access 17,800+ Tesla Superchargers, integrated into GM charging apps. Native NACS ports are arriving starting model year 2026 across the GM EV lineup including Hummer EV and Sierra EV. GMC EV owners also access Electrify America, EVgo, ChargePoint via CCS1. GM is deploying 35,000 GM Energy-invested public fast-charging stalls by 2030. Sources: https://gmauthority.com/blog/2024/11/gm-evs-to-get-nacs-connector-starting-with-2026-model-year/ ; https://recharged.com/articles/gm-tesla-adapter-guide ; https://gmauthority.com/blog/2024/09/heres-the-gm-approved-nacs-adapter/",
  country: "United States",
  drmPolicy:
    "GMC EVs require OnStar/GM connectivity for many premium features. Super Cruise hands-free driving requires an active OnStar Super Cruise plan after the initial 3-year trial — $20–$40/month depending on vehicle; lapsing the plan disables Super Cruise functionality (map updates, precise positioning, driver-monitoring features). GM briefly bundled mandatory $1,500 OnStar Premium with every 2023 Buick/GMC vehicle before reversing in March 2023; for MY2024+ OnStar Premium remains standard only on top trims (GMC Denali, Hummer EV) and optional on others. GM has not publicly removed previously-sold features post-sale, but the connectivity gating of Super Cruise is an effective subscription requirement for the hands-free ADAS. OTA updates and remote diagnostics depend on OnStar data connectivity. Sources: https://www.onstar.com/support/faq/super-cruise ; https://www.kbb.com/car-news/gm-drops-mandatory-onstar-subscriptions-for-most-buick-gmc-2024-models/ ; https://gmauthority.com/blog/2025/05/gm-revises-onstar-plans-and-pricing/ ; https://cars.usnews.com/cars-trucks/advice/what-is-super-cruise",
  electrificationStrategy:
    "GM (GMC parent) committed to electrifying 50% of its fleet by 2030 and 100% of light-duty / passenger vehicles by 2035, supported by the Ultium battery platform and $35B EV investment through 2025. GMC specifically anchors GM EV trucks/SUVs with the Hummer EV (pickup + SUV) and Sierra EV. Sources: https://www.hbs.edu/bigs/how-gm-is-shaping-an-all-electric-future ; https://www.gm.com/innovation/electrification ; https://news.gm.com/home.detail.html/Pages/news/us/en/2025/oct/1015-GM-Energy-builds-momentum.html",
  foundingYear: 1911,
  killSwitchPolicy:
    "GM has publicly stated it is developing an impaired-driving detection system in response to the IIJA mandate. The disclosed approach uses cameras and sensors that analyze a person walking up to the driver-side door, and in-cabin driver monitoring cameras (already deployed for Super Cruise) provide the hardware foundation for passive impairment detection. Software-based, not a discrete hardware kill switch. As of 2026, NHTSA has admitted the technology is not commercially ready and has signaled delay; Congressional amendments (e.g., Massie HR 1137) have been filed to block the mandate. GMC has issued no commitment that detection will be bypassable. Sources: https://www.theautopian.com/new-cars-sold-in-america-will-be-actively-watching-and-judging-you-and-may-decide-to-not-let-you-drive/ ; https://www.kbb.com/car-news/nhtsas-new-kill-switch-law-approaches-key-deadline/ ; https://www.motor1.com/news/794316/new-cars-mandate-impaired-driver-detection-delay/",
  nacsAdoption: "adapter",
  parentCorporation: "General Motors",
  reliabilityNotes:
    "Consumer Reports expects GMC Sierra EV reliability to be below average, extrapolated from data on related Ultium-platform GM EVs (Lyriq, Hummer EV) which have had recalls and infotainment / charging software issues. JD Power maintains separate score pages for Hummer EV (pickup and SUV) and Sierra EV. Both 2025 Sierra EV and Hummer EV have at least one NHTSA recall on record. Limited owner-survey data due to low production volumes. Sources: https://www.consumerreports.org/cars/gmc/sierra-ev/2025/reliability/ ; https://www.consumerreports.org/cars/gmc/hummer-ev/2025/reliability/ ; https://www.jdpower.com/cars/2025/gmc/hummer-ev ; https://www.jdpower.com/cars/2025/gmc/sierra-ev",
  trims: "jsonl",
  shortList: false,
  sources:
    "- https://www.gmc.com/electric (manufacturer)\n- https://www.gm.com/innovation/electrification (GM corporate EV strategy)\n- https://www.fueleconomy.gov/ (EPA range / MPGe)\n- https://www.consumerreports.org/cars/gmc/ (reliability)\n- https://www.jdpower.com/cars/2025/gmc (ratings)\n- https://www.iihs.org/ (safety)\n- https://www.nhtsa.gov/ (safety / recalls)\n- https://gmauthority.com/ (industry news)\n- https://electrek.co/ (EV news)\n- https://insideevs.com/ (EV technical detail)\n- https://www.edmunds.com/gmc/ (pricing / reviews)",
  exclusionReason: "All models excluded",
} as const satisfies CarMake
