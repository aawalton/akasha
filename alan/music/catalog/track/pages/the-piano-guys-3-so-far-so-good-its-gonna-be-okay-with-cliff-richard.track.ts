import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3SoFarSoGoodItsGonnaBeOkayWithCliffRichard = {
  id: "01a0afa2-1ad7-75b8-b3a9-5ccad4b7a6dc",
  type: "page-type/track",
  slug: "the-piano-guys-3-so-far-so-good-its-gonna-be-okay-with-cliff-richard",
  ownLength: 3.5361166666666666,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-so-far-so-good"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7L2cpA03KxuGpk8mVfXbpi",
      externalLink: "https://open.spotify.com/track/7L2cpA03KxuGpk8mVfXbpi",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "(It's Gonna Be) Okay (with Cliff Richard)",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" },
    { externalId: "2nvKpWcP8etYTq4JrRiUiy", artistName: "Cliff Richard" },
  ],
  trackKey: "itsgonnabeokaywithcliffrichard|0jW6R8CVyVohuUJVcuweDI,2nvKpWcP8etYTq4JrRiUiy|212167",
  song: "song/the-piano-guys-its-gonna-be-okay",
} as const satisfies Track
