import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallSacredPianoGraciesTheme = {
  id: "01a0b4c8-4736-7263-a90d-64241f6273f0",
  type: "page-type/track",
  slug: "paul-cardall-sacred-piano-gracies-theme",
  ownLength: 4.32265,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-sacred-piano"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0UFK7SQY17RqV3WiexKiOz",
      externalLink: "https://open.spotify.com/track/0UFK7SQY17RqV3WiexKiOz",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Gracie's Theme",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "graciestheme|7FQRbf8gbKw8KZQZAJWxH2|259359",
  song: "song/paul-cardall-gracies-theme",
} as const satisfies Track
