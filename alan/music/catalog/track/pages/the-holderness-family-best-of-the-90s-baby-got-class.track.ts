import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const theHoldernessFamilyBestOfThe90sBabyGotClass = {
  id: "01a0b4c6-d1b2-77ad-b42d-291473f158b6",
  type: "page-type/track",
  slug: "the-holderness-family-best-of-the-90s-baby-got-class",
  ownLength: 2.2008,
  ownProgress: 2.2008,
  partOfCollections: [
    "release/the-holderness-family-best-of-the-90s",
    "release/the-holderness-family-the-greatest-hits-vol-one",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Baby Got Class",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-holderness-family" }],
  trackKey: "babygotclass|6tITG4T8LpC0msapZ4wXGA|132048",
  song: "song/the-holderness-family-baby-got-class",
  carriedBy: [
    {
      release: "release/the-holderness-family-best-of-the-90s",
      discNumber: 1,
      position: 15,
      externalId: "1OEr2MIxehsPIiQnjdDpcE",
      externalLink: "https://open.spotify.com/track/1OEr2MIxehsPIiQnjdDpcE",
    },
    {
      release: "release/the-holderness-family-the-greatest-hits-vol-one",
      discNumber: 1,
      position: 6,
      externalId: "7x5Is4tQFjbWP9qpw32P3x",
      externalLink: "https://open.spotify.com/track/7x5Is4tQFjbWP9qpw32P3x",
    },
  ],
} as const satisfies Track
