import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChasingCrownsPiousJoy = {
  id: "01a0b4c8-2177-7cfd-a2e3-022169e12435",
  type: "page-type/track",
  slug: "paul-cardall-chasing-crowns-pious-joy",
  ownLength: 3.841666666666667,
  ownProgress: 3.841666666666667,
  partOfCollections: ["release/paul-cardall-chasing-crowns"],
  status: "completed",
  unit: "unit/minutes",
  title: "Pious Joy",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "piousjoy|7FQRbf8gbKw8KZQZAJWxH2|230500",
  song: "song/paul-cardall-pious-joy",
  carriedBy: [
    {
      release: "release/paul-cardall-chasing-crowns",
      discNumber: 1,
      position: 7,
      externalId: "7Fv1OTEguxBFL8pMUZ4ro9",
      externalLink: "https://open.spotify.com/track/7Fv1OTEguxBFL8pMUZ4ro9",
    },
  ],
} as const satisfies Track
