import type { CarYear } from "../car-year.page-type.ts"

export const porscheTaycan2025 = {
  id: "019e4af2-5c00-7bfb-a081-e1d35e96b7ee",
  pageTypeSlug: "car-year",
  slug: "porsche-taycan-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    "Major mid-cycle refresh ('Gen 1.5'). Larger Performance Battery Plus (105 kWh gross / 97 kWh usable, up from 93.4/83.7), new rear permanent-magnet motor (PSM), updated pulse-controlled inverter, regen capped at 400 kW (up from 290 kW), DC fast-charge peak 320 kW (up from 270 kW), 10-80% in ~18 min, 800V on-board charger increased to 11/22 kW AC. EPA range gains: base Taycan RWD up to 318 mi (from 242). Power increases across the lineup (Turbo S now 938 hp with launch control overboost). New driver-attention camera (gaze tracking) standard. New Push-to-Pass (PTP) overboost on Turbo S/Turbo GT. Infotainment updates: passenger display now available, new HVAC controls. Turbo GT new for 2025 ($231,995 USD), the most powerful production Porsche ever, sedan-only or with Weissach Package. Sport Turismo wagon returns to US lineup for 2025.\n\nSources:\n- https://newsroom.porsche.com/en_US/products/taycan/taycan-2024-update-35498.html\n- https://www.caranddriver.com/porsche/taycan-2025\n- https://insideevs.com/news/707984/2025-porsche-taycan-revealed-specs/",
  shortList: false,
  sources:
    "- https://www.porsche.com/usa/models/taycan/taycan-models/\n- https://www.fueleconomy.gov/feg/bymodel/2025_Porsche_Taycan.shtml\n- https://www.caranddriver.com/porsche/taycan/specs/2025/",
  exclusionReason: "All trims excluded",
  carModelSlug: "porsche-taycan",
} as const satisfies CarYear
