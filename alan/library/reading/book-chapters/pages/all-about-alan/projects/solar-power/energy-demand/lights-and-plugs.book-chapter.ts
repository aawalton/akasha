import type { BookChapter } from "../../../../../book-chapter.page-type.ts"

export const lightsAndPlugs = {
  id: "01a06594-c68d-7006-9ac2-cbf5c585c530",
  pageTypeSlug: "book-chapter",
  slug: "lights-and-plugs",
  title: "Lighting + Plug Loads (non-gaming)",
  description:
    "Lighting, non-gaming plug loads, networking, outdoor lighting, garage, and pool/hot-tub/home-lab flag-loads — annual kWh and what pushes them up or down.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
