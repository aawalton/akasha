import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaSmilinFlamingoSing = {
  id: "01a0d52b-52de-7d0a-9e81-e006fca858e5",
  type: "page-type/track",
  slug: "rockapella-smilin-flamingo-sing",
  ownLength: 3.7693666666666665,
  ownProgress: 3.7693666666666665,
  partOfCollections: ["release/rockapella-smilin"],
  status: "completed",
  unit: "unit/minutes",
  title: "Flamingo Sing",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "flamingosing|1AFSUleuDTapVhm5zUf4ix|226162",
  song: "song/rockapella-flamingo-sing",
  carriedBy: [
    {
      release: "release/rockapella-smilin",
      discNumber: 1,
      position: 2,
      externalId: "5NgWlsq2SRVEbyJUAmkYGb",
      externalLink: "https://open.spotify.com/track/5NgWlsq2SRVEbyJUAmkYGb",
    },
  ],
  createdAt: "2026-09-24T20:46:21.406Z",
  updatedAt: "2026-09-24T21:00:26.000Z",
} as const satisfies Track
