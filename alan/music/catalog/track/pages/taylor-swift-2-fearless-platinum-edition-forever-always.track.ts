import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2FearlessPlatinumEditionForeverAlways = {
  id: "01a0ce86-939e-7e1a-83ce-14be2c78c60a",
  type: "page-type/track",
  slug: "taylor-swift-2-fearless-platinum-edition-forever-always",
  ownLength: 3.75555,
  ownProgress: 0,
  partOfCollections: ["release/taylor-swift-2-fearless-platinum-edition"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Forever & Always",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "foreveralways|06HL4z0CvFAxyc27GXpf02|225333",
  song: "song/taylor-swift-forever-always",
  carriedBy: [
    {
      release: "release/taylor-swift-2-fearless-platinum-edition",
      discNumber: 1,
      position: 17,
      externalId: "1zxrcAk6eiytfavqriMcKT",
      externalLink: "https://open.spotify.com/track/1zxrcAk6eiytfavqriMcKT",
    },
  ],
} as const satisfies Track
