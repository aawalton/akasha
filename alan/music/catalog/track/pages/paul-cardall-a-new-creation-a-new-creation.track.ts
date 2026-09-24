import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallANewCreationANewCreation = {
  id: "01a0b4c8-3570-7b91-a18f-67821ab35388",
  type: "page-type/track",
  slug: "paul-cardall-a-new-creation-a-new-creation",
  ownLength: 4.33465,
  ownProgress: 4.33465,
  partOfCollections: ["release/paul-cardall-a-new-creation"],
  status: "completed",
  unit: "unit/minutes",
  title: "A New Creation",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "anewcreation|7FQRbf8gbKw8KZQZAJWxH2|260079",
  song: "song/paul-cardall-a-new-creation",
  carriedBy: [
    {
      release: "release/paul-cardall-a-new-creation",
      discNumber: 1,
      position: 1,
      externalId: "2S9HnFLlPJzLuqIFlqIRCa",
      externalLink: "https://open.spotify.com/track/2S9HnFLlPJzLuqIFlqIRCa",
    },
  ],
} as const satisfies Track
