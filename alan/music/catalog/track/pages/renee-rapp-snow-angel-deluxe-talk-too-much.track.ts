import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const reneeRappSnowAngelDeluxeTalkTooMuch = {
  id: "01a0caa9-0b80-7f93-aaae-c612fee8546f",
  type: "page-type/track",
  slug: "renee-rapp-snow-angel-deluxe-talk-too-much",
  ownLength: 3.2779833333333332,
  ownProgress: 3.2779833333333332,
  partOfCollections: ["release/renee-rapp-snow-angel-deluxe", "release/renee-rapp-snow-angel"],
  status: "completed",
  unit: "unit/minutes",
  title: "Talk Too Much",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ externalId: "2hUYKu1x0UZQXvzCmggvSn", artistName: "Reneé Rapp" }],
  trackKey: "talktoomuch|2hUYKu1x0UZQXvzCmggvSn|196679",
  song: "song/renee-rapp-talk-too-much",
  carriedBy: [
    {
      release: "release/renee-rapp-snow-angel",
      discNumber: 1,
      position: 1,
      externalId: "1ekAgx1qOdnVoSlmkHghKq",
      externalLink: "https://open.spotify.com/track/1ekAgx1qOdnVoSlmkHghKq",
    },
    {
      release: "release/renee-rapp-snow-angel-deluxe",
      discNumber: 1,
      position: 1,
      externalId: "4JCv9Nx6Lx4cTwu7Aty5qd",
      externalLink: "https://open.spotify.com/track/4JCv9Nx6Lx4cTwu7Aty5qd",
    },
  ],
} as const satisfies Track
