import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys310WhatMakesYouBeautiful = {
  id: "01a0afa2-0dad-7572-ad0d-732754896964",
  type: "page-type/track",
  slug: "the-piano-guys-3-10-what-makes-you-beautiful",
  ownLength: 2.873066666666667,
  ownProgress: 2.873066666666667,
  partOfCollections: [
    "release/the-piano-guys-3-10",
    "release/the-piano-guys-3-classical-love-romance",
    "release/the-piano-guys-3-pop-on-piano",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "What Makes You Beautiful",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "whatmakesyoubeautiful|0jW6R8CVyVohuUJVcuweDI|172384",
  song: "song/the-piano-guys-what-makes-you-beautiful",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-10",
      discNumber: 2,
      position: 13,
      externalId: "4k7mIczkdUKZmkgocdJRG9",
      externalLink: "https://open.spotify.com/track/4k7mIczkdUKZmkgocdJRG9",
    },
    {
      release: "release/the-piano-guys-3-classical-love-romance",
      discNumber: 1,
      position: 6,
      externalId: "68ORJuSODfxkdaocCdvOum",
      externalLink: "https://open.spotify.com/track/68ORJuSODfxkdaocCdvOum",
    },
    {
      release: "release/the-piano-guys-3-pop-on-piano",
      discNumber: 1,
      position: 11,
      externalId: "2RoADDwjnAQjzdnkTl6F7C",
      externalLink: "https://open.spotify.com/track/2RoADDwjnAQjzdnkTl6F7C",
    },
  ],
} as const satisfies Track
