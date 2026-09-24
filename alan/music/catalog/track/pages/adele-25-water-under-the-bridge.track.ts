import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const adele25WaterUnderTheBridge = {
  id: "01a0d52b-c25a-7d70-8e59-98f5701fbb16",
  type: "page-type/track",
  slug: "adele-25-water-under-the-bridge",
  ownLength: 4.007316666666667,
  ownProgress: 4.007316666666667,
  partOfCollections: ["release/adele-25", "release/adele-water-under-the-bridge"],
  status: "completed",
  unit: "unit/minutes",
  title: "Water Under the Bridge",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/adele" }],
  trackKey: "waterunderthebridge|4dpARuHxo51G3z768sgnrY|240439",
  song: "song/adele-water-under-the-bridge",
  carriedBy: [
    {
      release: "release/adele-25",
      discNumber: 1,
      position: 6,
      externalId: "4jL6WWKFDqCOPo2hC3VhSS",
      externalLink: "https://open.spotify.com/track/4jL6WWKFDqCOPo2hC3VhSS",
    },
    {
      release: "release/adele-water-under-the-bridge",
      discNumber: 1,
      position: 1,
      externalId: "3rTF4xvF6xKI9WiLg8LFWn",
      externalLink: "https://open.spotify.com/track/3rTF4xvF6xKI9WiLg8LFWn",
    },
  ],
} as const satisfies Track
