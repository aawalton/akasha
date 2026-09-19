import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3AMillionDreamsAMillionDreams = {
  id: "01a0afa2-1dd0-7f1a-8f39-7061a7a5e807",
  type: "page-type/track",
  slug: "the-piano-guys-3-a-million-dreams-a-million-dreams",
  ownLength: 4.76395,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-a-million-dreams"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3Jj5Jho1NVrUXi9j6Nunf1",
      externalLink: "https://open.spotify.com/track/3Jj5Jho1NVrUXi9j6Nunf1",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "A Million Dreams",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "0qKRRwXdVtrVIEdPFr8vvo", artistName: "Benj Pasek" },
    { externalId: "1A2uplrPcSu6bqDaRp7Xs9", artistName: "Justin Paul" },
    { externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" },
  ],
  trackKey:
    "amilliondreams|0jW6R8CVyVohuUJVcuweDI,0qKRRwXdVtrVIEdPFr8vvo,1A2uplrPcSu6bqDaRp7Xs9|285837",
  song: "song/the-piano-guys-a-million-dreams",
} as const satisfies Track
