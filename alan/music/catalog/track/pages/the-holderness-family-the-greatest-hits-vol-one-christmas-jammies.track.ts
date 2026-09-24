import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const theHoldernessFamilyTheGreatestHitsVolOneChristmasJammies = {
  id: "01a0b4c6-d1d3-76b0-980e-da3cd829576c",
  type: "page-type/track",
  slug: "the-holderness-family-the-greatest-hits-vol-one-christmas-jammies",
  ownLength: 3.367183333333333,
  ownProgress: 3.367183333333333,
  partOfCollections: ["release/the-holderness-family-the-greatest-hits-vol-one"],
  status: "completed",
  unit: "unit/minutes",
  title: "Christmas Jammies",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-holderness-family" }],
  trackKey: "christmasjammies|6tITG4T8LpC0msapZ4wXGA|202031",
  song: "song/the-holderness-family-christmas-jammies",
  carriedBy: [
    {
      release: "release/the-holderness-family-the-greatest-hits-vol-one",
      discNumber: 1,
      position: 1,
      externalId: "3ME26Zye2lrCm6GS6Ji3l9",
      externalLink: "https://open.spotify.com/track/3ME26Zye2lrCm6GS6Ji3l9",
    },
  ],
} as const satisfies Track
