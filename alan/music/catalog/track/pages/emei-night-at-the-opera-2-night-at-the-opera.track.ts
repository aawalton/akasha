import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emeiNightAtTheOpera2NightAtTheOpera = {
  id: "01a0c43e-71f5-717e-9697-a93f93390d39",
  type: "page-type/track",
  slug: "emei-night-at-the-opera-2-night-at-the-opera",
  ownLength: 3.0798,
  ownProgress: 3.0798,
  partOfCollections: ["release/emei-night-at-the-opera-2"],
  position: 1,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4ikhbKiw9pKYkWitSR7M7u",
      externalLink: "https://open.spotify.com/track/4ikhbKiw9pKYkWitSR7M7u",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Night at the Opera",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7E2aQQjErJocovYFjYLzWU", artistName: "Emei" }],
  trackKey: "nightattheopera|7E2aQQjErJocovYFjYLzWU|184788",
  song: "song/emei-night-at-the-opera",
  carriedBy: [
    {
      release: "release/emei-night-at-the-opera-2",
      discNumber: 1,
      position: 1,
      externalId: "4ikhbKiw9pKYkWitSR7M7u",
      externalLink: "https://open.spotify.com/track/4ikhbKiw9pKYkWitSR7M7u",
    },
  ],
} as const satisfies Track
