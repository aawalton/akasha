import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraTheGodsWeCanTouchTheInnocent = {
  id: "01a0b637-f4f1-7c49-92cd-246795fa23d4",
  type: "page-type/track",
  slug: "aurora-the-gods-we-can-touch-the-innocent",
  ownLength: 3.45755,
  ownProgress: 3.45755,
  partOfCollections: ["release/aurora-the-gods-we-can-touch"],
  status: "completed",
  unit: "unit/minutes",
  title: "The Innocent",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/aurora" }],
  trackKey: "theinnocent|1WgXqy2Dd70QQOU7Ay074N|207453",
  song: "song/aurora-the-innocent",
  carriedBy: [
    {
      release: "release/aurora-the-gods-we-can-touch",
      discNumber: 1,
      position: 8,
      externalId: "5oxNpNSkFYi5EDWEuj663I",
      externalLink: "https://open.spotify.com/track/5oxNpNSkFYi5EDWEuj663I",
    },
  ],
} as const satisfies Track
