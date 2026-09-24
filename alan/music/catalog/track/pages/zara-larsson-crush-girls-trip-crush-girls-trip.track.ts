import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonCrushGirlsTripCrushGirlsTrip = {
  id: "01a0aa7c-2367-7f3d-a7f4-076582efeaa2",
  type: "page-type/track",
  slug: "zara-larsson-crush-girls-trip-crush-girls-trip",
  ownLength: 3.3524333333333334,
  ownProgress: 0,
  partOfCollections: [
    "release/zara-larsson-crush-girls-trip",
    "release/zara-larsson-midnight-sun-girls-trip",
  ],
  status: "not-started",
  unit: "unit/minutes",
  title: "Crush - Girls Trip",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/zara-larsson" }, { artistName: "Eli" }],
  trackKey: "crushgirlstrip|0phkgcpVchB7IJFJ7KcSP1,1Xylc3o4UrD53lo9CvFvVg|201146",
  song: "song/zara-larsson-crush-girls-trip",
  carriedBy: [
    {
      release: "release/zara-larsson-crush-girls-trip",
      discNumber: 1,
      position: 1,
      externalId: "3s0VYrnOnSNURobwyQvVw3",
      externalLink: "https://open.spotify.com/track/3s0VYrnOnSNURobwyQvVw3",
    },
    {
      release: "release/zara-larsson-midnight-sun-girls-trip",
      discNumber: 1,
      position: 5,
      externalId: "7GQf4BFganVt4GnLwdMztg",
      externalLink: "https://open.spotify.com/track/7GQf4BFganVt4GnLwdMztg",
    },
  ],
} as const satisfies Track
