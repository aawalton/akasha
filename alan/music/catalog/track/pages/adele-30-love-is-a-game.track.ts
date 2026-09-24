import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const adele30LoveIsAGame = {
  id: "01a0d52b-c25a-7cc5-8fe8-b533edf98229",
  type: "page-type/track",
  slug: "adele-30-love-is-a-game",
  ownLength: 6.7174,
  ownProgress: 0,
  partOfCollections: ["release/adele-30"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Love Is A Game",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/adele" }],
  trackKey: "loveisagame|4dpARuHxo51G3z768sgnrY|403044",
  song: "song/adele-love-is-a-game",
  carriedBy: [
    {
      release: "release/adele-30",
      discNumber: 1,
      position: 12,
      externalId: "2j3GxEsbNYNeEzz86wDY4J",
      externalLink: "https://open.spotify.com/track/2j3GxEsbNYNeEzz86wDY4J",
    },
  ],
} as const satisfies Track
