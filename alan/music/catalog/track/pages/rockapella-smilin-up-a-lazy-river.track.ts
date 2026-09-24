import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaSmilinUpALazyRiver = {
  id: "01a0d52b-52df-7fea-97ce-0b270e199aea",
  type: "page-type/track",
  slug: "rockapella-smilin-up-a-lazy-river",
  ownLength: 3.2182833333333334,
  ownProgress: 0,
  partOfCollections: ["release/rockapella-smilin"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Up a Lazy River",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "upalazyriver|1AFSUleuDTapVhm5zUf4ix|193097",
  song: "song/rockapella-up-a-lazy-river",
  carriedBy: [
    {
      release: "release/rockapella-smilin",
      discNumber: 1,
      position: 6,
      externalId: "3D3tWpkvhqvpFjtdnDuIVX",
      externalLink: "https://open.spotify.com/track/3D3tWpkvhqvpFjtdnDuIVX",
    },
  ],
} as const satisfies Track
