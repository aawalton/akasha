import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaJamsVol2LookWhatYouMadeMeDo = {
  id: "01a0d52b-52de-73f5-a41e-2026252c3603",
  type: "page-type/track",
  slug: "rockapella-jams-vol-2-look-what-you-made-me-do",
  ownLength: 1.6483,
  ownProgress: 0,
  partOfCollections: ["release/rockapella-jams-vol-2"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Look What You Made Me Do",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "lookwhatyoumademedo|1AFSUleuDTapVhm5zUf4ix|98898",
  song: "song/rockapella-look-what-you-made-me-do",
  carriedBy: [
    {
      release: "release/rockapella-jams-vol-2",
      discNumber: 1,
      position: 9,
      externalId: "1g6p3OIONHrRhtZeahLaVl",
      externalLink: "https://open.spotify.com/track/1g6p3OIONHrRhtZeahLaVl",
    },
  ],
} as const satisfies Track
