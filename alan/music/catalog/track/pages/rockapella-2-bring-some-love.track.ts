import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapella2BringSomeLove = {
  id: "01a0d52b-52da-7fc2-98bd-1ec7e288cc3a",
  type: "page-type/track",
  slug: "rockapella-2-bring-some-love",
  ownLength: 4.04955,
  ownProgress: 0,
  partOfCollections: ["release/rockapella-2"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Bring Some Love",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "bringsomelove|1AFSUleuDTapVhm5zUf4ix|242973",
  song: "song/rockapella-bring-some-love",
  carriedBy: [
    {
      release: "release/rockapella-2",
      discNumber: 1,
      position: 7,
      externalId: "1IqRFoHPfAle5xQACbAPbm",
      externalLink: "https://open.spotify.com/track/1IqRFoHPfAle5xQACbAPbm",
    },
  ],
} as const satisfies Track
