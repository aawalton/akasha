import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayEverydayLifeOrphans = {
  id: "01a0b9ee-d039-7a52-b7f4-ec9b9eb6aa96",
  type: "page-type/track",
  slug: "coldplay-everyday-life-orphans",
  ownLength: 3.2922166666666666,
  ownProgress: 3.2922166666666666,
  partOfCollections: ["release/coldplay-everyday-life", "release/coldplay-orphans-arabesque"],
  status: "completed",
  unit: "unit/minutes",
  title: "Orphans",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "orphans|4gzpq5DPGxSnKTe4SA8HAU|197533",
  song: "song/coldplay-orphans",
  carriedBy: [
    {
      release: "release/coldplay-everyday-life",
      discNumber: 2,
      position: 2,
      externalId: "03T4ttRCiLXST6MZjeMwmR",
      externalLink: "https://open.spotify.com/track/03T4ttRCiLXST6MZjeMwmR",
    },
    {
      release: "release/coldplay-orphans-arabesque",
      discNumber: 1,
      position: 1,
      externalId: "6YQlCOZnlFmqeciAh58fDE",
      externalLink: "https://open.spotify.com/track/6YQlCOZnlFmqeciAh58fDE",
    },
  ],
} as const satisfies Track
