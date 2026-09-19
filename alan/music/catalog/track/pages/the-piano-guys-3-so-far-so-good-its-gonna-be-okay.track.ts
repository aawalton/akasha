import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3SoFarSoGoodItsGonnaBeOkay = {
  id: "01a0afa2-1c8b-71a3-9200-66e67ebe18aa",
  type: "page-type/track",
  slug: "the-piano-guys-3-so-far-so-good-its-gonna-be-okay",
  ownLength: 3.5133833333333335,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-so-far-so-good"],
  position: 13,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0haid7kVyi8UKd5b5ElSOU",
      externalLink: "https://open.spotify.com/track/0haid7kVyi8UKd5b5ElSOU",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "(It's Gonna Be) Okay",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" },
    { externalId: "1RTHEDesKGANeFDXyDJBQU", artistName: "Al van der Beek" },
  ],
  trackKey: "itsgonnabeokay|0jW6R8CVyVohuUJVcuweDI,1RTHEDesKGANeFDXyDJBQU|210803",
  song: "song/the-piano-guys-its-gonna-be-okay",
} as const satisfies Track
