import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const reneeRappSnowAngelDeluxeTheWeddingSong = {
  id: "01a0caa9-0c7a-77cb-8fd5-cbda56dc4ded",
  type: "page-type/track",
  slug: "renee-rapp-snow-angel-deluxe-the-wedding-song",
  ownLength: 3.05565,
  ownProgress: 3.05565,
  partOfCollections: ["release/renee-rapp-snow-angel-deluxe", "release/renee-rapp-snow-angel"],
  status: "completed",
  unit: "unit/minutes",
  title: "The Wedding Song",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/renee-rapp" }],
  trackKey: "theweddingsong|2hUYKu1x0UZQXvzCmggvSn|183339",
  song: "song/renee-rapp-the-wedding-song",
  carriedBy: [
    {
      release: "release/renee-rapp-snow-angel",
      discNumber: 1,
      position: 7,
      externalId: "3UNTCTqSGhVaaMQvBty1q6",
      externalLink: "https://open.spotify.com/track/3UNTCTqSGhVaaMQvBty1q6",
    },
    {
      release: "release/renee-rapp-snow-angel-deluxe",
      discNumber: 1,
      position: 7,
      externalId: "3n25SR42Ds1Iuryk4iOlzT",
      externalLink: "https://open.spotify.com/track/3n25SR42Ds1Iuryk4iOlzT",
    },
  ],
} as const satisfies Track
