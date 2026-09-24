import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const adele19MakeYouFeelMyLove = {
  id: "01a0d52b-c259-7791-b324-d11e13946265",
  type: "page-type/track",
  slug: "adele-19-make-you-feel-my-love",
  ownLength: 3.534,
  ownProgress: 3.534,
  partOfCollections: ["release/adele-19", "release/adele-make-you-feel-my-love"],
  status: "completed",
  unit: "unit/minutes",
  title: "Make You Feel My Love",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/adele" }],
  trackKey: "makeyoufeelmylove|4dpARuHxo51G3z768sgnrY|212040",
  song: "song/adele-make-you-feel-my-love",
  carriedBy: [
    {
      release: "release/adele-19",
      discNumber: 1,
      position: 9,
      externalId: "5FgPwJ7Nh2FVmIXviKl2VF",
      externalLink: "https://open.spotify.com/track/5FgPwJ7Nh2FVmIXviKl2VF",
    },
    {
      release: "release/adele-make-you-feel-my-love",
      discNumber: 1,
      position: 1,
      externalId: "6otXN6h5J6e49Lvse5yCwD",
      externalLink: "https://open.spotify.com/track/6otXN6h5J6e49Lvse5yCwD",
    },
  ],
} as const satisfies Track
