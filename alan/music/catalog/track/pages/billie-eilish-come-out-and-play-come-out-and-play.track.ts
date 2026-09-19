import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishComeOutAndPlayComeOutAndPlay = {
  id: "01a0b638-ea86-7b84-bfe0-f1a6f9c95f95",
  type: "page-type/track",
  slug: "billie-eilish-come-out-and-play-come-out-and-play",
  ownLength: 3.50625,
  ownProgress: 0,
  partOfCollections: ["release/billie-eilish-come-out-and-play"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7wC5eZcFS1Q1BsQ35DU6H4",
      externalLink: "https://open.spotify.com/track/7wC5eZcFS1Q1BsQ35DU6H4",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "come out and play",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6qqNVTkY8uBg9cP3Jd7DAH", artistName: "Billie Eilish" }],
  trackKey: "comeoutandplay|6qqNVTkY8uBg9cP3Jd7DAH|210375",
  song: "song/billie-eilish-come-out-and-play",
} as const satisfies Track
