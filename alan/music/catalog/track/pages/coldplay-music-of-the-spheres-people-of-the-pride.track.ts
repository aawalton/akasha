import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMusicOfTheSpheresPeopleOfThePride = {
  id: "01a0b9ee-cdea-7543-9d79-5601ddf34d9e",
  type: "page-type/track",
  slug: "coldplay-music-of-the-spheres-people-of-the-pride",
  ownLength: 3.6211,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-music-of-the-spheres"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5ophZLHA9mwSZhQSmboyDN",
      externalLink: "https://open.spotify.com/track/5ophZLHA9mwSZhQSmboyDN",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "People of The Pride",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "peopleofthepride|4gzpq5DPGxSnKTe4SA8HAU|217266",
} as const satisfies Track
