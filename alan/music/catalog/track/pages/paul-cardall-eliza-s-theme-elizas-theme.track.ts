import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallElizaSThemeElizasTheme = {
  id: "01a0b4c8-68c3-7501-a1ab-273d1f36c786",
  type: "page-type/track",
  slug: "paul-cardall-eliza-s-theme-elizas-theme",
  ownLength: 3.646933333333333,
  ownProgress: 3.646933333333333,
  partOfCollections: ["release/paul-cardall-eliza-s-theme", "release/paul-cardall-return-home"],
  status: "completed",
  unit: "unit/minutes",
  title: "Eliza's Theme",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "elizastheme|7FQRbf8gbKw8KZQZAJWxH2|218816",
  song: "song/paul-cardall-elizas-theme",
  carriedBy: [
    {
      release: "release/paul-cardall-eliza-s-theme",
      discNumber: 1,
      position: 1,
      externalId: "1GGltWuBsYTOHiTrRHjc8b",
      externalLink: "https://open.spotify.com/track/1GGltWuBsYTOHiTrRHjc8b",
    },
    {
      release: "release/paul-cardall-return-home",
      discNumber: 1,
      position: 7,
      externalId: "5dphfMsZtzOBHkDnAIOSZK",
      externalLink: "https://open.spotify.com/track/5dphfMsZtzOBHkDnAIOSZK",
    },
  ],
} as const satisfies Track
