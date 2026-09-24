import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChristmasHymnsWeThreeKings = {
  id: "01a0b4c8-5480-76c7-b311-d2121df9672d",
  type: "page-type/track",
  slug: "paul-cardall-christmas-hymns-we-three-kings",
  ownLength: 5.372,
  ownProgress: 5.372,
  partOfCollections: ["release/paul-cardall-christmas-hymns"],
  status: "completed",
  unit: "unit/minutes",
  title: "We Three Kings",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "wethreekings|7FQRbf8gbKw8KZQZAJWxH2|322320",
  song: "song/paul-cardall-we-three-kings",
  carriedBy: [
    {
      release: "release/paul-cardall-christmas-hymns",
      discNumber: 1,
      position: 4,
      externalId: "4j7ifaHv7N34zbP3Gxo5mn",
      externalLink: "https://open.spotify.com/track/4j7ifaHv7N34zbP3Gxo5mn",
    },
  ],
} as const satisfies Track
