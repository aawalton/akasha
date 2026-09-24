import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const theHoldernessFamilyQuarantunesVolOneOneWeek = {
  id: "01a0b4c6-caa4-71ca-a94c-3f9f0aebf8a4",
  type: "page-type/track",
  slug: "the-holderness-family-quarantunes-vol-one-one-week",
  ownLength: 2.3166166666666665,
  ownProgress: 2.3166166666666665,
  partOfCollections: ["release/the-holderness-family-quarantunes-vol-one"],
  status: "completed",
  unit: "unit/minutes",
  title: "One Week",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-holderness-family" }],
  trackKey: "oneweek|6tITG4T8LpC0msapZ4wXGA|138997",
  song: "song/the-holderness-family-one-week",
  carriedBy: [
    {
      release: "release/the-holderness-family-quarantunes-vol-one",
      discNumber: 1,
      position: 2,
      externalId: "3CYqrx6ZEgdp7LddqVHzbW",
      externalLink: "https://open.spotify.com/track/3CYqrx6ZEgdp7LddqVHzbW",
    },
  ],
} as const satisfies Track
