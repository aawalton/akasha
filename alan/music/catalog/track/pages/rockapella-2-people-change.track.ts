import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapella2PeopleChange = {
  id: "01a0d52b-52da-73a8-b1cd-68bea3d3264a",
  type: "page-type/track",
  slug: "rockapella-2-people-change",
  ownLength: 3.59135,
  ownProgress: 0,
  partOfCollections: ["release/rockapella-2"],
  status: "not-started",
  unit: "unit/minutes",
  title: "People Change",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "peoplechange|1AFSUleuDTapVhm5zUf4ix|215481",
  song: "song/rockapella-people-change",
  carriedBy: [
    {
      release: "release/rockapella-2",
      discNumber: 1,
      position: 2,
      externalId: "2YOHTPzLmhkrDarCZT9KLv",
      externalLink: "https://open.spotify.com/track/2YOHTPzLmhkrDarCZT9KLv",
    },
  ],
} as const satisfies Track
