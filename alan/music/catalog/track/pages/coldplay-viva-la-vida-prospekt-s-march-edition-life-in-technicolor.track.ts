import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayVivaLaVidaProspektSMarchEditionLifeInTechnicolor = {
  id: "01a0b9ee-df8e-7ad6-883c-c4d93b6ccc53",
  type: "page-type/track",
  slug: "coldplay-viva-la-vida-prospekt-s-march-edition-life-in-technicolor",
  ownLength: 2.48555,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-viva-la-vida-prospekt-s-march-edition"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "21E3m3rXhgWjQTo32scmfy",
      externalLink: "https://open.spotify.com/track/21E3m3rXhgWjQTo32scmfy",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Life in Technicolor",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "lifeintechnicolor|4gzpq5DPGxSnKTe4SA8HAU|149133",
  song: "song/coldplay-life-in-technicolor",
} as const satisfies Track
