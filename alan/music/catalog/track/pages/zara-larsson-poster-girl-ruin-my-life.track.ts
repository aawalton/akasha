import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonPosterGirlRuinMyLife = {
  id: "01a0aa7c-3167-7b04-8d8f-d1ed0d374576",
  type: "page-type/track",
  slug: "zara-larsson-poster-girl-ruin-my-life",
  ownLength: 3.1675166666666668,
  ownProgress: 3.1675166666666668,
  partOfCollections: [
    "release/zara-larsson-poster-girl",
    "release/zara-larsson-poster-girl-summer-edition",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Ruin My Life",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/zara-larsson" }],
  trackKey: "ruinmylife|1Xylc3o4UrD53lo9CvFvVg|190051",
  song: "song/zara-larsson-ruin-my-life",
  carriedBy: [
    {
      release: "release/zara-larsson-poster-girl",
      discNumber: 1,
      position: 9,
      externalId: "4nyY8oVjbX2d4qzlpiVM5n",
      externalLink: "https://open.spotify.com/track/4nyY8oVjbX2d4qzlpiVM5n",
    },
    {
      release: "release/zara-larsson-poster-girl-summer-edition",
      discNumber: 1,
      position: 9,
      externalId: "1i53E1c5niobtiwDceo0XD",
      externalLink: "https://open.spotify.com/track/1i53E1c5niobtiwDceo0XD",
    },
  ],
} as const satisfies Track
