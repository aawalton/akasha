import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3WeddingSeasonSweetChildOMine = {
  id: "01a0afa1-d886-76ba-9965-78bbf239fd10",
  type: "page-type/track",
  slug: "the-piano-guys-3-wedding-season-sweet-child-o-mine",
  ownLength: 4.329166666666667,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-wedding-season"],
  position: 19,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4UgC41unZZbIlLTCGtChqX",
      externalLink: "https://open.spotify.com/track/4UgC41unZZbIlLTCGtChqX",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Sweet Child o' Mine",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "sweetchildomine|0jW6R8CVyVohuUJVcuweDI|259750",
  song: "song/the-piano-guys-sweet-child-o-mine",
} as const satisfies Track
