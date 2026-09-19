import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3WhatWasIMadeForWhatWasIMadeFor = {
  id: "01a0afa1-e4ce-7e13-a64a-4d4ffb14d40f",
  type: "page-type/track",
  slug: "the-piano-guys-3-what-was-i-made-for-what-was-i-made-for",
  ownLength: 4.180616666666666,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-what-was-i-made-for"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5bSTsb0QAGyEfga4E65DY8",
      externalLink: "https://open.spotify.com/track/5bSTsb0QAGyEfga4E65DY8",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "What Was I Made For?",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "whatwasimadefor|0jW6R8CVyVohuUJVcuweDI|250837",
  song: "song/billie-eilish-what-was-i-made-for",
} as const satisfies Track
