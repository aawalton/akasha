import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallNewLifeLettingGo = {
  id: "01a0b4c8-3ec1-786f-ab1e-7c363818d134",
  type: "page-type/track",
  slug: "paul-cardall-new-life-letting-go",
  ownLength: 6.8868833333333335,
  ownProgress: 6.8868833333333335,
  partOfCollections: ["release/paul-cardall-new-life"],
  status: "completed",
  unit: "unit/minutes",
  title: "Letting Go",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "lettinggo|7FQRbf8gbKw8KZQZAJWxH2|413213",
  song: "song/paul-cardall-letting-go",
  carriedBy: [
    {
      release: "release/paul-cardall-new-life",
      discNumber: 1,
      position: 2,
      externalId: "44JW4kGBjjk2FHBCfG1omq",
      externalLink: "https://open.spotify.com/track/44JW4kGBjjk2FHBCfG1omq",
    },
  ],
} as const satisfies Track
