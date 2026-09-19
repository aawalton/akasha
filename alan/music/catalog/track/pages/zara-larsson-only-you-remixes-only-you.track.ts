import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonOnlyYouRemixesOnlyYou = {
  id: "01a0aa7c-3ff4-70fa-9a3d-90fd60ebb457",
  type: "page-type/track",
  slug: "zara-larsson-only-you-remixes-only-you",
  ownLength: 3.7060333333333335,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-only-you-remixes"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1XkKixc9NTzC2HXHPlijRk",
      externalLink: "https://open.spotify.com/track/1XkKixc9NTzC2HXHPlijRk",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Only You",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "onlyyou|1Xylc3o4UrD53lo9CvFvVg|222362",
  song: "song/zara-larsson-only-you",
} as const satisfies Track
