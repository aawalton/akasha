import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaBangTellMeWhatYouWant = {
  id: "01a0d52b-52db-7690-9915-521d78d06b75",
  type: "page-type/track",
  slug: "rockapella-bang-tell-me-what-you-want",
  ownLength: 2.85825,
  ownProgress: 0,
  partOfCollections: ["release/rockapella-bang"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Tell Me What You Want",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "tellmewhatyouwant|1AFSUleuDTapVhm5zUf4ix|171495",
  song: "song/rockapella-tell-me-what-you-want",
  carriedBy: [
    {
      release: "release/rockapella-bang",
      discNumber: 1,
      position: 4,
      externalId: "2vw324PJZLubpjMSgxYh3B",
      externalLink: "https://open.spotify.com/track/2vw324PJZLubpjMSgxYh3B",
    },
  ],
} as const satisfies Track
