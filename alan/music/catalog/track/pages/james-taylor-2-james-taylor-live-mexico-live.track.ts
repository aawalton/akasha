import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2JamesTaylorLiveMexicoLive = {
  id: "01a0abeb-3cb2-7698-97e7-e6b91108358c",
  type: "page-type/track",
  slug: "james-taylor-2-james-taylor-live-mexico-live",
  ownLength: 3.2622166666666668,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-james-taylor-live"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "497tjyC7zWeUrU5kk193oK",
      externalLink: "https://open.spotify.com/track/497tjyC7zWeUrU5kk193oK",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Mexico - Live",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "mexicolive|0vn7UBvSQECKJm2817Yf1P|195733",
  song: "song/james-taylor-mexico",
} as const satisfies Track
