import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const thePianoGuys3WaterfallFeatRichardElliott = {
  id: "01a0676a-d730-701f-98d1-563221e10884",
  type: "page-type/release",
  slug: "the-piano-guys-3-waterfall-feat-richard-elliott",
  ownLength: 3.1216,
  ownProgress: 3.1216,
  partOfCollections: ["artist/the-piano-guys"],
  position: 0,
  publishedAt: "2023-05-26",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3Q0o8B3CtaxQD2kfovrVjn",
      externalLink: "https://open.spotify.com/album/3Q0o8B3CtaxQD2kfovrVjn",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Waterfall (feat. Richard Elliott)",
} as const satisfies Release
