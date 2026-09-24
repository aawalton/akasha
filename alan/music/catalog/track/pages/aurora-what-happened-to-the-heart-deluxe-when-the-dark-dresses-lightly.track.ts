import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraWhatHappenedToTheHeartDeluxeWhenTheDarkDressesLightly = {
  id: "01a0b637-ec68-7968-b814-fcf27fa85b65",
  type: "page-type/track",
  slug: "aurora-what-happened-to-the-heart-deluxe-when-the-dark-dresses-lightly",
  ownLength: 3.58,
  ownProgress: 3.58,
  partOfCollections: [
    "release/aurora-what-happened-to-the-heart-deluxe",
    "release/aurora-what-happened-to-the-heart",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "When The Dark Dresses Lightly",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/aurora" }],
  trackKey: "whenthedarkdresseslightly|1WgXqy2Dd70QQOU7Ay074N|214800",
  song: "song/aurora-when-the-dark-dresses-lightly",
  carriedBy: [
    {
      release: "release/aurora-what-happened-to-the-heart",
      discNumber: 1,
      position: 8,
      externalId: "2YFjDyaJerhB4q4NO2sJlq",
      externalLink: "https://open.spotify.com/track/2YFjDyaJerhB4q4NO2sJlq",
    },
    {
      release: "release/aurora-what-happened-to-the-heart-deluxe",
      discNumber: 1,
      position: 8,
      externalId: "5oiQhhz11SXKO8jMlGGAEw",
      externalLink: "https://open.spotify.com/track/5oiQhhz11SXKO8jMlGGAEw",
    },
  ],
} as const satisfies Track
