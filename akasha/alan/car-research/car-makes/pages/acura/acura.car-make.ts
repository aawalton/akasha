import type { CarMake } from "../../car-make.page-type.ts"

export const acura = {
  id: "019e4ad5-7a7a-7357-92fb-575bb03de841",
  pageTypeSlug: "car-make",
  slug: "acura",
  title: "Acura",
  chargingNetworkAccess:
    "Acura ZDX (MY2025) ships with a CCS1 port and uses an Acura-approved CCS-to-NACS adapter (introduced June 2025) for Tesla Supercharger access — over 23,500 selected Superchargers in the US. ZDX owners also get bundled access to Electrify America and EVgo via Honda/Acura agreements announced in 2023. The MY2026 RSX will ship with a native NACS port (Acura's first), with CCS adapter for legacy networks. Sources: https://acuranews.com/en-US/releases/release-ccb19723f8c4bc9d353bc56a2c0ee138-acura-zdx-owners-now-have-access-to-tesla-supercharger-network-with-approved-adapters , https://acuranews.com/en-US/releases/release-cc39196e84787a20ec3cb086fb215129-honda-and-acura-electric-vehicles-will-have-access-to-largest-ev-charging-networks-in-north-america-aided-by-new-agreements-with-evgo-and-electrify-america",
  country: "Japan",
  drmPolicy:
    "Acura uses AcuraLink connected services with subscription tiers (Standard, Security, Premium). The Standard package includes automatic collision notification and emergency calling. Higher tiers (Security, Premium) unlock remote start, vehicle finder, geofencing, speed alerts, and concierge — typically free for a trial period (3-12 months on new vehicles) then $14.99-$24.99/month. Core driving functions, infotainment, wireless CarPlay/Android Auto do not require subscription. The 2026 RSX will introduce Honda's new ASIMO operating system with OTA updates and driver-behavior learning, which may shift more features behind connectivity. No documented post-sale remote feature reductions for the Acura brand as of 2026-05. Sources: https://www.acura.com/owners/acuralink , https://www.cars.com/articles/hybrids-evs-and-performance-honda-acura-have-big-plans-for-the-next-few-years-520305/",
  electrificationStrategy:
    "Acura's electrification strategy emphasizes a multi-pillar approach: gas-powered performance (Integra, TLX, ADX), hybrid efficiency (next-gen RDX/MDX in development), and full-electric (ZDX, RSX). The ZDX (MY2025), built on GM's Ultium platform, served as a bridge BEV but was discontinued in September 2025 after only 18 months of production due to low sales. The 2026 RSX is Acura's first in-house EV, built on Honda's global EV platform at the new EV Hub in Ohio, with NACS port standard. Parent Honda plans 15 new Honda/Acura hybrid models globally (primarily North America) by 2030, and Acura has stated future Acura performance cars will all be hybrid. Source: https://acuranews.com/en-US/releases/next-generation-acura-rdx-will-go-hybrid , https://www.cars.com/articles/hybrids-evs-and-performance-honda-acura-have-big-plans-for-the-next-few-years-520305/",
  foundingYear: 1986,
  killSwitchPolicy:
    "Data unavailable: Acura has not made public statements specifically addressing the IIJA Section 24220 impaired-driving-detection mandate (expected ~2027). As a Honda subsidiary, Acura is expected to follow Honda's compliance approach. NHTSA has not finalized the rule as of 2026-05, and Honda/Acura have generally adopted Sensing/AcuraWatch driver-monitoring systems that include camera-based attention monitoring (face/eye tracking) on newer models (e.g., MDX Type S, ZDX), which could form the substrate for passive impairment detection. No public hardware vs software disclosure. Source attempted: NHTSA press releases, acuranews.com, no Acura-specific position found.",
  nacsAdoption: "partial",
  parentCorporation: "Honda Motor Company",
  reliabilityNotes:
    "Acura is consistently a top-tier reliability brand. Consumer Reports placed Acura around 5th in its 2024-2025 brand reliability rankings. J.D. Power 2025 ratings: MDX scores 83/100 (Great), RDX scores 81/100 (Great); Acura RDX ranked highest in the Compact Premium SUV segment in J.D. Power's 2025 Initial Quality Study (IQS). RepairPal gives Acura 4.0/5.0 (2nd out of 32 brands). The ZDX is a new BEV (built on GM's Ultium platform), so brand-level Acura reliability does not necessarily extend — early Ultium platform issues (Cadillac LYRIQ, Honda Prologue) may apply. Sources: https://www.jdpower.com/cars/2025/acura/mdx , https://www.consumerreports.org/cars/acura/ , https://www.jalopnik.com/1977147/acura-reliability-consumer-reports/",
  trims: "jsonl",
  shortList: false,
  sources:
    "1. Acura News (Honda PR): https://acuranews.com\n2. Acura.com official site: https://www.acura.com\n3. Cars.com Acura/Honda strategy: https://www.cars.com/articles/hybrids-evs-and-performance-honda-acura-have-big-plans-for-the-next-few-years-520305/\n4. J.D. Power Acura: https://www.jdpower.com/cars/2025/acura/mdx\n5. Consumer Reports Acura: https://www.consumerreports.org/cars/acura/\n6. NACS adapter PR: https://acuranews.com/en-US/releases/release-ccb19723f8c4bc9d353bc56a2c0ee138-acura-zdx-owners-now-have-access-to-tesla-supercharger-network-with-approved-adapters\n7. Wikipedia Acura ZDX: https://en.wikipedia.org/wiki/Acura_ZDX",
  exclusionReason: "All models excluded",
} as const satisfies CarMake
