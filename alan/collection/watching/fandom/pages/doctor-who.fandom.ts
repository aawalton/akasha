import type { Fandom } from "akasha/alan/collection/watching/fandom/fandom.page-type.types.ts"

export const doctorWho = {
  id: "01a06808-5077-7005-8d3a-899ab4601798",
  type: "page-type/fandom",
  slug: "doctor-who",
  title: "Doctor Who",
  partOfCollections: [
    "fandom-collection/science-fiction-fandoms",
    "show-collection/speculative-antholoagies",
  ],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "paused",
} as const satisfies Fandom
