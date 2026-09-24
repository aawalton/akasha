import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChillCollectionNovember = {
  id: "01a0b4c8-4506-798f-a9f4-2c12bfb803c7",
  type: "page-type/track",
  slug: "paul-cardall-chill-collection-november",
  ownLength: 3.4438,
  ownProgress: 3.4438,
  partOfCollections: ["release/paul-cardall-chill-collection"],
  status: "completed",
  unit: "unit/minutes",
  title: "November",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "november|7FQRbf8gbKw8KZQZAJWxH2|206628",
  song: "song/paul-cardall-november",
  carriedBy: [
    {
      release: "release/paul-cardall-chill-collection",
      discNumber: 1,
      position: 4,
      externalId: "5CTTpjnaTOWsB7mSeoa6xO",
      externalLink: "https://open.spotify.com/track/5CTTpjnaTOWsB7mSeoa6xO",
    },
  ],
} as const satisfies Track
