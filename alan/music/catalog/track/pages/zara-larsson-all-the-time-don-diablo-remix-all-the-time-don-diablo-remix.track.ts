import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonAllTheTimeDonDiabloRemixAllTheTimeDonDiabloRemix = {
  id: "01a0aa7c-3de5-727f-839b-5b504f876a73",
  type: "page-type/track",
  slug: "zara-larsson-all-the-time-don-diablo-remix-all-the-time-don-diablo-remix",
  ownLength: 2.9436,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-all-the-time-don-diablo-remix"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1z1Hg7Vb0AhHDiEmnDE79l",
      externalLink: "https://open.spotify.com/track/1z1Hg7Vb0AhHDiEmnDE79l",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "All the Time - Don Diablo Remix",
  trackType: "remix",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" },
    { externalId: "1l2ekx5skC4gJH8djERwh1", artistName: "Don Diablo" },
  ],
  trackKey: "allthetimedondiabloremix|1Xylc3o4UrD53lo9CvFvVg,1l2ekx5skC4gJH8djERwh1|176616",
  song: "song/zara-larsson-all-the-time",
} as const satisfies Track
