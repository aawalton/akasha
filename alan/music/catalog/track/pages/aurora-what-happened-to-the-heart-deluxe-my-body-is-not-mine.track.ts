import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraWhatHappenedToTheHeartDeluxeMyBodyIsNotMine = {
  id: "01a0b637-ed74-7443-a247-5c7e3aca7b21",
  type: "page-type/track",
  slug: "aurora-what-happened-to-the-heart-deluxe-my-body-is-not-mine",
  ownLength: 4.022883333333334,
  ownProgress: 4.022883333333334,
  partOfCollections: [
    "release/aurora-what-happened-to-the-heart-deluxe",
    "release/aurora-what-happened-to-the-heart",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "My Body Is Not Mine",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/aurora" }],
  trackKey: "mybodyisnotmine|1WgXqy2Dd70QQOU7Ay074N|241373",
  song: "song/aurora-my-body-is-not-mine",
  carriedBy: [
    {
      release: "release/aurora-what-happened-to-the-heart",
      discNumber: 1,
      position: 15,
      externalId: "4lr9e261UuIx3lMgQtdxGy",
      externalLink: "https://open.spotify.com/track/4lr9e261UuIx3lMgQtdxGy",
    },
    {
      release: "release/aurora-what-happened-to-the-heart-deluxe",
      discNumber: 1,
      position: 15,
      externalId: "6BSh9jkMJ9I3KUm9KVBEKz",
      externalLink: "https://open.spotify.com/track/6BSh9jkMJ9I3KUm9KVBEKz",
    },
  ],
} as const satisfies Track
