import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallPeacefulPianoANewBeginning = {
  id: "01a0b4c8-3163-79d9-ac4f-8b360fd4ebfb",
  type: "page-type/track",
  slug: "paul-cardall-peaceful-piano-a-new-beginning",
  ownLength: 4.1128833333333334,
  ownProgress: 4.1128833333333334,
  partOfCollections: ["release/paul-cardall-peaceful-piano"],
  status: "completed",
  unit: "unit/minutes",
  title: "A New Beginning",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "anewbeginning|7FQRbf8gbKw8KZQZAJWxH2|246773",
  song: "song/paul-cardall-a-new-beginning",
  carriedBy: [
    {
      release: "release/paul-cardall-peaceful-piano",
      discNumber: 1,
      position: 1,
      externalId: "4rgjrRYSPna5mr7aautSTJ",
      externalLink: "https://open.spotify.com/track/4rgjrRYSPna5mr7aautSTJ",
    },
  ],
} as const satisfies Track
