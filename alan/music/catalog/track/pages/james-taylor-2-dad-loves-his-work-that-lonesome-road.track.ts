import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2DadLovesHisWorkThatLonesomeRoad = {
  id: "01a0abeb-4460-752b-be84-829424df0294",
  type: "page-type/track",
  slug: "james-taylor-2-dad-loves-his-work-that-lonesome-road",
  ownLength: 2.3566666666666665,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-dad-loves-his-work"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "04RAcppX0YjUqDYWy4nAix",
      externalLink: "https://open.spotify.com/track/04RAcppX0YjUqDYWy4nAix",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "That Lonesome Road",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "thatlonesomeroad|0vn7UBvSQECKJm2817Yf1P|141400",
  song: "song/james-taylor-that-lonesome-road",
} as const satisfies Track
