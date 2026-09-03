import type { CarMake } from "../../car-make.page-type.ts"

export const bugatti = {
  id: "019e4ad5-622e-78e5-9500-63831b099080",
  pageTypeSlug: "car-make",
  slug: "bugatti",
  title: "Bugatti",
  chargingNetworkAccess:
    "Bugatti has announced no partnership with Tesla Supercharger, Electrify America, EVgo, or ChargePoint networks. The Tourbillon's 25 kWh PHEV battery is sized for ~37 mi (60 km) of EV-only driving and is expected to be home-charged via the customer's private infrastructure; Bugatti has not published DC fast-charge specs or a public network strategy. Source: https://en.wikipedia.org/wiki/Bugatti_Tourbillon",
  country: "France",
  drmPolicy:
    "Bugatti publicly describes a 'Connected Car' telemetry layer used during development and for in-life diagnostics: vehicles transmit operating data (engine, transmission, chassis) to Molsheim for prognostics and maintenance scheduling. There is no public evidence Bugatti has remotely disabled features post-sale, gated horsepower behind a subscription, or required permanent internet for core driving operation. Software updates are delivered through authorized service centers rather than mass-market over-the-air consumer pushes. Given the bespoke ultra-low-volume customer relationship (sub-300 unit production runs), the brand has not been implicated in the subscription-feature controversies seen at BMW/Mercedes. Source: https://newsroom.bugatti.com/en/press-releases/connected-car-la-bugatti",
  electrificationStrategy:
    "Bugatti's electrification strategy is defined by the Bugatti Rimac joint venture (formed 2021) under CEO Mate Rimac. The brand has transitioned from the pure-ICE quad-turbo W16 era (Chiron, Mistral) to a plug-in hybrid V16 era beginning with the Tourbillon (1,800 hp, 25 kWh, 800V; deliveries 2026). Rimac Technology supplies the high-voltage battery, electric motors, and inverter. Bugatti has not announced a fully battery-electric model or a hard date for going all-electric; the stated direction is hybrid hypercars that preserve naturally aspirated combustion character while adding EV instant torque. Source: https://www.rimac-newsroom.com/press-releases/rimac-technology/rimac-technology-powers-the-bugatti-tourbillon-with-cutting-edge-battery-and-powe ; https://newsroom.bugatti.com/en/press-releases/the-bugatti-tourbillon-an-automotive-icon-pour-leternite",
  foundingYear: 1909,
  killSwitchPolicy:
    "Data unavailable: Bugatti has made no public statement on the IIJA Section 24220 impaired-driving-detection mandate. NHTSA missed its November 2024 deadline and as of early 2026 has reported that available technologies do not meet required accuracy levels, so no manufacturer-specific compliance plans are public. Sources searched: NHTSA rulemaking trackers, Bugatti newsroom, dallasexpress and autoguide reporting on the IIJA timeline. Source: https://dallasexpress.com/national/ready-for-your-next-car-to-decide-if-youre-too-impaired-to-drive-federal-kill-switch-is-moving-forward/",
  nacsAdoption: "no",
  parentCorporation:
    "Bugatti Rimac (Rimac Group majority owner ~55%; Porsche AG ~45%, with Porsche's stake being sold to a HOF Capital-led consortium pending regulatory clearance through 2026)",
  reliabilityNotes:
    "Data unavailable: Bugatti does not appear in mainstream Consumer Reports or J.D. Power surveys due to sub-100-unit annual US volumes. TrueDelta does not aggregate Bugatti reliability data. Anecdotal owner reports for the Veyron/Chiron era describe high service costs and long lead times for replacement parts but few catastrophic failures; the Tourbillon as a new V16 + Rimac hybrid platform has no field reliability history as of 2026-05-21.",
  trims: "jsonl",
  shortList: false,
  sources:
    "- Bugatti official Tourbillon page: https://www.bugatti.com/en/models/tourbillon\n- Bugatti newsroom Tourbillon reveal: https://newsroom.bugatti.com/en/press-releases/the-bugatti-tourbillon-an-automotive-icon-pour-leternite\n- Wikipedia Bugatti Tourbillon: https://en.wikipedia.org/wiki/Bugatti_Tourbillon\n- Rimac Technology powertrain release: https://www.rimac-newsroom.com/press-releases/rimac-technology/rimac-technology-powers-the-bugatti-tourbillon-with-cutting-edge-battery-and-powe\n- Bugatti Rimac corporate background (Wikipedia): https://en.wikipedia.org/wiki/Bugatti_Rimac\n- Motor Authority Tourbillon reveal: https://www.motorauthority.com/news/1143588_bugatti-tourbillon-price-hp-photos-specs\n- Bugatti Connected Car newsroom: https://newsroom.bugatti.com/en/press-releases/connected-car-la-bugatti",
  exclusionReason: "All models excluded",
} as const satisfies CarMake
