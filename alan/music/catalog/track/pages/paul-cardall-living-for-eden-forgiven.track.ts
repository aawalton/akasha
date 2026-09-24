import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallLivingForEdenForgiven = {
  id: "01a0b4c8-4a91-7eb4-b83c-864ee03cd09d",
  type: "page-type/track",
  slug: "paul-cardall-living-for-eden-forgiven",
  ownLength: 4.3511,
  ownProgress: 4.3511,
  partOfCollections: ["release/paul-cardall-living-for-eden"],
  status: "completed",
  unit: "unit/minutes",
  title: "Forgiven",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "forgiven|7FQRbf8gbKw8KZQZAJWxH2|261066",
  song: "song/paul-cardall-forgiven",
  carriedBy: [
    {
      release: "release/paul-cardall-living-for-eden",
      discNumber: 1,
      position: 11,
      externalId: "742TUmraj0VL8O8eKM5Umm",
      externalLink: "https://open.spotify.com/track/742TUmraj0VL8O8eKM5Umm",
    },
  ],
} as const satisfies Track
