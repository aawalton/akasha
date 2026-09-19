import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayVivaLaVidaOrDeathAndAllHisFriendsCemeteriesOfLondon = {
  id: "01a0b9ee-e298-7d09-af21-a8fa0660bdcc",
  type: "page-type/track",
  slug: "coldplay-viva-la-vida-or-death-and-all-his-friends-cemeteries-of-london",
  ownLength: 3.351766666666667,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-viva-la-vida-or-death-and-all-his-friends"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "03uqdEuopXPSCg4MvgA2fI",
      externalLink: "https://open.spotify.com/track/03uqdEuopXPSCg4MvgA2fI",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Cemeteries of London",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "cemeteriesoflondon|4gzpq5DPGxSnKTe4SA8HAU|201106",
} as const satisfies Track
