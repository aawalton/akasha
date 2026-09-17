import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3SoFarSoGoodWhatMakesYouBeautiful = {
  id: "01a0afa2-1c61-7408-8fca-26b73fdb7c9a",
  type: "page-type/track",
  slug: "the-piano-guys-3-so-far-so-good-what-makes-you-beautiful",
  ownLength: 2.89555,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-so-far-so-good"],
  position: 12,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4vzGWOgAnkFCEwvNRPjZY0",
      externalLink: "https://open.spotify.com/track/4vzGWOgAnkFCEwvNRPjZY0",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "What Makes You Beautiful",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "whatmakesyoubeautiful|0jW6R8CVyVohuUJVcuweDI|173733",
} as const satisfies Track
