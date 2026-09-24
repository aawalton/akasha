import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallBeThouMyVisionBeThouMyVision = {
  id: "01a0b4c8-67db-7a23-9176-492ca176f649",
  type: "page-type/track",
  slug: "paul-cardall-be-thou-my-vision-be-thou-my-vision",
  ownLength: 4.141666666666667,
  ownProgress: 4.141666666666667,
  partOfCollections: [
    "release/paul-cardall-be-thou-my-vision",
    "release/paul-cardall-grace-in-grief",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Be Thou My Vision",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "bethoumyvision|7FQRbf8gbKw8KZQZAJWxH2|248500",
  song: "song/paul-cardall-be-thou-my-vision",
  carriedBy: [
    {
      release: "release/paul-cardall-be-thou-my-vision",
      discNumber: 1,
      position: 1,
      externalId: "7uTkqzfkBDocIB8J89gNxa",
      externalLink: "https://open.spotify.com/track/7uTkqzfkBDocIB8J89gNxa",
    },
    {
      release: "release/paul-cardall-grace-in-grief",
      discNumber: 1,
      position: 7,
      externalId: "7waugxgzyhXxlwY7tOVKL4",
      externalLink: "https://open.spotify.com/track/7waugxgzyhXxlwY7tOVKL4",
    },
  ],
} as const satisfies Track
