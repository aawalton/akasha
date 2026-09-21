import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallDecemberSoloPianoFirstSnowSoloPianoVersion = {
  id: "01a0b4c8-2b43-7cce-8642-d8ccf2f72a3a",
  type: "page-type/track",
  slug: "paul-cardall-december-solo-piano-first-snow-solo-piano-version",
  ownLength: 3.3711,
  ownProgress: 3.3711,
  partOfCollections: ["release/paul-cardall-december-solo-piano"],
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5cUzxCRdZFpVxirheShJxP",
      externalLink: "https://open.spotify.com/track/5cUzxCRdZFpVxirheShJxP",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "First Snow - Solo Piano Version",
  trackType: "version",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "firstsnowsolopianoversion|7FQRbf8gbKw8KZQZAJWxH2|202266",
  song: "song/paul-cardall-first-snow",
  carriedBy: [
    {
      release: "release/paul-cardall-december-solo-piano",
      discNumber: 1,
      position: 4,
      externalId: "5cUzxCRdZFpVxirheShJxP",
      externalLink: "https://open.spotify.com/track/5cUzxCRdZFpVxirheShJxP",
    },
  ],
} as const satisfies Track
