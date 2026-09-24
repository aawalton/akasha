import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaMotownMoreBlameItOnTheBoogie = {
  id: "01a0d52b-52de-7cea-b74f-5793b93490ea",
  type: "page-type/track",
  slug: "rockapella-motown-more-blame-it-on-the-boogie",
  ownLength: 3.2530166666666664,
  ownProgress: 0,
  partOfCollections: ["release/rockapella-motown-more"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Blame It on the Boogie",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "blameitontheboogie|1AFSUleuDTapVhm5zUf4ix|195181",
  song: "song/rockapella-blame-it-on-the-boogie",
  carriedBy: [
    {
      release: "release/rockapella-motown-more",
      discNumber: 1,
      position: 1,
      externalId: "1Hlzms2mxfZt7qBnWCq7Gr",
      externalLink: "https://open.spotify.com/track/1Hlzms2mxfZt7qBnWCq7Gr",
    },
  ],
} as const satisfies Track
