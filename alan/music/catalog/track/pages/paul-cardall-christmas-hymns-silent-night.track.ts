import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChristmasHymnsSilentNight = {
  id: "01a0b4c8-551e-7d53-aea8-120c302ce86c",
  type: "page-type/track",
  slug: "paul-cardall-christmas-hymns-silent-night",
  ownLength: 3.858216666666667,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-christmas-hymns"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6ce32lzE9vBNyXkdmsX17x",
      externalLink: "https://open.spotify.com/track/6ce32lzE9vBNyXkdmsX17x",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Silent Night",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "silentnight|7FQRbf8gbKw8KZQZAJWxH2|231493",
} as const satisfies Track
