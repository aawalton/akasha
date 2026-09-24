import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonSoGoodSymphonyFeatZaraLarsson = {
  id: "01a0aa7c-33ff-76d0-902b-ade5748ad035",
  type: "page-type/track",
  slug: "zara-larsson-so-good-symphony-feat-zara-larsson",
  ownLength: 3.54255,
  ownProgress: 3.54255,
  partOfCollections: ["release/zara-larsson-so-good"],
  status: "completed",
  unit: "unit/minutes",
  title: "Symphony (feat. Zara Larsson)",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artistName: "Clean Bandit" }, { artist: "artist/zara-larsson" }],
  trackKey: "symphonyfeatzaralarsson|1Xylc3o4UrD53lo9CvFvVg,6MDME20pz9RveH9rEXvrOM|212553",
  song: "song/zara-larsson-symphony",
  carriedBy: [
    {
      release: "release/zara-larsson-so-good",
      discNumber: 1,
      position: 15,
      externalId: "4SPLWgCPoKwULz2UTM8TKg",
      externalLink: "https://open.spotify.com/track/4SPLWgCPoKwULz2UTM8TKg",
    },
  ],
} as const satisfies Track
