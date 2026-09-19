import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallDecemberSoloPianoThanksgivingSoloPianoVersion = {
  id: "01a0b4c8-2b86-7bc6-97fb-86546cae3e29",
  type: "page-type/track",
  slug: "paul-cardall-december-solo-piano-thanksgiving-solo-piano-version",
  ownLength: 2.3697666666666666,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-december-solo-piano"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4Mu3C8paeo7gtJvmPWf2NH",
      externalLink: "https://open.spotify.com/track/4Mu3C8paeo7gtJvmPWf2NH",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Thanksgiving - Solo Piano Version",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "thanksgivingsolopianoversion|7FQRbf8gbKw8KZQZAJWxH2|142186",
  song: "song/paul-cardall-thanksgiving",
} as const satisfies Track
