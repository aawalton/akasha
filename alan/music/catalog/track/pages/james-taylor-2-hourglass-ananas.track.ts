import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2HourglassAnanas = {
  id: "01a0abeb-3a6b-7aad-9293-e276a14c663c",
  type: "page-type/track",
  slug: "james-taylor-2-hourglass-ananas",
  ownLength: 5.706666666666667,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-hourglass"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6QIH6LDpJwtu6Wt3kkrco2",
      externalLink: "https://open.spotify.com/track/6QIH6LDpJwtu6Wt3kkrco2",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Ananas",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "ananas|0vn7UBvSQECKJm2817Yf1P|342400",
  song: "song/james-taylor-ananas",
} as const satisfies Track
