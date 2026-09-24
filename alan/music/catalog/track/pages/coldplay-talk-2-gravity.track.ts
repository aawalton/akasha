import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayTalk2Gravity = {
  id: "01a0b9ee-fe8f-766c-bee1-bbc07ae80121",
  type: "page-type/track",
  slug: "coldplay-talk-2-gravity",
  ownLength: 6.3491,
  ownProgress: 6.3491,
  partOfCollections: ["release/coldplay-talk-2"],
  status: "completed",
  unit: "unit/minutes",
  title: "Gravity",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "gravity|4gzpq5DPGxSnKTe4SA8HAU|380946",
  song: "song/coldplay-gravity",
  carriedBy: [
    {
      release: "release/coldplay-talk-2",
      discNumber: 1,
      position: 3,
      externalId: "44LVgFZvUcBYo98vy71tvd",
      externalLink: "https://open.spotify.com/track/44LVgFZvUcBYo98vy71tvd",
    },
  ],
} as const satisfies Track
