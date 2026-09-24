import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2SoloToWhereYouAre = {
  id: "01a0abea-6a20-7e77-b325-604125ecd8eb",
  type: "page-type/track",
  slug: "celtic-woman-2-solo-to-where-you-are",
  ownLength: 3.897466666666667,
  ownProgress: 3.897466666666667,
  partOfCollections: ["release/celtic-woman-2-solo"],
  status: "completed",
  unit: "unit/minutes",
  title: "To Where You Are",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artistName: "Chloe" }],
  trackKey: "towhereyouare|71POUphzXd95FKPipXjtE0|233848",
  song: "song/celtic-woman-to-where-you-are",
  carriedBy: [
    {
      release: "release/celtic-woman-2-solo",
      discNumber: 1,
      position: 1,
      externalId: "5RbXE7mq9xKfDD9RttPFro",
      externalLink: "https://open.spotify.com/track/5RbXE7mq9xKfDD9RttPFro",
    },
  ],
} as const satisfies Track
