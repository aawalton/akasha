import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3LullabyClairDeLune = {
  id: "01a0afa1-dd68-7d00-b713-907fd9daa5fc",
  type: "page-type/track",
  slug: "the-piano-guys-3-lullaby-clair-de-lune",
  ownLength: 3.2080166666666665,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-lullaby"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5rJxlS00sApDRlU20qKV8B",
      externalLink: "https://open.spotify.com/track/5rJxlS00sApDRlU20qKV8B",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Clair de Lune",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "clairdelune|0jW6R8CVyVohuUJVcuweDI|192481",
  song: "song/the-piano-guys-clair-de-lune",
} as const satisfies Track
