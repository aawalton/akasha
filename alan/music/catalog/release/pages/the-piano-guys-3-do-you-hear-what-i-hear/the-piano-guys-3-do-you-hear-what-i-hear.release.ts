import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const thePianoGuys3DoYouHearWhatIHear = {
  id: "01a0676a-d71c-701d-8019-fb7a693c2f31",
  type: "page-type/release",
  slug: "the-piano-guys-3-do-you-hear-what-i-hear",
  ownLength: 3.33695,
  ownProgress: 3.33695,
  partOfCollections: ["artist/the-piano-guys"],
  position: 0,
  publishedAt: "2022-11-16",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2wplYaCritBrDuKcmZDjKJ",
      externalLink: "https://open.spotify.com/album/2wplYaCritBrDuKcmZDjKJ",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Do You Hear What I Hear?",
} as const satisfies Release
