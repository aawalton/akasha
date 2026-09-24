import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const reneeRappSnowAngelDeluxeGeminiMoon = {
  id: "01a0caa9-0bfd-7562-9114-1d08f4ccfb3d",
  type: "page-type/track",
  slug: "renee-rapp-snow-angel-deluxe-gemini-moon",
  ownLength: 2.6763166666666667,
  ownProgress: 2.6763166666666667,
  partOfCollections: ["release/renee-rapp-snow-angel-deluxe", "release/renee-rapp-snow-angel"],
  status: "completed",
  unit: "unit/minutes",
  title: "Gemini Moon",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/renee-rapp" }],
  trackKey: "geminimoon|2hUYKu1x0UZQXvzCmggvSn|160579",
  song: "song/renee-rapp-gemini-moon",
  carriedBy: [
    {
      release: "release/renee-rapp-snow-angel",
      discNumber: 1,
      position: 4,
      externalId: "5125gTidGz2jJSSDpUvdMt",
      externalLink: "https://open.spotify.com/track/5125gTidGz2jJSSDpUvdMt",
    },
    {
      release: "release/renee-rapp-snow-angel-deluxe",
      discNumber: 1,
      position: 4,
      externalId: "3FqcxdZGpxjRIKXZphKffk",
      externalLink: "https://open.spotify.com/track/3FqcxdZGpxjRIKXZphKffk",
    },
  ],
} as const satisfies Track
