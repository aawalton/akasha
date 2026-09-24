import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2FearlessPlatinumEditionTheOtherSideOfTheDoor = {
  id: "01a0ce86-91e5-7439-b192-4dfcde849dda",
  type: "page-type/track",
  slug: "taylor-swift-2-fearless-platinum-edition-the-other-side-of-the-door",
  ownLength: 3.96,
  ownProgress: 3.96,
  partOfCollections: ["release/taylor-swift-2-fearless-platinum-edition"],
  status: "completed",
  unit: "unit/minutes",
  title: "The Other Side Of The Door",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/taylor-swift" }],
  trackKey: "theothersideofthedoor|06HL4z0CvFAxyc27GXpf02|237600",
  song: "song/taylor-swift-the-other-side-of-the-door",
  carriedBy: [
    {
      release: "release/taylor-swift-2-fearless-platinum-edition",
      discNumber: 1,
      position: 6,
      externalId: "0xvsgzM8AtBtRHZm5rav8A",
      externalLink: "https://open.spotify.com/track/0xvsgzM8AtBtRHZm5rav8A",
    },
  ],
} as const satisfies Track
