import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS05e02 = {
  id: "01a18853-ac8f-7922-85ac-76e7a2c8a641",
  type: "page-type/episode",
  slug: "star-trek-voyager-s05e02",
  description:
    "Stardate: Unknown. A transporter accident merges some of Seven of Nine's nanoprobes with The Doctor's mobile emitter to create a 29th century Borg drone.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-5"],
  position: 2,
  publishedAt: "1998-10-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113200",
      externalLink: "https://www.themoviedb.org/tv/1855/season/5/episode/2",
    },
  ],
  title: "Drone",
  episodeType: "standard",
  stillPath: "/etc42H8gEokT8xO1OIBWWy63WVb.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
