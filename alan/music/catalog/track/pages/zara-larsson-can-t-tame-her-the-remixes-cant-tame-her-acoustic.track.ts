import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonCanTTameHerTheRemixesCantTameHerAcoustic = {
  id: "01a0aa7c-3b70-7b97-8bc2-127b3a3ea0bc",
  type: "page-type/track",
  slug: "zara-larsson-can-t-tame-her-the-remixes-cant-tame-her-acoustic",
  ownLength: 3.5,
  ownProgress: 3.5,
  partOfCollections: ["release/zara-larsson-can-t-tame-her-the-remixes"],
  position: 4,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2Q84Tw4B9TUibN0vxQPFkT",
      externalLink: "https://open.spotify.com/track/2Q84Tw4B9TUibN0vxQPFkT",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Can't Tame Her - Acoustic",
  trackType: "acoustic",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "canttameheracoustic|1Xylc3o4UrD53lo9CvFvVg|210000",
  song: "song/zara-larsson-can-t-tame-her",
  carriedBy: [
    {
      release: "release/zara-larsson-can-t-tame-her-the-remixes",
      discNumber: 1,
      position: 4,
      externalId: "2Q84Tw4B9TUibN0vxQPFkT",
      externalLink: "https://open.spotify.com/track/2Q84Tw4B9TUibN0vxQPFkT",
    },
  ],
} as const satisfies Track
