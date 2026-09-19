import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayASkyFullOfStars2AllYourFriends = {
  id: "01a0b9ee-f66a-7fae-9b3c-f6cd3c3b6f54",
  type: "page-type/track",
  slug: "coldplay-a-sky-full-of-stars-2-all-your-friends",
  ownLength: 3.5302166666666666,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-a-sky-full-of-stars-2"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5RcZ84RmZ0TVTZQR3fWHoG",
      externalLink: "https://open.spotify.com/track/5RcZ84RmZ0TVTZQR3fWHoG",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "All Your Friends",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "allyourfriends|4gzpq5DPGxSnKTe4SA8HAU|211813",
} as const satisfies Track
