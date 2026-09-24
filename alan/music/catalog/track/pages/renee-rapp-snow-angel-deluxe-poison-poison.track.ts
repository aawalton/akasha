import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const reneeRappSnowAngelDeluxePoisonPoison = {
  id: "01a0caa9-0bd7-7f6c-b708-9e9066f1bbf8",
  type: "page-type/track",
  slug: "renee-rapp-snow-angel-deluxe-poison-poison",
  ownLength: 3.19085,
  ownProgress: 3.19085,
  partOfCollections: ["release/renee-rapp-snow-angel-deluxe", "release/renee-rapp-snow-angel"],
  status: "completed",
  unit: "unit/minutes",
  title: "Poison Poison",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/renee-rapp" }],
  trackKey: "poisonpoison|2hUYKu1x0UZQXvzCmggvSn|191451",
  song: "song/renee-rapp-poison-poison",
  carriedBy: [
    {
      release: "release/renee-rapp-snow-angel",
      discNumber: 1,
      position: 3,
      externalId: "7e1arKsP7vPjdwssVPHgZk",
      externalLink: "https://open.spotify.com/track/7e1arKsP7vPjdwssVPHgZk",
    },
    {
      release: "release/renee-rapp-snow-angel-deluxe",
      discNumber: 1,
      position: 3,
      externalId: "104LhNPVXwPlS9U7jh5xiH",
      externalLink: "https://open.spotify.com/track/104LhNPVXwPlS9U7jh5xiH",
    },
  ],
} as const satisfies Track
