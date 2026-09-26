import type { Mechanic } from "akasha/story/mechanic/mechanic.page-type.types.ts"

export const haremHotelCompanionTalents = {
  id: "01a0de06-d9a1-72a3-bfa9-706cafe37d5b",
  type: "page-type/mechanic",
  slug: "harem-hotel-companion-talents",
  title: "Companion Talents",
  description:
    "Every companion carries exactly one hidden sexual Talent of her own. A Talent does not level; it deepens, in a way that stays hidden. Each Talent's activation conditions are its own, hidden, and found only by living the relationship; no list of them exists. The first time a companion's conditions are met, the System marks it with a flat readout, and from then her Talent shows as her bond affinity description. No relationship ladder or meter tracks a bond: a companion's affinity description is absent until her Talent fires, then present. The state of a relationship lives in the story, not in a number, and the affinity description is the only mechanical trace a bond has.",
} as const satisfies Mechanic
