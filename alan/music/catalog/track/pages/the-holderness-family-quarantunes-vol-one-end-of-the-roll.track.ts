import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const theHoldernessFamilyQuarantunesVolOneEndOfTheRoll = {
  id: "01a0b4c6-cbec-767f-9b2e-20f2adfd7361",
  type: "page-type/track",
  slug: "the-holderness-family-quarantunes-vol-one-end-of-the-roll",
  ownLength: 4.8518,
  ownProgress: 4.8518,
  partOfCollections: ["release/the-holderness-family-quarantunes-vol-one"],
  status: "completed",
  unit: "unit/minutes",
  title: "End of the Roll",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-holderness-family" }],
  trackKey: "endoftheroll|6tITG4T8LpC0msapZ4wXGA|291108",
  song: "song/the-holderness-family-end-of-the-roll",
  carriedBy: [
    {
      release: "release/the-holderness-family-quarantunes-vol-one",
      discNumber: 1,
      position: 11,
      externalId: "18aYUP185lK6fBqnsGCXWP",
      externalLink: "https://open.spotify.com/track/18aYUP185lK6fBqnsGCXWP",
    },
  ],
} as const satisfies Track
