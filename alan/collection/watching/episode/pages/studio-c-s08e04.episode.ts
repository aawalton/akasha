import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS08e04 = {
  id: "01a18885-00fe-7605-861d-c3f5ceba6881",
  type: "page-type/episode",
  slug: "studio-c-s08e04",
  description:
    "A tourist is confused by a New York sandwich shop's service, Mo and Susan go on the worlds most awkward date, and Bad Karma returns.",
  ownLength: 23,
  ownProgress: 23,
  partOfCollections: ["season/studio-c-season-8"],
  position: 4,
  publishedAt: "2017-10-23",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1378574",
      externalLink: "https://www.themoviedb.org/tv/68207/season/8/episode/4",
    },
  ],
  title: "Season 8 Episode 4",
  episodeType: "standard",
  stillPath: "/rdIE5ID0Pby9M1tcNn5vSzd9vD6.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T16:36:20.344Z",
  updatedAt: "2026-10-29T16:36:20.344Z",
} as const satisfies Episode
