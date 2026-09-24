import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaComfortJoyMerryChristmasDarling = {
  id: "01a0d52b-52dc-7e5e-8398-6ef664415ca4",
  type: "page-type/track",
  slug: "rockapella-comfort-joy-merry-christmas-darling",
  ownLength: 4.060383333333333,
  ownProgress: 4.060383333333333,
  partOfCollections: ["release/rockapella-comfort-joy"],
  status: "completed",
  unit: "unit/minutes",
  title: "Merry Christmas Darling",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "merrychristmasdarling|1AFSUleuDTapVhm5zUf4ix|243623",
  song: "song/rockapella-merry-christmas-darling",
  carriedBy: [
    {
      release: "release/rockapella-comfort-joy",
      discNumber: 1,
      position: 3,
      externalId: "17T5bv3cuxvf2soo4XWyxN",
      externalLink: "https://open.spotify.com/track/17T5bv3cuxvf2soo4XWyxN",
    },
  ],
} as const satisfies Track
