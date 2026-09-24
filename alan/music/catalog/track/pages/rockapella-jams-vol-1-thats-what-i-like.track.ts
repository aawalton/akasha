import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaJamsVol1ThatsWhatILike = {
  id: "01a0d52b-52dd-7684-bbc9-5b7d1fbefda1",
  type: "page-type/track",
  slug: "rockapella-jams-vol-1-thats-what-i-like",
  ownLength: 1.13715,
  ownProgress: 0,
  partOfCollections: ["release/rockapella-jams-vol-1"],
  status: "not-started",
  unit: "unit/minutes",
  title: "That's What I Like",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "thatswhatilike|1AFSUleuDTapVhm5zUf4ix|68229",
  song: "song/rockapella-thats-what-i-like",
  carriedBy: [
    {
      release: "release/rockapella-jams-vol-1",
      discNumber: 1,
      position: 4,
      externalId: "0tiUFEBjC4gzDdNr2gSIac",
      externalLink: "https://open.spotify.com/track/0tiUFEBjC4gzDdNr2gSIac",
    },
  ],
} as const satisfies Track
