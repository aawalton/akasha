import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const thePianoGuys3DoYouHearWhatIHear = {
  id: "01a0676a-d71c-701d-8019-fb7a693c2f31",
  type: "page-type/release",
  slug: "the-piano-guys-3-do-you-hear-what-i-hear",
  ownLength: 0,
  ownProgress: 0,
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
  createdAt: "2026-09-03T13:17:30.268Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
