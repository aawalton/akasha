import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2SoloToWhereYouAre = {
  id: "01a0abea-6a20-7e77-b325-604125ecd8eb",
  type: "page-type/track",
  slug: "celtic-woman-2-solo-to-where-you-are",
  ownLength: 3.897466666666667,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-solo"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5RbXE7mq9xKfDD9RttPFro",
      externalLink: "https://open.spotify.com/track/5RbXE7mq9xKfDD9RttPFro",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "To Where You Are",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "71POUphzXd95FKPipXjtE0", artistName: "Chloe" }],
  trackKey: "towhereyouare|71POUphzXd95FKPipXjtE0|233848",
  song: "song/celtic-woman-to-where-you-are",
} as const satisfies Track
