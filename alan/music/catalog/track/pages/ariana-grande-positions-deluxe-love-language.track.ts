import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandePositionsDeluxeLoveLanguage = {
  id: "01a0a6c5-2005-7315-9be8-536804a1ca48",
  type: "page-type/track",
  slug: "ariana-grande-positions-deluxe-love-language",
  ownLength: 2.9976666666666665,
  ownProgress: 2.9976666666666665,
  partOfCollections: ["release/ariana-grande-positions-deluxe", "release/ariana-grande-positions"],
  status: "completed",
  unit: "unit/minutes",
  title: "love language",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/ariana-grande" }],
  trackKey: "lovelanguage|66CXWjxzNUsdJxJ2JdwvnR|179860",
  song: "song/ariana-grande-love-language",
  carriedBy: [
    {
      release: "release/ariana-grande-positions",
      discNumber: 1,
      position: 11,
      externalId: "6NYtLvyThMT0oALFdJFdzq",
      externalLink: "https://open.spotify.com/track/6NYtLvyThMT0oALFdJFdzq",
    },
    {
      release: "release/ariana-grande-positions-deluxe",
      discNumber: 1,
      position: 11,
      externalId: "4iIrJ94pkIEnGZWv1MhIRC",
      externalLink: "https://open.spotify.com/track/4iIrJ94pkIEnGZWv1MhIRC",
    },
  ],
} as const satisfies Track
