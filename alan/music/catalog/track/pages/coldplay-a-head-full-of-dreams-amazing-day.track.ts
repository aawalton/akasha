import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayAHeadFullOfDreamsAmazingDay = {
  id: "01a0b9ee-d634-71d2-bcc0-5cce93954e7f",
  type: "page-type/track",
  slug: "coldplay-a-head-full-of-dreams-amazing-day",
  ownLength: 4.518433333333333,
  ownProgress: 4.518433333333333,
  partOfCollections: ["release/coldplay-a-head-full-of-dreams"],
  status: "completed",
  unit: "unit/minutes",
  title: "Amazing Day",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "amazingday|4gzpq5DPGxSnKTe4SA8HAU|271106",
  song: "song/coldplay-amazing-day",
  carriedBy: [
    {
      release: "release/coldplay-a-head-full-of-dreams",
      discNumber: 1,
      position: 9,
      externalId: "3wtV2ifnHzirkAElgTGh63",
      externalLink: "https://open.spotify.com/track/3wtV2ifnHzirkAElgTGh63",
    },
  ],
} as const satisfies Track
