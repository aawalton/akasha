import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallSavingTinyHeartsSaintsTravelers = {
  id: "01a0b4c8-3dab-72ed-8740-8f432633f9fe",
  type: "page-type/track",
  slug: "paul-cardall-saving-tiny-hearts-saints-travelers",
  ownLength: 1.5631,
  ownProgress: 1.5631,
  partOfCollections: ["release/paul-cardall-saving-tiny-hearts"],
  status: "completed",
  unit: "unit/minutes",
  title: "Saints & Travelers",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "saintstravelers|7FQRbf8gbKw8KZQZAJWxH2|93786",
  song: "song/paul-cardall-saints-travelers",
  carriedBy: [
    {
      release: "release/paul-cardall-saving-tiny-hearts",
      discNumber: 1,
      position: 8,
      externalId: "7J1ZqyD9jZmQlS6XVT32uw",
      externalLink: "https://open.spotify.com/track/7J1ZqyD9jZmQlS6XVT32uw",
    },
  ],
} as const satisfies Track
