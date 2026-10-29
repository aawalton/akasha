import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS10e03 = {
  id: "01a18885-00ff-7a6e-b6bd-b7f106a914ab",
  type: "page-type/episode",
  slug: "studio-c-s10e03",
  description:
    "Abraham Lincoln dishes out the honest truth on Say Yes to the Dress. Bigfoot infiltrates a group of Bigfoot hunters. And a dimwitted mob member “takes care of” a snitch.",
  ownLength: 25,
  ownProgress: 25,
  partOfCollections: ["season/studio-c-season-10"],
  position: 3,
  publishedAt: "2019-10-14",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1939298",
      externalLink: "https://www.themoviedb.org/tv/68207/season/10/episode/3",
    },
  ],
  title: "Season 10 Episode 3",
  episodeType: "standard",
  stillPath: "/ecCDdLul5a0qbLDVNg767KNWjgf.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T16:36:20.344Z",
  updatedAt: "2026-10-29T16:36:20.344Z",
} as const satisfies Episode
