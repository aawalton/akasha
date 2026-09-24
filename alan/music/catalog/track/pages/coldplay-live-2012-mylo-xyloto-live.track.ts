import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLive2012MyloXylotoLive = {
  id: "01a0b9ee-d977-7dbe-ab08-a540b30d0581",
  type: "page-type/track",
  slug: "coldplay-live-2012-mylo-xyloto-live",
  ownLength: 0.9603,
  ownProgress: 0.9603,
  partOfCollections: ["release/coldplay-live-2012"],
  status: "completed",
  unit: "unit/minutes",
  title: "Mylo Xyloto - Live",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "myloxylotolive|4gzpq5DPGxSnKTe4SA8HAU|57618",
  song: "song/coldplay-mylo-xyloto",
  carriedBy: [
    {
      release: "release/coldplay-live-2012",
      discNumber: 1,
      position: 1,
      externalId: "0ejLFn10FIMPNSwCmIviyR",
      externalLink: "https://open.spotify.com/track/0ejLFn10FIMPNSwCmIviyR",
    },
  ],
} as const satisfies Track
