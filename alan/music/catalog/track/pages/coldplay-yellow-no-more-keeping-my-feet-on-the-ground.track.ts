import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayYellowNoMoreKeepingMyFeetOnTheGround = {
  id: "01a0b9ef-03ee-778e-ad69-c1fe06bfec9e",
  type: "page-type/track",
  slug: "coldplay-yellow-no-more-keeping-my-feet-on-the-ground",
  ownLength: 4.51955,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-yellow"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7dmCmBBaWAQlCBAkcqMu99",
      externalLink: "https://open.spotify.com/track/7dmCmBBaWAQlCBAkcqMu99",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "No More Keeping My Feet on the Ground",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "nomorekeepingmyfeetontheground|4gzpq5DPGxSnKTe4SA8HAU|271173",
  song: "song/coldplay-no-more-keeping-my-feet-on-the-ground",
} as const satisfies Track
