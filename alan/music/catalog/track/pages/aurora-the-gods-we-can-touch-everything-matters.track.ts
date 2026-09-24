import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraTheGodsWeCanTouchEverythingMatters = {
  id: "01a0b637-f402-7c7d-a3df-c248ad91ac02",
  type: "page-type/track",
  slug: "aurora-the-gods-we-can-touch-everything-matters",
  ownLength: 3.5651,
  ownProgress: 3.5651,
  partOfCollections: ["release/aurora-the-gods-we-can-touch"],
  status: "completed",
  unit: "unit/minutes",
  title: "Everything Matters",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/aurora" }, { artistName: "Pomme" }],
  trackKey: "everythingmatters|1WgXqy2Dd70QQOU7Ay074N,6e3pZKXUxrPfnUPJ960Hd9|213906",
  song: "song/aurora-everything-matters",
  carriedBy: [
    {
      release: "release/aurora-the-gods-we-can-touch",
      discNumber: 1,
      position: 2,
      externalId: "4X00YoOQUD49hwdXmWBXHM",
      externalLink: "https://open.spotify.com/track/4X00YoOQUD49hwdXmWBXHM",
    },
  ],
} as const satisfies Track
