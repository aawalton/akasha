import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChasingCrownsPrelude = {
  id: "01a0b4c8-2092-7bdc-9cf7-91e1e09fdc86",
  type: "page-type/track",
  slug: "paul-cardall-chasing-crowns-prelude",
  ownLength: 1.25155,
  ownProgress: 1.25155,
  partOfCollections: ["release/paul-cardall-chasing-crowns"],
  status: "completed",
  unit: "unit/minutes",
  title: "Prelude",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "prelude|7FQRbf8gbKw8KZQZAJWxH2|75093",
  song: "song/paul-cardall-prelude",
  carriedBy: [
    {
      release: "release/paul-cardall-chasing-crowns",
      discNumber: 1,
      position: 1,
      externalId: "3zzIsWTRGuq7iyzBIZlKoL",
      externalLink: "https://open.spotify.com/track/3zzIsWTRGuq7iyzBIZlKoL",
    },
  ],
} as const satisfies Track
