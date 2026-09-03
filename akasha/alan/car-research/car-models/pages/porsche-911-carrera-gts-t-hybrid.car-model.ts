import type { CarModel } from "../car-model.page-type.ts"

export const porsche911CarreraGtsTHybrid = {
  id: "019e4afd-91e1-7b88-afa7-ff9ab3e7d724",
  pageTypeSlug: "car-model",
  slug: "porsche-911-carrera-gts-t-hybrid",
  title: "911 Carrera GTS T-Hybrid",
  bodyStyle: "coupe",
  generation: "992.2 (2024 mid-cycle update of 8th gen 992)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The Porsche 911 received its first-ever electrified powertrain with the 992.2 mid-cycle refresh, debuting on the 2025 Carrera GTS T-Hybrid. The T-Hybrid system is a high-voltage 400V mild-hybrid (MHEV): a small 1.9 kWh lithium-ion battery, an electric motor integrated into the 8-speed PDK transmission, and a separate electric motor inside the new single-turbo VTG (variable turbine geometry) turbocharger to eliminate lag. Combined output is 532 hp / 449 lb-ft. This is NOT a plug-in — no external charging — but it is an electrified powertrain that uses regenerative braking to charge the small battery. The T-Hybrid is offered in 911 Carrera GTS Coupe ($165,250), Carrera GTS Cabriolet ($178,550), Targa 4 GTS ($188,950), and Carrera 4 GTS Coupe ($173,050). The 911 Carrera (base), Carrera S, and Carrera 4 S remain pure ICE; the GT3 stays naturally-aspirated ICE. The future Turbo and Turbo S are widely rumored to gain T-Hybrid in MY26 but as of May 2026 official US availability of T-Hybrid is limited to GTS variants.\n\nSources:\n- https://www.porsche.com/usa/models/911/911-carrera-gts-models/\n- https://newsroom.porsche.com/en_US/products/911/new-911-carrera-gts-t-hybrid-35857.html\n- https://www.caranddriver.com/porsche/911-carrera-gts-t-hybrid\n- https://insideevs.com/news/722123/2025-porsche-911-gts-t-hybrid-specs/",
  powertrainOptions: ["MHEV", "ICE"],
  segment: "sports",
  shortList: false,
  sources:
    "- https://www.porsche.com/usa/models/911/911-carrera-gts-models/\n- https://www.fueleconomy.gov/feg/Find.do?action=sbs&id=47600\n- https://newsroom.porsche.com/en_US/products/911/new-911-carrera-gts-t-hybrid-35857.html",
  exclusionReason: "All years excluded",
  carMakeSlug: "porsche",
} as const satisfies CarModel
