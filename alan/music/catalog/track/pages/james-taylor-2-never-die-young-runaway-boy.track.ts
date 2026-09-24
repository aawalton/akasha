import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2NeverDieYoungRunawayBoy = {
  id: "01a0abeb-40fb-721d-8ae1-3af4fe0aa4cc",
  type: "page-type/track",
  slug: "james-taylor-2-never-die-young-runaway-boy",
  ownLength: 4.26555,
  ownProgress: 4.26555,
  partOfCollections: ["release/james-taylor-2-never-die-young"],
  status: "completed",
  unit: "unit/minutes",
  title: "Runaway Boy",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "runawayboy|0vn7UBvSQECKJm2817Yf1P|255933",
  song: "song/james-taylor-runaway-boy",
  carriedBy: [
    {
      release: "release/james-taylor-2-never-die-young",
      discNumber: 1,
      position: 4,
      externalId: "2d2rnhj1TolgOQnhOslfdE",
      externalLink: "https://open.spotify.com/track/2d2rnhj1TolgOQnhOslfdE",
    },
  ],
} as const satisfies Track
