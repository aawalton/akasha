import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeWickedForGoodTheSoundtrackMarchOfTheWitchHunters = {
  id: "01a0a6c5-0e84-7d5a-94a3-cc3d5c6cb906",
  type: "page-type/track",
  slug: "ariana-grande-wicked-for-good-the-soundtrack-march-of-the-witch-hunters",
  ownLength: 2.603483333333333,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-wicked-for-good-the-soundtrack"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6kyPPsnaFuPX65bd36fdb8",
      externalLink: "https://open.spotify.com/track/6kyPPsnaFuPX65bd36fdb8",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "March of the Witch Hunters",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "3eLZo1bSslvsu0zNhtmMM4", artistName: "Wicked Movie Cast" },
    { externalId: "0yF5IqIHlPDti2mfZtHe3K", artistName: "Ethan Slater" },
  ],
  trackKey: "marchofthewitchhunters|0yF5IqIHlPDti2mfZtHe3K,3eLZo1bSslvsu0zNhtmMM4|156209",
  song: "song/ariana-grande-march-of-the-witch-hunters",
} as const satisfies Track
