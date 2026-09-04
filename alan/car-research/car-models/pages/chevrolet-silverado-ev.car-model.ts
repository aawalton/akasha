import type { CarModel } from "../car-model.page-type.ts"

export const chevroletSilveradoEv = {
  id: "019e4adc-e48a-7909-8382-37309b6af7b2",
  pageTypeSlug: "car-model",
  slug: "chevrolet-silverado-ev",
  title: "Silverado EV",
  bodyStyle: "truck",
  generation: "1st gen (Ultium / BT1 platform)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The Chevrolet Silverado EV is a full-size battery-electric pickup on GM's Ultium BT1 platform - distinct from the ICE Silverado, sharing only the nameplate. Launched 2023 as a fleet-focused Work Truck (WT), with consumer-oriented RST First Edition arriving 2024. Up to 200 kWh battery, up to 492 miles of EPA range (Max Range trim), 754 hp Wide Open Watts mode, 12,500 lb max tow rating, and includes the GM-exclusive 800V architecture. For 2026, the new Trail Boss off-road trim joins the lineup; RST in 2026 is only available as a Stars & Steel Special Edition. Sources: [Chevrolet Silverado EV](https://www.chevrolet.com/electric/silverado-ev), [Wikipedia Silverado EV](https://en.wikipedia.org/wiki/Chevrolet_Silverado_EV).",
  powertrainOptions: ["BEV"],
  segment: "full-size",
  shortList: false,
  sources:
    "- [Chevrolet Silverado EV](https://www.chevrolet.com/electric/silverado-ev)\n- [Edmunds 2025](https://www.edmunds.com/chevrolet/silverado-ev/2025/)\n- [Edmunds 2026](https://www.edmunds.com/chevrolet/silverado-ev/)\n- [GM Newsroom Trail Boss](https://news.chevrolet.com/newsroom.detail.html/Pages/news/us/en/2025/may/0521-Trail-Boss-joins-2026-Chevrolet-Silverado-EV.html)",
  exclusionReason: "All years excluded",
  carMakeSlug: "chevrolet",
} as const satisfies CarModel
