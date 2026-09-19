import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayVivaLaVidaProspektSMarchEditionDeathAndAllHisFriends = {
  id: "01a0b9ee-e108-7482-ab88-7a5cb4aa221d",
  type: "page-type/track",
  slug: "coldplay-viva-la-vida-prospekt-s-march-edition-death-and-all-his-friends",
  ownLength: 6.314216666666667,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-viva-la-vida-prospekt-s-march-edition"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6BwzZV2z4CS6n85sqmk0BU",
      externalLink: "https://open.spotify.com/track/6BwzZV2z4CS6n85sqmk0BU",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Death and All His Friends",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "deathandallhisfriends|4gzpq5DPGxSnKTe4SA8HAU|378853",
  song: "song/coldplay-death-and-all-his-friends",
} as const satisfies Track
