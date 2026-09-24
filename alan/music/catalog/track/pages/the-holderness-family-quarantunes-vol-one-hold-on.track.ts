import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const theHoldernessFamilyQuarantunesVolOneHoldOn = {
  id: "01a0b4c6-cae9-7ef2-b74e-50aad6ce92d0",
  type: "page-type/track",
  slug: "the-holderness-family-quarantunes-vol-one-hold-on",
  ownLength: 3.2357,
  ownProgress: 3.2357,
  partOfCollections: ["release/the-holderness-family-quarantunes-vol-one"],
  status: "completed",
  unit: "unit/minutes",
  title: "Hold On",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-holderness-family" }],
  trackKey: "holdon|6tITG4T8LpC0msapZ4wXGA|194142",
  song: "song/the-holderness-family-hold-on",
  carriedBy: [
    {
      release: "release/the-holderness-family-quarantunes-vol-one",
      discNumber: 1,
      position: 4,
      externalId: "3dZYv5XEkuaxPxbPsSLMUi",
      externalLink: "https://open.spotify.com/track/3dZYv5XEkuaxPxbPsSLMUi",
    },
  ],
} as const satisfies Track
