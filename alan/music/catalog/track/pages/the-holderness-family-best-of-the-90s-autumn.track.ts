import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const theHoldernessFamilyBestOfThe90sAutumn = {
  id: "01a0b4c6-d134-77fe-9117-235f87e1c37f",
  type: "page-type/track",
  slug: "the-holderness-family-best-of-the-90s-autumn",
  ownLength: 3.480366666666667,
  ownProgress: 3.480366666666667,
  partOfCollections: ["release/the-holderness-family-best-of-the-90s"],
  status: "completed",
  unit: "unit/minutes",
  title: "Autumn",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-holderness-family" }],
  trackKey: "autumn|6tITG4T8LpC0msapZ4wXGA|208822",
  song: "song/the-holderness-family-autumn",
  carriedBy: [
    {
      release: "release/the-holderness-family-best-of-the-90s",
      discNumber: 1,
      position: 11,
      externalId: "1G5sDRJS4nBCqebKocFMCZ",
      externalLink: "https://open.spotify.com/track/1G5sDRJS4nBCqebKocFMCZ",
    },
  ],
} as const satisfies Track
