import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLive2012MajorMinusLive = {
  id: "01a0b9ee-d9f7-7650-81bd-ab9f58b95022",
  type: "page-type/track",
  slug: "coldplay-live-2012-major-minus-live",
  ownLength: 3.6662166666666667,
  ownProgress: 3.6662166666666667,
  partOfCollections: ["release/coldplay-live-2012"],
  status: "completed",
  unit: "unit/minutes",
  title: "Major Minus - Live",
  trackType: "live",
  explicit: true,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "majorminuslive|4gzpq5DPGxSnKTe4SA8HAU|219973",
  song: "song/coldplay-major-minus",
  carriedBy: [
    {
      release: "release/coldplay-live-2012",
      discNumber: 1,
      position: 4,
      externalId: "4WyX6hwqB1forx046ilrg2",
      externalLink: "https://open.spotify.com/track/4WyX6hwqB1forx046ilrg2",
    },
  ],
} as const satisfies Track
