import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const theHoldernessFamilyTheGreatestHitsVolOneInDaTub = {
  id: "01a0b4c6-d32c-7dc8-a3d4-3d8624fbe4c6",
  type: "page-type/track",
  slug: "the-holderness-family-the-greatest-hits-vol-one-in-da-tub",
  ownLength: 2.2008,
  ownProgress: 2.2008,
  partOfCollections: ["release/the-holderness-family-the-greatest-hits-vol-one"],
  status: "completed",
  unit: "unit/minutes",
  title: "In Da Tub",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-holderness-family" }],
  trackKey: "indatub|6tITG4T8LpC0msapZ4wXGA|132048",
  song: "song/the-holderness-family-in-da-tub",
  carriedBy: [
    {
      release: "release/the-holderness-family-the-greatest-hits-vol-one",
      discNumber: 1,
      position: 11,
      externalId: "2eFpMxUtCNBJyk4IjDvxkD",
      externalLink: "https://open.spotify.com/track/2eFpMxUtCNBJyk4IjDvxkD",
    },
  ],
} as const satisfies Track
