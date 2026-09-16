import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylorJamesTaylorAtChristmasHereComesTheSun = {
  id: "01a0abeb-2dba-7f9c-b8c3-1a0e4f32b884",
  type: "page-type/track",
  slug: "james-taylor-james-taylor-at-christmas-here-comes-the-sun",
  ownLength: 2.8451,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-james-taylor-at-christmas"],
  position: 13,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5Uf5kobSFxwPZYlqAc4y7F",
      externalLink: "https://open.spotify.com/track/5Uf5kobSFxwPZYlqAc4y7F",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Here Comes the Sun",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" },
    { externalId: "5Dl3HXZjG6ZOWT5cV375lk", artistName: "Yo-Yo Ma" },
  ],
  trackKey: "herecomesthesun|0vn7UBvSQECKJm2817Yf1P,5Dl3HXZjG6ZOWT5cV375lk|170706",
} as const satisfies Track
