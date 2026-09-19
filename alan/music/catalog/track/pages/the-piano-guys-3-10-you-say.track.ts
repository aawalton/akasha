import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys310YouSay = {
  id: "01a0afa2-0a4b-7acd-bb2a-8c592976fc43",
  type: "page-type/track",
  slug: "the-piano-guys-3-10-you-say",
  ownLength: 5.175666666666666,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-10"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0MosvoiclHAgGZKlpSqYBd",
      externalLink: "https://open.spotify.com/track/0MosvoiclHAgGZKlpSqYBd",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "You Say",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "yousay|0jW6R8CVyVohuUJVcuweDI|310540",
  song: "song/the-piano-guys-you-say",
} as const satisfies Track
