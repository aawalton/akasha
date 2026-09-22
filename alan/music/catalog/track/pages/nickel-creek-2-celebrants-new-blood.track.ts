import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const nickelCreek2CelebrantsNewBlood = {
  id: "01a0caa8-a9ee-7984-a87e-d05c20ee8e6f",
  type: "page-type/track",
  slug: "nickel-creek-2-celebrants-new-blood",
  ownLength: 3.6743333333333332,
  ownProgress: 0,
  partOfCollections: ["release/nickel-creek-2-celebrants"],
  status: "not-started",
  unit: "unit/minutes",
  title: "New Blood",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "3bcLBxvaI7GsBzGp3WHnwQ", artistName: "Nickel Creek" }],
  trackKey: "newblood|3bcLBxvaI7GsBzGp3WHnwQ|220460",
  song: "song/nickel-creek-new-blood",
  carriedBy: [
    {
      release: "release/nickel-creek-2-celebrants",
      discNumber: 1,
      position: 16,
      externalId: "5C7f0AFM90qcivuGRFVuRt",
      externalLink: "https://open.spotify.com/track/5C7f0AFM90qcivuGRFVuRt",
    },
  ],
} as const satisfies Track
