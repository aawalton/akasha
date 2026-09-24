import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChristmasSonOfGod = {
  id: "01a0b4c8-3502-7df7-9e17-7f6854570165",
  type: "page-type/track",
  slug: "paul-cardall-christmas-son-of-god",
  ownLength: 4.57275,
  ownProgress: 4.57275,
  partOfCollections: ["release/paul-cardall-christmas"],
  status: "completed",
  unit: "unit/minutes",
  title: "Son of God",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }, { artistName: "Patrice Tipoki" }],
  trackKey: "sonofgod|77dRSdJKCKDOen5hjPYO0D,7FQRbf8gbKw8KZQZAJWxH2|274365",
  song: "song/paul-cardall-son-of-god",
  carriedBy: [
    {
      release: "release/paul-cardall-christmas",
      discNumber: 1,
      position: 11,
      externalId: "4KQ8C57YW73VaMLXDK8Z0n",
      externalLink: "https://open.spotify.com/track/4KQ8C57YW73VaMLXDK8Z0n",
    },
  ],
} as const satisfies Track
