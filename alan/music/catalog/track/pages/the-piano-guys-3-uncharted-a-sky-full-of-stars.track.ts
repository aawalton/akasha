import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3UnchartedASkyFullOfStars = {
  id: "01a0afa2-1176-7039-89af-ab37b961480f",
  type: "page-type/track",
  slug: "the-piano-guys-3-uncharted-a-sky-full-of-stars",
  ownLength: 4.133333333333334,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-uncharted"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7k0KOplnvXm5GUkw7RXYg0",
      externalLink: "https://open.spotify.com/track/7k0KOplnvXm5GUkw7RXYg0",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "A Sky Full of Stars",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "askyfullofstars|0jW6R8CVyVohuUJVcuweDI|248000",
  song: "song/the-piano-guys-a-sky-full-of-stars",
} as const satisfies Track
