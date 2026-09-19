import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChristmasSilentNight = {
  id: "01a0b4c8-354a-7cc0-a621-655a42f3bacc",
  type: "page-type/track",
  slug: "paul-cardall-christmas-silent-night",
  ownLength: 5.309583333333333,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-christmas"],
  position: 13,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4LMbxeeC5L3ePo2d3R1rUd",
      externalLink: "https://open.spotify.com/track/4LMbxeeC5L3ePo2d3R1rUd",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Silent Night",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "silentnight|7FQRbf8gbKw8KZQZAJWxH2|318575",
  song: "song/celtic-woman-silent-night",
} as const satisfies Track
