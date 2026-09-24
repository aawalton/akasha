import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraAllMyDemonsGreetingMeAsAFriendDeluxeWinterBird = {
  id: "01a0b637-fc13-7679-b04e-48a00ca3252a",
  type: "page-type/track",
  slug: "aurora-all-my-demons-greeting-me-as-a-friend-deluxe-winter-bird",
  ownLength: 4.0691,
  ownProgress: 4.0691,
  partOfCollections: [
    "release/aurora-all-my-demons-greeting-me-as-a-friend-deluxe",
    "release/aurora-for-the-humans-who-take-long-walks-in-the-forest",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Winter Bird",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/aurora" }],
  trackKey: "winterbird|1WgXqy2Dd70QQOU7Ay074N|244146",
  song: "song/aurora-winter-bird",
  carriedBy: [
    {
      release: "release/aurora-all-my-demons-greeting-me-as-a-friend-deluxe",
      discNumber: 1,
      position: 5,
      externalId: "1D6Be4MHxIxz4i10GDjdnk",
      externalLink: "https://open.spotify.com/track/1D6Be4MHxIxz4i10GDjdnk",
    },
    {
      release: "release/aurora-for-the-humans-who-take-long-walks-in-the-forest",
      discNumber: 1,
      position: 4,
      externalId: "65YJcdYBAMw3RsvZK3TEvl",
      externalLink: "https://open.spotify.com/track/65YJcdYBAMw3RsvZK3TEvl",
    },
  ],
} as const satisfies Track
