import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const thePianoGuysThePianoGuysSoloSessionsJonSchmidtVol1 = {
  id: "01a0afa1-c489-75c9-a909-0071a9486d98",
  type: "page-type/release",
  slug: "the-piano-guys-the-piano-guys-solo-sessions-jon-schmidt-vol-1",
  ownLength: 32.44161666666667,
  ownProgress: 0,
  partOfCollections: ["artist/the-piano-guys"],
  position: 0,
  publishedAt: "2026-07-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5F06FrZhd0Pt8f9HngWQV9",
      externalLink: "https://open.spotify.com/album/5F06FrZhd0Pt8f9HngWQV9",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "The Piano Guys Solo Sessions: Jon Schmidt, Vol. 1",
} as const satisfies Release
