import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys310Perfect = {
  id: "01a0afa2-0d38-7231-a416-99d0c74f5680",
  type: "page-type/track",
  slug: "the-piano-guys-3-10-perfect",
  ownLength: 5.141666666666667,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-10"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6qCPoeANdkJhsHlqyl37X7",
      externalLink: "https://open.spotify.com/track/6qCPoeANdkJhsHlqyl37X7",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Perfect",
  discNumber: 2,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "perfect|0jW6R8CVyVohuUJVcuweDI|308500",
} as const satisfies Track
