import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2NewMoonShineNativeSon = {
  id: "01a0abeb-403d-78c2-a575-7d5469abfdde",
  type: "page-type/track",
  slug: "james-taylor-2-new-moon-shine-native-son",
  ownLength: 3.8011,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-new-moon-shine"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0mRhgBuZU3jjSMRlIIyV6W",
      externalLink: "https://open.spotify.com/track/0mRhgBuZU3jjSMRlIIyV6W",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Native Son",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "nativeson|0vn7UBvSQECKJm2817Yf1P|228066",
  song: "song/james-taylor-native-son",
} as const satisfies Track
