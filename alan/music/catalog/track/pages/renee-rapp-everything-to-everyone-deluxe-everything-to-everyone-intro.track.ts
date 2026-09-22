import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const reneeRappEverythingToEveryoneDeluxeEverythingToEveryoneIntro = {
  id: "01a0caa9-1044-7748-88db-421a69128f02",
  type: "page-type/track",
  slug: "renee-rapp-everything-to-everyone-deluxe-everything-to-everyone-intro",
  ownLength: 1.1376833333333334,
  ownProgress: 0,
  partOfCollections: [
    "release/renee-rapp-everything-to-everyone-deluxe",
    "release/renee-rapp-everything-to-everyone",
  ],
  status: "not-started",
  unit: "unit/minutes",
  title: "Everything To Everyone (Intro)",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "2hUYKu1x0UZQXvzCmggvSn", artistName: "Reneé Rapp" }],
  trackKey: "everythingtoeveryoneintro|2hUYKu1x0UZQXvzCmggvSn|68261",
  song: "song/renee-rapp-everything-to-everyone-intro",
  carriedBy: [
    {
      release: "release/renee-rapp-everything-to-everyone",
      discNumber: 1,
      position: 1,
      externalId: "21Uc575UbMARrDbyOYG4w8",
      externalLink: "https://open.spotify.com/track/21Uc575UbMARrDbyOYG4w8",
    },
    {
      release: "release/renee-rapp-everything-to-everyone-deluxe",
      discNumber: 1,
      position: 1,
      externalId: "6Gjv0oeHKgFBEOV1g2UjrM",
      externalLink: "https://open.spotify.com/track/6Gjv0oeHKgFBEOV1g2UjrM",
    },
  ],
} as const satisfies Track
