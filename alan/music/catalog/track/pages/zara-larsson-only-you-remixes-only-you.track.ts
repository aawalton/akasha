import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonOnlyYouRemixesOnlyYou = {
  id: "01a0aa7c-3ff4-70fa-9a3d-90fd60ebb457",
  type: "page-type/track",
  slug: "zara-larsson-only-you-remixes-only-you",
  ownLength: 3.7060333333333335,
  ownProgress: 3.7060333333333335,
  partOfCollections: ["release/zara-larsson-only-you-remixes", "release/zara-larsson-so-good"],
  status: "completed",
  unit: "unit/minutes",
  title: "Only You",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/zara-larsson" }],
  trackKey: "onlyyou|1Xylc3o4UrD53lo9CvFvVg|222362",
  song: "song/zara-larsson-only-you",
  carriedBy: [
    {
      release: "release/zara-larsson-only-you-remixes",
      discNumber: 1,
      position: 1,
      externalId: "1XkKixc9NTzC2HXHPlijRk",
      externalLink: "https://open.spotify.com/track/1XkKixc9NTzC2HXHPlijRk",
    },
    {
      release: "release/zara-larsson-so-good",
      discNumber: 1,
      position: 6,
      externalId: "5SleX0NFeODNY7Xenal3gr",
      externalLink: "https://open.spotify.com/track/5SleX0NFeODNY7Xenal3gr",
    },
  ],
} as const satisfies Track
