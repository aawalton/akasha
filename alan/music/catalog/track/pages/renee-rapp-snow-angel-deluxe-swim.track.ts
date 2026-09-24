import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const reneeRappSnowAngelDeluxeSwim = {
  id: "01a0caa9-0b31-7009-817a-8ab4298eead7",
  type: "page-type/track",
  slug: "renee-rapp-snow-angel-deluxe-swim",
  ownLength: 3.5011,
  ownProgress: 3.5011,
  partOfCollections: ["release/renee-rapp-snow-angel-deluxe"],
  status: "completed",
  unit: "unit/minutes",
  title: "Swim",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/renee-rapp" }],
  trackKey: "swim|2hUYKu1x0UZQXvzCmggvSn|210066",
  song: "song/renee-rapp-swim",
  carriedBy: [
    {
      release: "release/renee-rapp-snow-angel-deluxe",
      discNumber: 1,
      position: 15,
      externalId: "7K0ikRgR8HnGcTl73jkTO1",
      externalLink: "https://open.spotify.com/track/7K0ikRgR8HnGcTl73jkTO1",
    },
  ],
} as const satisfies Track
