import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraWhatHappenedToTheHeartDeluxeInvisibleWounds = {
  id: "01a0b637-ed9b-7715-b748-7d5b2c007f06",
  type: "page-type/track",
  slug: "aurora-what-happened-to-the-heart-deluxe-invisible-wounds",
  ownLength: 4.988433333333333,
  ownProgress: 4.988433333333333,
  partOfCollections: [
    "release/aurora-what-happened-to-the-heart-deluxe",
    "release/aurora-what-happened-to-the-heart",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Invisible Wounds",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/aurora" }],
  trackKey: "invisiblewounds|1WgXqy2Dd70QQOU7Ay074N|299306",
  song: "song/aurora-invisible-wounds",
  carriedBy: [
    {
      release: "release/aurora-what-happened-to-the-heart",
      discNumber: 1,
      position: 16,
      externalId: "6dk6rhO9mEwR0Je8pNvYI7",
      externalLink: "https://open.spotify.com/track/6dk6rhO9mEwR0Je8pNvYI7",
    },
    {
      release: "release/aurora-what-happened-to-the-heart-deluxe",
      discNumber: 1,
      position: 16,
      externalId: "5jWwelz2n1A6hGmqRz537G",
      externalLink: "https://open.spotify.com/track/5jWwelz2n1A6hGmqRz537G",
    },
  ],
} as const satisfies Track
