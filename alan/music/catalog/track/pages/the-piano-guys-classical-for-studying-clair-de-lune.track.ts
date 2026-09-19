import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysClassicalForStudyingClairDeLune = {
  id: "01a0afa1-c83a-7557-b77f-d69c10e9cb5c",
  type: "page-type/track",
  slug: "the-piano-guys-classical-for-studying-clair-de-lune",
  ownLength: 3.2080166666666665,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-classical-for-studying"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0SiGnQTvxTOh8QsuV1DOQm",
      externalLink: "https://open.spotify.com/track/0SiGnQTvxTOh8QsuV1DOQm",
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
