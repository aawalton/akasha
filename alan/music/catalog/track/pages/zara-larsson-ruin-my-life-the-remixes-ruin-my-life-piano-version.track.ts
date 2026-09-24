import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonRuinMyLifeTheRemixesRuinMyLifePianoVersion = {
  id: "01a0aa7c-3f94-7e9f-8e3b-77f23b18d492",
  type: "page-type/track",
  slug: "zara-larsson-ruin-my-life-the-remixes-ruin-my-life-piano-version",
  ownLength: 3.168,
  ownProgress: 3.168,
  partOfCollections: ["release/zara-larsson-ruin-my-life-the-remixes"],
  status: "completed",
  unit: "unit/minutes",
  title: "Ruin My Life - Piano Version",
  trackType: "version",
  explicit: true,
  trackArtist: [{ artist: "artist/zara-larsson" }],
  trackKey: "ruinmylifepianoversion|1Xylc3o4UrD53lo9CvFvVg|190080",
  song: "song/zara-larsson-ruin-my-life",
  carriedBy: [
    {
      release: "release/zara-larsson-ruin-my-life-the-remixes",
      discNumber: 1,
      position: 4,
      externalId: "3DoXO1HcvDxCeucUCGDpUy",
      externalLink: "https://open.spotify.com/track/3DoXO1HcvDxCeucUCGDpUy",
    },
  ],
} as const satisfies Track
