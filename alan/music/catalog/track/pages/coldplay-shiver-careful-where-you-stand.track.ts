import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayShiverCarefulWhereYouStand = {
  id: "01a0b9ef-0460-7c91-b766-88767bec2134",
  type: "page-type/track",
  slug: "coldplay-shiver-careful-where-you-stand",
  ownLength: 4.7504333333333335,
  ownProgress: 4.7504333333333335,
  partOfCollections: ["release/coldplay-shiver"],
  status: "completed",
  unit: "unit/minutes",
  title: "Careful Where You Stand",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "carefulwhereyoustand|4gzpq5DPGxSnKTe4SA8HAU|285026",
  song: "song/coldplay-careful-where-you-stand",
  carriedBy: [
    {
      release: "release/coldplay-shiver",
      discNumber: 1,
      position: 3,
      externalId: "6V3U7whxAMRzOLTli2zt26",
      externalLink: "https://open.spotify.com/track/6V3U7whxAMRzOLTli2zt26",
    },
  ],
} as const satisfies Track
