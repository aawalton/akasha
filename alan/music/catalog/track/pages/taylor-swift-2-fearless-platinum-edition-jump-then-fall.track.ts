import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2FearlessPlatinumEditionJumpThenFall = {
  id: "01a0ce86-9118-7384-8d23-1c1a9f2b0395",
  type: "page-type/track",
  slug: "taylor-swift-2-fearless-platinum-edition-jump-then-fall",
  ownLength: 3.9511,
  ownProgress: 3.9511,
  partOfCollections: ["release/taylor-swift-2-fearless-platinum-edition"],
  status: "completed",
  unit: "unit/minutes",
  title: "Jump Then Fall",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/taylor-swift" }],
  trackKey: "jumpthenfall|06HL4z0CvFAxyc27GXpf02|237066",
  song: "song/taylor-swift-jump-then-fall",
  carriedBy: [
    {
      release: "release/taylor-swift-2-fearless-platinum-edition",
      discNumber: 1,
      position: 1,
      externalId: "08gavXombT6KR0af88i9tA",
      externalLink: "https://open.spotify.com/track/08gavXombT6KR0af88i9tA",
    },
  ],
} as const satisfies Track
