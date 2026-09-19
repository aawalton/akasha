import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys310WhatMakesYouBeautiful = {
  id: "01a0afa2-0dad-7572-ad0d-732754896964",
  type: "page-type/track",
  slug: "the-piano-guys-3-10-what-makes-you-beautiful",
  ownLength: 2.873066666666667,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-10"],
  position: 13,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4k7mIczkdUKZmkgocdJRG9",
      externalLink: "https://open.spotify.com/track/4k7mIczkdUKZmkgocdJRG9",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "What Makes You Beautiful",
  discNumber: 2,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "whatmakesyoubeautiful|0jW6R8CVyVohuUJVcuweDI|172384",
  song: "song/the-piano-guys-what-makes-you-beautiful",
} as const satisfies Track
