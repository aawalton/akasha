import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaJamsVol1SirGotalot = {
  id: "01a0d52b-52dd-78ee-9dc8-4cff8097f3b6",
  type: "page-type/track",
  slug: "rockapella-jams-vol-1-sir-gotalot",
  ownLength: 3.20115,
  ownProgress: 3.20115,
  partOfCollections: ["release/rockapella-jams-vol-1", "release/rockapella-sir-gotalot"],
  status: "completed",
  unit: "unit/minutes",
  title: "Sir GotALot",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "sirgotalot|1AFSUleuDTapVhm5zUf4ix|192069",
  song: "song/rockapella-sir-gotalot",
  carriedBy: [
    {
      release: "release/rockapella-jams-vol-1",
      discNumber: 1,
      position: 15,
      externalId: "1UYccVT9TZhoXFKICAg7w0",
      externalLink: "https://open.spotify.com/track/1UYccVT9TZhoXFKICAg7w0",
    },
    {
      release: "release/rockapella-sir-gotalot",
      discNumber: 1,
      position: 1,
      externalId: "2zGMUqQSZfTZRPgeqczGeC",
      externalLink: "https://open.spotify.com/track/2zGMUqQSZfTZRPgeqczGeC",
    },
  ],
} as const satisfies Track
