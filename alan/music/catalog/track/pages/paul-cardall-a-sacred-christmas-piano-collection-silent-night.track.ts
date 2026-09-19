import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallASacredChristmasPianoCollectionSilentNight = {
  id: "01a0b4c8-421e-7864-b0bd-228d8e884197",
  type: "page-type/track",
  slug: "paul-cardall-a-sacred-christmas-piano-collection-silent-night",
  ownLength: 5.46785,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-a-sacred-christmas-piano-collection"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4qlf2100Gwh5BxaAkMbsJI",
      externalLink: "https://open.spotify.com/track/4qlf2100Gwh5BxaAkMbsJI",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Silent Night",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "silentnight|7FQRbf8gbKw8KZQZAJWxH2|328071",
  song: "song/paul-cardall-silent-night",
} as const satisfies Track
