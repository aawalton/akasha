import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaJamsVol2WinterThings = {
  id: "01a0d52b-52de-7091-b6e2-c965e793ca4b",
  type: "page-type/track",
  slug: "rockapella-jams-vol-2-winter-things",
  ownLength: 2.8511166666666665,
  ownProgress: 0,
  partOfCollections: ["release/rockapella-jams-vol-2"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Winter Things",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }, { artistName: "Nat_Len" }],
  trackKey: "winterthings|1AFSUleuDTapVhm5zUf4ix,5uYidyRv8rFaxg34A9KrRP|171067",
  song: "song/rockapella-winter-things",
  carriedBy: [
    {
      release: "release/rockapella-jams-vol-2",
      discNumber: 1,
      position: 13,
      externalId: "38mmihjElE0EXLvz0GlIyT",
      externalLink: "https://open.spotify.com/track/38mmihjElE0EXLvz0GlIyT",
    },
  ],
} as const satisfies Track
