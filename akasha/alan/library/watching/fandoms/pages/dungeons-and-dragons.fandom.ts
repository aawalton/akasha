import type { Fandom } from "../fandom.page-type.ts"

export const dungeonsAndDragons = {
  id: "01a06808-5077-7007-87c2-aaf641786c0e",
  pageTypeSlug: "fandom",
  slug: "dungeons-and-dragons",
  title: "Dungeons and Dragons",
  partOfSlugs: ["fantasy-fandoms"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
  rank: "B",
} as const satisfies Fandom
