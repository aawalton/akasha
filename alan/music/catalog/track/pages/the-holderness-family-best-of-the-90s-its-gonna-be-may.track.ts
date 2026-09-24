import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const theHoldernessFamilyBestOfThe90sItsGonnaBeMay = {
  id: "01a0b4c6-d037-709e-bc78-127bf2f5ad0b",
  type: "page-type/track",
  slug: "the-holderness-family-best-of-the-90s-its-gonna-be-may",
  ownLength: 1.81725,
  ownProgress: 1.81725,
  partOfCollections: [
    "release/the-holderness-family-best-of-the-90s",
    "release/the-holderness-family-the-greatest-hits-vol-one",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "It's Gonna Be May",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-holderness-family" }],
  trackKey: "itsgonnabemay|6tITG4T8LpC0msapZ4wXGA|109035",
  song: "song/the-holderness-family-its-gonna-be-may",
  carriedBy: [
    {
      release: "release/the-holderness-family-best-of-the-90s",
      discNumber: 1,
      position: 4,
      externalId: "4DVvbcl2Grx8nowT4FMQzc",
      externalLink: "https://open.spotify.com/track/4DVvbcl2Grx8nowT4FMQzc",
    },
    {
      release: "release/the-holderness-family-the-greatest-hits-vol-one",
      discNumber: 1,
      position: 8,
      externalId: "6UrzAgrD4bg1Bauj0lQ3WE",
      externalLink: "https://open.spotify.com/track/6UrzAgrD4bg1Bauj0lQ3WE",
    },
  ],
} as const satisfies Track
