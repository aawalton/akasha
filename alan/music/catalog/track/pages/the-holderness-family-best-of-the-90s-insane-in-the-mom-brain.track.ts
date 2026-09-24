import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const theHoldernessFamilyBestOfThe90sInsaneInTheMomBrain = {
  id: "01a0b4c6-cff3-77c3-8633-aa3f222b8f07",
  type: "page-type/track",
  slug: "the-holderness-family-best-of-the-90s-insane-in-the-mom-brain",
  ownLength: 1.57735,
  ownProgress: 1.57735,
  partOfCollections: ["release/the-holderness-family-best-of-the-90s"],
  status: "completed",
  unit: "unit/minutes",
  title: "Insane in the Mom Brain",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-holderness-family" }],
  trackKey: "insaneinthemombrain|6tITG4T8LpC0msapZ4wXGA|94641",
  song: "song/the-holderness-family-insane-in-the-mom-brain",
  carriedBy: [
    {
      release: "release/the-holderness-family-best-of-the-90s",
      discNumber: 1,
      position: 2,
      externalId: "7mxl7yQPkzQdYyvLaqyn87",
      externalLink: "https://open.spotify.com/track/7mxl7yQPkzQdYyvLaqyn87",
    },
  ],
} as const satisfies Track
