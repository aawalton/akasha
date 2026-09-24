import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaSmilinHereComesTheSun = {
  id: "01a0d52b-52de-7a0b-989f-196dda807f2f",
  type: "page-type/track",
  slug: "rockapella-smilin-here-comes-the-sun",
  ownLength: 2.7554333333333334,
  ownProgress: 2.7554333333333334,
  partOfCollections: ["release/rockapella-smilin"],
  status: "completed",
  unit: "unit/minutes",
  title: "Here Comes the Sun",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "herecomesthesun|1AFSUleuDTapVhm5zUf4ix|165326",
  song: "song/rockapella-here-comes-the-sun",
  carriedBy: [
    {
      release: "release/rockapella-smilin",
      discNumber: 1,
      position: 3,
      externalId: "6oLEmHb66LKLGao0WAZoCa",
      externalLink: "https://open.spotify.com/track/6oLEmHb66LKLGao0WAZoCa",
    },
  ],
} as const satisfies Track
