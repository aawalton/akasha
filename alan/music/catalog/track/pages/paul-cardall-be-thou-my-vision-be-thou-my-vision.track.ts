import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallBeThouMyVisionBeThouMyVision = {
  id: "01a0b4c8-67db-7a23-9176-492ca176f649",
  type: "page-type/track",
  slug: "paul-cardall-be-thou-my-vision-be-thou-my-vision",
  ownLength: 4.141666666666667,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-be-thou-my-vision"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7uTkqzfkBDocIB8J89gNxa",
      externalLink: "https://open.spotify.com/track/7uTkqzfkBDocIB8J89gNxa",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Be Thou My Vision",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "bethoumyvision|7FQRbf8gbKw8KZQZAJWxH2|248500",
  song: "song/paul-cardall-be-thou-my-vision",
} as const satisfies Track
