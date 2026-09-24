import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraWhatHappenedToTheHeartDeluxeTheBlade = {
  id: "01a0b637-ed4e-7a2e-bb3b-a68407e0297e",
  type: "page-type/track",
  slug: "aurora-what-happened-to-the-heart-deluxe-the-blade",
  ownLength: 4.55355,
  ownProgress: 4.55355,
  partOfCollections: [
    "release/aurora-what-happened-to-the-heart-deluxe",
    "release/aurora-what-happened-to-the-heart",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "The Blade",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/aurora" }],
  trackKey: "theblade|1WgXqy2Dd70QQOU7Ay074N|273213",
  song: "song/aurora-the-blade",
  carriedBy: [
    {
      release: "release/aurora-what-happened-to-the-heart",
      discNumber: 1,
      position: 14,
      externalId: "5fe1NA1aVk79oV6R5mSxHI",
      externalLink: "https://open.spotify.com/track/5fe1NA1aVk79oV6R5mSxHI",
    },
    {
      release: "release/aurora-what-happened-to-the-heart-deluxe",
      discNumber: 1,
      position: 14,
      externalId: "3Ogn2lsQoQpGJWUhWDDpDa",
      externalLink: "https://open.spotify.com/track/3Ogn2lsQoQpGJWUhWDDpDa",
    },
  ],
} as const satisfies Track
