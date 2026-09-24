import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const alexandriaLustLust = {
  id: "01a0aa7a-8a72-775a-896f-b80f82d0c45f",
  type: "page-type/track",
  slug: "alexandria-lust-lust",
  ownLength: 1.9215666666666666,
  ownProgress: 1.9215666666666666,
  partOfCollections: ["release/alexandria-lust"],
  status: "completed",
  unit: "unit/minutes",
  title: "Lust",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artistName: "Marino" }, { artist: "artist/alexandria" }],
  trackKey: "lust|0SQG4wPVUlfbmbGQfqB47y,3HedFe4b2Nqeg1CEzmt6ZI|115294",
  song: "song/alexandria-lust",
  carriedBy: [
    {
      release: "release/alexandria-lust",
      discNumber: 1,
      position: 1,
      externalId: "2Tf3o75XkU0IS06tYgEuvn",
      externalLink: "https://open.spotify.com/track/2Tf3o75XkU0IS06tYgEuvn",
    },
  ],
} as const satisfies Track
