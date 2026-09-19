import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallDecemberPianoStringEnsembleSleepingFlowers = {
  id: "01a0b4c8-2d49-7728-8e1e-84e1764085bb",
  type: "page-type/track",
  slug: "paul-cardall-december-piano-string-ensemble-sleeping-flowers",
  ownLength: 3.7091,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-december-piano-string-ensemble"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0I4B7VNDyv1kazcvnQFl5c",
      externalLink: "https://open.spotify.com/track/0I4B7VNDyv1kazcvnQFl5c",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Sleeping Flowers",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "sleepingflowers|7FQRbf8gbKw8KZQZAJWxH2|222546",
  song: "song/paul-cardall-sleeping-flowers",
} as const satisfies Track
