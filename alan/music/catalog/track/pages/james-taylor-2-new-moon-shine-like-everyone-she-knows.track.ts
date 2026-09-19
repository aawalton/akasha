import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2NewMoonShineLikeEveryoneSheKnows = {
  id: "01a0abeb-3fe8-7b32-b103-ac216d556106",
  type: "page-type/track",
  slug: "james-taylor-2-new-moon-shine-like-everyone-she-knows",
  ownLength: 4.932883333333334,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-new-moon-shine"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7nomKdjCucPNhBx3RbCim0",
      externalLink: "https://open.spotify.com/track/7nomKdjCucPNhBx3RbCim0",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Like Everyone She Knows",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "likeeveryonesheknows|0vn7UBvSQECKJm2817Yf1P|295973",
  song: "song/james-taylor-like-everyone-she-knows",
} as const satisfies Track
