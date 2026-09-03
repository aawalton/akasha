import type { CarYear } from "../car-year.page-type.ts"

export const lucidGravity2025 = {
  id: "019e4aeb-2124-782f-9ff5-558035973ed4",
  pageTypeSlug: "car-year",
  slug: "lucid-gravity-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    "Inaugural model year for the Lucid Gravity SUV. U.S. customer deliveries began in late 2024 (a brief pause occurred in early 2025 before resuming in March 2025). Only the Grand Touring trim was offered for MY2025; the more affordable Touring trim launched as MY2026 (Nov 2025). Standard equipment includes 828 hp dual-motor AWD, 5- or 7-seat configurations, 400 kW DC fast charging, native NACS port (first Lucid with one), and DreamDrive Pro ADAS.\n\nSources:\n- https://lucidmotors.com/gravity\n- https://ir.lucidmotors.com/news-releases/news-release-details/lucid-gravity-grand-touring-customer-deliveries-begin-canada\n- https://electrek.co/2025/11/07/lucid-says-more-affordable-gravity-touring-suv-still-on-track/",
  shortList: false,
  sources: "- https://lucidmotors.com/gravity\n- https://www.kbb.com/lucid/gravity/2026/specs/",
  exclusionReason: "All trims excluded",
  carModelSlug: "lucid-gravity",
} as const satisfies CarYear
