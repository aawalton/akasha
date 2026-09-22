import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylorJamesTaylorAtChristmasHereComesTheSun = {
  id: "01a0abeb-2dba-7f9c-b8c3-1a0e4f32b884",
  type: "page-type/track",
  slug: "james-taylor-james-taylor-at-christmas-here-comes-the-sun",
  grade: "A",
  ownLength: 2.8451,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-james-taylor-at-christmas"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Here Comes the Sun",
  trackType: "studio",
  explicit: false,
  trackArtist: [
    { externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" },
    { externalId: "5Dl3HXZjG6ZOWT5cV375lk", artistName: "Yo-Yo Ma" },
  ],
  trackKey: "herecomesthesun|0vn7UBvSQECKJm2817Yf1P,5Dl3HXZjG6ZOWT5cV375lk|170706",
  song: "song/coldplay-here-comes-the-sun",
  carriedBy: [
    {
      release: "release/james-taylor-james-taylor-at-christmas",
      discNumber: 1,
      position: 13,
      externalId: "5Uf5kobSFxwPZYlqAc4y7F",
      externalLink: "https://open.spotify.com/track/5Uf5kobSFxwPZYlqAc4y7F",
    },
  ],
} as const satisfies Track
