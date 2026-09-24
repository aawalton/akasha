import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const adele25LoveInTheDark = {
  id: "01a0d52b-c25a-79dd-acd0-7209169987a9",
  type: "page-type/track",
  slug: "adele-25-love-in-the-dark",
  ownLength: 4.765583333333334,
  ownProgress: 0,
  partOfCollections: ["release/adele-25"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Love In The Dark",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/adele" }],
  trackKey: "loveinthedark|4dpARuHxo51G3z768sgnrY|285935",
  song: "song/adele-love-in-the-dark",
  carriedBy: [
    {
      release: "release/adele-25",
      discNumber: 1,
      position: 8,
      externalId: "7B5Npv8NjjTCzk8PLpU66h",
      externalLink: "https://open.spotify.com/track/7B5Npv8NjjTCzk8PLpU66h",
    },
  ],
} as const satisfies Track
