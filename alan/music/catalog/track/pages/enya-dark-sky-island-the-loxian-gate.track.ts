import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaDarkSkyIslandTheLoxianGate = {
  id: "01a14a1d-db4d-7314-a013-69cd12bdde8b",
  type: "page-type/track",
  slug: "enya-dark-sky-island-the-loxian-gate",
  ownLength: 3.5813333333333333,
  ownProgress: 0,
  partOfCollections: ["release/enya-dark-sky-island", "release/enya-dark-sky-island-deluxe"],
  status: "not-started",
  unit: "unit/minutes",
  title: "The Loxian Gate",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/enya" }],
  trackKey: "theloxiangate|6uothxMWeLWIhsGeF7cyo4|214880",
  song: "song/enya-the-loxian-gate",
  carriedBy: [
    {
      release: "release/enya-dark-sky-island",
      discNumber: 1,
      position: 10,
      externalId: "1eVosR3JxBfD0KDbKAK5ep",
      externalLink: "https://open.spotify.com/track/1eVosR3JxBfD0KDbKAK5ep",
    },
    {
      release: "release/enya-dark-sky-island-deluxe",
      discNumber: 1,
      position: 10,
      externalId: "3K2ZbkmBBGOZVv7DdOMmnp",
      externalLink: "https://open.spotify.com/track/3K2ZbkmBBGOZVv7DdOMmnp",
    },
  ],
  createdAt: "2026-10-17T13:47:13.085Z",
  updatedAt: "2026-10-17T13:47:13.085Z",
} as const satisfies Track
