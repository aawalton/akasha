import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayVivaLaVidaOrDeathAndAllHisFriendsYes = {
  id: "01a0b9ee-e32a-7fce-8921-fe341512a653",
  type: "page-type/track",
  slug: "coldplay-viva-la-vida-or-death-and-all-his-friends-yes",
  ownLength: 7.110883333333334,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-viva-la-vida-or-death-and-all-his-friends"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "04zfFfRMXegKi4mMkGMeze",
      externalLink: "https://open.spotify.com/track/04zfFfRMXegKi4mMkGMeze",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Yes",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "yes|4gzpq5DPGxSnKTe4SA8HAU|426653",
  song: "song/coldplay-yes",
} as const satisfies Track
