import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayEverydayLifeWhenINeedAFriend = {
  id: "01a0b9ee-cfec-70c0-af3f-fc7ee700e1fd",
  type: "page-type/track",
  slug: "coldplay-everyday-life-when-i-need-a-friend",
  ownLength: 2.5833333333333335,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-everyday-life"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0UvUivL70eDwhTWBd8S38I",
      externalLink: "https://open.spotify.com/track/0UvUivL70eDwhTWBd8S38I",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "When I Need A Friend",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "whenineedafriend|4gzpq5DPGxSnKTe4SA8HAU|155000",
  song: "song/coldplay-when-i-need-a-friend",
} as const satisfies Track
