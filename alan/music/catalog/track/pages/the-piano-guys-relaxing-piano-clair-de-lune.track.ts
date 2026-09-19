import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysRelaxingPianoClairDeLune = {
  id: "01a0afa1-cae6-7dd6-b21b-e5b181b2babd",
  type: "page-type/track",
  slug: "the-piano-guys-relaxing-piano-clair-de-lune",
  ownLength: 3.2080166666666665,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-relaxing-piano"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0ksqZyV5hgYw5QaPpBfAwv",
      externalLink: "https://open.spotify.com/track/0ksqZyV5hgYw5QaPpBfAwv",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Clair de Lune",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "clairdelune|0jW6R8CVyVohuUJVcuweDI|192481",
  song: "song/the-piano-guys-clair-de-lune",
} as const satisfies Track
