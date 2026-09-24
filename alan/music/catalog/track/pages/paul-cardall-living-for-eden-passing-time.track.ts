import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallLivingForEdenPassingTime = {
  id: "01a0b4c8-49d2-784a-beaf-32618a167ba0",
  type: "page-type/track",
  slug: "paul-cardall-living-for-eden-passing-time",
  ownLength: 3.9771,
  ownProgress: 3.9771,
  partOfCollections: [
    "release/paul-cardall-living-for-eden",
    "release/paul-cardall-saving-tiny-hearts",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Passing Time",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "passingtime|7FQRbf8gbKw8KZQZAJWxH2|238626",
  song: "song/paul-cardall-passing-time",
  carriedBy: [
    {
      release: "release/paul-cardall-living-for-eden",
      discNumber: 1,
      position: 6,
      externalId: "3e8GvZAiQt6sCjlOWDJhOf",
      externalLink: "https://open.spotify.com/track/3e8GvZAiQt6sCjlOWDJhOf",
    },
    {
      release: "release/paul-cardall-saving-tiny-hearts",
      discNumber: 1,
      position: 3,
      externalId: "6duBqVrcQLJQ3o8ayXlQ5m",
      externalLink: "https://open.spotify.com/track/6duBqVrcQLJQ3o8ayXlQ5m",
    },
  ],
} as const satisfies Track
