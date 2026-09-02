import type { World } from "../world.page-type.ts"

export const hyrule = {
  id: "01a063d8-61f2-75fc-a2b4-274931f3ceed",
  pageTypeSlug: "world",
  slug: "hyrule",
  title: "Hyrule",
  description:
    "A kingdom a hundred years after its Calamity, its castle still ringed in malice, its people scattered across a wilderness grown up over everything the old world built.",
} as const satisfies World
