import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaJamsVol2TheMiddle = {
  id: "01a0d52b-52de-7b7a-b23e-0e6d779cc5b2",
  type: "page-type/track",
  slug: "rockapella-jams-vol-2-the-middle",
  ownLength: 3.3583833333333333,
  ownProgress: 3.3583833333333333,
  partOfCollections: ["release/rockapella-jams-vol-2"],
  status: "completed",
  unit: "unit/minutes",
  title: "The Middle",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "themiddle|1AFSUleuDTapVhm5zUf4ix|201503",
  song: "song/rockapella-the-middle",
  carriedBy: [
    {
      release: "release/rockapella-jams-vol-2",
      discNumber: 1,
      position: 6,
      externalId: "1reGqbW8Vbc5ReOzYe8weK",
      externalLink: "https://open.spotify.com/track/1reGqbW8Vbc5ReOzYe8weK",
    },
  ],
} as const satisfies Track
