import type { BookSection } from "../../../../../library/reading/book-chapters/book-section.page-type.ts"

export const lightsAndPlugs = {
  id: "01a06594-c68d-7006-9ac2-cbf5c585c530",
  pageTypeSlug: "book-section",
  slug: "lights-and-plugs",
  title: "Lighting + Plug Loads (non-gaming)",
  sectionOf: "book-section/solar-power/energy-demand",
  description:
    "Lighting, non-gaming plug loads, networking, outdoor lighting, garage, and pool/hot-tub/home-lab flag-loads — annual kWh and what pushes them up or down.",
  partOfCollections: ["book-section/solar-power/energy-demand"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
