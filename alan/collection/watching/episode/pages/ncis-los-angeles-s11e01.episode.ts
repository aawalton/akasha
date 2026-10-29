import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS11e01 = {
  id: "01a1884a-e0f4-73b0-bc7b-600c9731ec4f",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s11e01",
  description:
    "Callen and Sam work with Navy Capt. Harmon Rabb, Jr. to apprehend spies aboard the USS Allegiance. Also, Hetty partners with Marine Lt. Col. Sarah “Mac” Mackenzie to neutralize a missile attack in the Middle East, and Kensi and Deeks are trapped in a mobile CIA unit in Iraq while under attack by ISIS.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-11"],
  position: 1,
  publishedAt: "2019-09-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1880549",
      externalLink: "https://www.themoviedb.org/tv/17610/season/11/episode/1",
    },
  ],
  title: "Let Fate Decide",
  episodeType: "standard",
  stillPath: "/a18H6H2F5yWxBVd8VfSNNTMusvU.jpg",
  voteAverage: 6.6,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
