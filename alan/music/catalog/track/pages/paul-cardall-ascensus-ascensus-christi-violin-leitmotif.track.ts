import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallAscensusAscensusChristiViolinLeitmotif = {
  id: "01a0b4c8-246f-7ac2-9ffd-f6b5655ff777",
  type: "page-type/track",
  slug: "paul-cardall-ascensus-ascensus-christi-violin-leitmotif",
  ownLength: 0.6,
  ownProgress: 0.6,
  partOfCollections: ["release/paul-cardall-ascensus"],
  status: "completed",
  unit: "unit/minutes",
  title: "Ascensus Christi: Violin Leitmotif",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "ascensuschristiviolinleitmotif|7FQRbf8gbKw8KZQZAJWxH2|36000",
  song: "song/paul-cardall-ascensus-christi-violin-leitmotif",
  carriedBy: [
    {
      release: "release/paul-cardall-ascensus",
      discNumber: 1,
      position: 7,
      externalId: "7BKIEfGf8sZcgZ5q3LLmNu",
      externalLink: "https://open.spotify.com/track/7BKIEfGf8sZcgZ5q3LLmNu",
    },
  ],
} as const satisfies Track
