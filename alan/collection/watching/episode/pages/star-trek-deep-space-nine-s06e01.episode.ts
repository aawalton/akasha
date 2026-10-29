import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekDeepSpaceNineS06e01 = {
  id: "01a18852-7716-7e84-8af0-ad20a0c7f4f4",
  type: "page-type/episode",
  slug: "star-trek-deep-space-nine-s06e01",
  description:
    "Stardate: Unknown. As the war between the Federation and the Dominion continues, Sisko and his crew are reassigned from the Defiant, while Kira and Odo cope with the bureaucracy of the station's occupation.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-deep-space-nine-season-6"],
  position: 1,
  publishedAt: "1997-09-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1005828",
      externalLink: "https://www.themoviedb.org/tv/580/season/6/episode/1",
    },
  ],
  title: "A Time to Stand",
  episodeType: "standard",
  stillPath: "/chUMFvd6lbrd7E7SR7khXDPZ27s.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:41:08.240Z",
  updatedAt: "2026-10-29T15:41:08.240Z",
} as const satisfies Episode
