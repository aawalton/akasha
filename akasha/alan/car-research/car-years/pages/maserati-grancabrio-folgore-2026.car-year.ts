import type { CarYear } from "../car-year.page-type.ts"

export const maseratiGrancabrioFolgore2026 = {
  id: "019e4aee-1cae-7b99-b0f0-b6d273839114",
  pageTypeSlug: "car-year",
  slug: "maserati-grancabrio-folgore-2026",
  title: "2026",
  modelYear: 2026,
  refreshNotes:
    "MY2026 carries the GranCabrio Folgore forward without major hardware changes; tri-motor 751 hp / 83 kWh usable / 800V carries over. Same MY26 Stellantis-wide change as the coupe: Tesla Supercharger access via approved NACS-to-CCS1 adapter from 2026-03-19 ([Stellantis press release](https://www.prnewswire.com/news-releases/stellantis-expands-north-america-fast-charging-access-as-dodge-jeep-ram-fiat-and-maserati-bevs-plug-in-to-the-tesla-supercharger-network-302718753.html)). Data unavailable: official MY26 US base MSRP — Maserati's configurator quotes are not published at a single canonical price; expect ~$205-210k based on the MY26 GranTurismo Folgore step-up.",
  shortList: false,
  sources:
    "- [Maserati US — GranCabrio Folgore](https://www.maserati.com/us/en/models/grancabrio/grancabrio-folgore)\n- [Autocar — 2026 GranCabrio Folgore review](https://www.autocar.co.uk/car-review/maserati/grancabrio-folgore)\n- [Stellantis — Tesla Supercharger access (2026-03-19)](https://www.prnewswire.com/news-releases/stellantis-expands-north-america-fast-charging-access-as-dodge-jeep-ram-fiat-and-maserati-bevs-plug-in-to-the-tesla-supercharger-network-302718753.html)",
  exclusionReason: "All trims excluded",
  carModelSlug: "maserati-grancabrio-folgore",
} as const satisfies CarYear
