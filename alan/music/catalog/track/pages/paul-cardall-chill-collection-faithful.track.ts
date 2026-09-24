import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChillCollectionFaithful = {
  id: "01a0b4c8-454b-7a1a-8027-06afda9b9637",
  type: "page-type/track",
  slug: "paul-cardall-chill-collection-faithful",
  ownLength: 4.8579,
  ownProgress: 4.8579,
  partOfCollections: ["release/paul-cardall-chill-collection"],
  status: "completed",
  unit: "unit/minutes",
  title: "Faithful",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "faithful|7FQRbf8gbKw8KZQZAJWxH2|291474",
  song: "song/paul-cardall-faithful",
  carriedBy: [
    {
      release: "release/paul-cardall-chill-collection",
      discNumber: 1,
      position: 6,
      externalId: "6TqOBiHHErkTxQG9ViFnOQ",
      externalLink: "https://open.spotify.com/track/6TqOBiHHErkTxQG9ViFnOQ",
    },
  ],
} as const satisfies Track
