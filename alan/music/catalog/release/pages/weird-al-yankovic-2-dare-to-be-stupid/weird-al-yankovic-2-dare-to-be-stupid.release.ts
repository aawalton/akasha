import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const weirdAlYankovic2DareToBeStupid = {
  id: "01a0676a-d71b-7066-807e-78a7754f13e4",
  type: "page-type/release",
  slug: "weird-al-yankovic-2-dare-to-be-stupid",
  title: "Dare To Be Stupid",
  partOfCollections: ["artist/weird-al-yankovic"],
  position: 0,
  ownLength: 36.9646,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1985-06-18",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4sug9Au5Rrm34TwdTAux5O",
      externalLink: "https://open.spotify.com/album/4sug9Au5Rrm34TwdTAux5O",
    },
  ],
} as const satisfies Release
