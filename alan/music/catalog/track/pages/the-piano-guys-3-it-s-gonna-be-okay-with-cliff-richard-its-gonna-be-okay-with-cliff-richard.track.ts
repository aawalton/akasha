import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3ItSGonnaBeOkayWithCliffRichardItsGonnaBeOkayWithCliffRichard = {
  id: "01a0afa2-1e88-7821-8da0-cd3f6ff34a2e",
  type: "page-type/track",
  slug: "the-piano-guys-3-it-s-gonna-be-okay-with-cliff-richard-its-gonna-be-okay-with-cliff-richard",
  ownLength: 3.5039833333333332,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-it-s-gonna-be-okay-with-cliff-richard"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3REkhLKgMUOEqmfnIpvVZs",
      externalLink: "https://open.spotify.com/track/3REkhLKgMUOEqmfnIpvVZs",
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
  trackKey: "itsgonnabeokaywithcliffrichard|0jW6R8CVyVohuUJVcuweDI,2nvKpWcP8etYTq4JrRiUiy|210239",
  song: "song/the-piano-guys-its-gonna-be-okay",
} as const satisfies Track
