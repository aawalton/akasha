import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2JamesTaylorLiveHowSweetItIs = {
  id: "01a0abeb-3d42-7018-abbb-0eb7ec0011b7",
  type: "page-type/track",
  slug: "james-taylor-2-james-taylor-live-how-sweet-it-is",
  ownLength: 6.99555,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-james-taylor-live"],
  position: 14,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4BiqtG2bW4JrNRd2T2mr0j",
      externalLink: "https://open.spotify.com/track/4BiqtG2bW4JrNRd2T2mr0j",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "How Sweet It Is",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "howsweetitis|0vn7UBvSQECKJm2817Yf1P|419733",
  song: "song/james-taylor-how-sweet-it-is",
} as const satisfies Track
