import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const adele30OhMyGod = {
  id: "01a0d52b-c25a-7452-92b8-f187b21c0c03",
  type: "page-type/track",
  slug: "adele-30-oh-my-god",
  ownLength: 3.752466666666667,
  ownProgress: 3.752466666666667,
  partOfCollections: ["release/adele-30"],
  status: "completed",
  unit: "unit/minutes",
  title: "Oh My God",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/adele" }],
  trackKey: "ohmygod|4dpARuHxo51G3z768sgnrY|225148",
  song: "song/adele-oh-my-god",
  carriedBy: [
    {
      release: "release/adele-30",
      discNumber: 1,
      position: 5,
      externalId: "3Kkjo3cT83cw09VJyrLNwX",
      externalLink: "https://open.spotify.com/track/3Kkjo3cT83cw09VJyrLNwX",
    },
  ],
} as const satisfies Track
