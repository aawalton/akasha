import type { Fandom } from "../fandom.page-type.ts"

export const doctorWho = {
  id: "01a06808-5077-7005-8d3a-899ab4601798",
  pageTypeSlug: "fandom",
  slug: "doctor-who",
  title: "Doctor Who",
  partOfSlugs: ["science-fiction-fandoms", "speculative-antholoagies"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "paused",
} as const satisfies Fandom
