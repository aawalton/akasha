import type { CarYear } from "../car-year.page-type.ts"

export const lucidAir2025 = {
  id: "019e4aea-f5cb-7559-a2a0-a1258032b1a2",
  pageTypeSlug: "car-year",
  slug: "lucid-air-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    "2025 Lucid Air carries over the 2024 lineup (Pure, Touring, Grand Touring, Sapphire). Mid-year price adjustments brought Pure to $69,900 (a $7,500 cut tied to the federal tax credit gap). Standard equipment expanded — DreamDrive Pro is standard on Touring and above, and a new 22-inch wheel option was added on Grand Touring. No major hardware changes; software refinements via OTA throughout the year.\n\nSources:\n- https://www.cars.com/research/lucid-air-2025/\n- https://insideevs.com/news/708712/lucid-air-pure-price-cut/\n- https://carbuzz.com/cars/lucid/air/2025/",
  shortList: false,
  sources:
    "- https://www.cars.com/research/lucid-air-2025/\n- https://www.thecarconnection.com/cars/lucid_air\n- https://carbuzz.com/cars/lucid/air/2025/",
  exclusionReason: "All trims excluded",
  carModelSlug: "lucid-air",
} as const satisfies CarYear
