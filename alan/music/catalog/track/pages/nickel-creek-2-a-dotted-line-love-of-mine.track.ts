import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const nickelCreek2ADottedLineLoveOfMine = {
  id: "01a0caa8-b1b3-74cb-bb40-029a10a3ad09",
  type: "page-type/track",
  slug: "nickel-creek-2-a-dotted-line-love-of-mine",
  ownLength: 4.705333333333333,
  ownProgress: 4.705333333333333,
  partOfCollections: ["release/nickel-creek-2-a-dotted-line"],
  status: "completed",
  unit: "unit/minutes",
  title: "Love of Mine",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/nickel-creek" }],
  trackKey: "loveofmine|3bcLBxvaI7GsBzGp3WHnwQ|282320",
  song: "song/nickel-creek-love-of-mine",
  carriedBy: [
    {
      release: "release/nickel-creek-2-a-dotted-line",
      discNumber: 1,
      position: 7,
      externalId: "4pgaL1i2BzFH4A7IIcGP8i",
      externalLink: "https://open.spotify.com/track/4pgaL1i2BzFH4A7IIcGP8i",
    },
  ],
} as const satisfies Track
