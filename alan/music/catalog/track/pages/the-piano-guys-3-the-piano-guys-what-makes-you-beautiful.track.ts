import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3ThePianoGuysWhatMakesYouBeautiful = {
  id: "01a0afa2-1a47-7175-b5c5-312867ca128a",
  type: "page-type/track",
  slug: "the-piano-guys-3-the-piano-guys-what-makes-you-beautiful",
  ownLength: 2.96145,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-the-piano-guys"],
  position: 13,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "78sadk681kINGMrxXw1iDl",
      externalLink: "https://open.spotify.com/track/78sadk681kINGMrxXw1iDl",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "What Makes You Beautiful",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "whatmakesyoubeautiful|0jW6R8CVyVohuUJVcuweDI|177687",
} as const satisfies Track
