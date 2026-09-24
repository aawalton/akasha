import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallNewLifeGraciesTheme = {
  id: "01a0b4c8-3f23-7207-9ed1-858a997dc799",
  type: "page-type/track",
  slug: "paul-cardall-new-life-gracies-theme",
  ownLength: 5.694883333333333,
  ownProgress: 5.694883333333333,
  partOfCollections: ["release/paul-cardall-new-life"],
  status: "completed",
  unit: "unit/minutes",
  title: "Gracie's Theme",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "graciestheme|7FQRbf8gbKw8KZQZAJWxH2|341693",
  song: "song/paul-cardall-gracies-theme",
  carriedBy: [
    {
      release: "release/paul-cardall-new-life",
      discNumber: 1,
      position: 5,
      externalId: "6Pii4GK1kaVUeoxmBB0rUr",
      externalLink: "https://open.spotify.com/track/6Pii4GK1kaVUeoxmBB0rUr",
    },
  ],
} as const satisfies Track
