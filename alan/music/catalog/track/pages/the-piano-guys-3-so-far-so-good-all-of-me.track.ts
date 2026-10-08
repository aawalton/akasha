import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3SoFarSoGoodAllOfMe = {
  id: "01a0afa2-1c3c-7a9a-a736-48c5df9c7c0b",
  type: "page-type/track",
  slug: "the-piano-guys-3-so-far-so-good-all-of-me",
  ownLength: 3.058666666666667,
  ownProgress: 3.058666666666667,
  partOfCollections: ["release/the-piano-guys-3-so-far-so-good"],
  status: "completed",
  unit: "unit/minutes",
  title: "All of Me",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "allofme|0jW6R8CVyVohuUJVcuweDI|183520",
  song: "song/the-piano-guys-all-of-me",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-so-far-so-good",
      discNumber: 1,
      position: 11,
      externalId: "6Br4baYuVyuNOmQRhuMqFI",
      externalLink: "https://open.spotify.com/track/6Br4baYuVyuNOmQRhuMqFI",
    },
  ],
  createdAt: "2026-09-17T13:50:31.996Z",
  updatedAt: "2026-09-24T20:01:24.000Z",
} as const satisfies Track
