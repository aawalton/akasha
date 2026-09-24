import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraAllMyDemonsGreetingMeAsAFriendDeluxeUnderTheWater = {
  id: "01a0b637-fcfd-7a9b-8682-2dd82ad19568",
  type: "page-type/track",
  slug: "aurora-all-my-demons-greeting-me-as-a-friend-deluxe-under-the-water",
  ownLength: 4.41,
  ownProgress: 4.41,
  partOfCollections: [
    "release/aurora-all-my-demons-greeting-me-as-a-friend-deluxe",
    "release/aurora-for-the-metal-people",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Under the Water",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/aurora" }],
  trackKey: "underthewater|1WgXqy2Dd70QQOU7Ay074N|264600",
  song: "song/aurora-under-the-water",
  carriedBy: [
    {
      release: "release/aurora-all-my-demons-greeting-me-as-a-friend-deluxe",
      discNumber: 1,
      position: 11,
      externalId: "1x7yqEoQel8Gu6F7thDbCQ",
      externalLink: "https://open.spotify.com/track/1x7yqEoQel8Gu6F7thDbCQ",
    },
    {
      release: "release/aurora-for-the-metal-people",
      discNumber: 1,
      position: 1,
      externalId: "2NNWSsNGoJI57E1l0DwiXY",
      externalLink: "https://open.spotify.com/track/2NNWSsNGoJI57E1l0DwiXY",
    },
  ],
} as const satisfies Track
