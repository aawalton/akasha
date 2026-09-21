import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMyloXylotoHurtsLikeHeaven = {
  id: "01a0b9ee-dc19-7985-bd5f-afd394f96ca8",
  type: "page-type/track",
  slug: "coldplay-mylo-xyloto-hurts-like-heaven",
  ownLength: 4.03755,
  ownProgress: 4.03755,
  partOfCollections: ["release/coldplay-mylo-xyloto"],
  position: 2,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6WF4hzdGXvXd1joERSXJjm",
      externalLink: "https://open.spotify.com/track/6WF4hzdGXvXd1joERSXJjm",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Hurts Like Heaven",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "hurtslikeheaven|4gzpq5DPGxSnKTe4SA8HAU|242253",
  song: "song/coldplay-hurts-like-heaven",
  carriedBy: [
    {
      release: "release/coldplay-mylo-xyloto",
      discNumber: 1,
      position: 2,
      externalId: "6WF4hzdGXvXd1joERSXJjm",
      externalLink: "https://open.spotify.com/track/6WF4hzdGXvXd1joERSXJjm",
    },
  ],
} as const satisfies Track
