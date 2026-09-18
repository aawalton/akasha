import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheBrokenMiracleFindingMyWay = {
  id: "01a0b4c8-3083-77e7-9a8d-1187578edac9",
  type: "page-type/track",
  slug: "paul-cardall-the-broken-miracle-finding-my-way",
  ownLength: 4.384666666666667,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-the-broken-miracle"],
  position: 14,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7L7yuHRdDG5B5QHus6wSwb",
      externalLink: "https://open.spotify.com/track/7L7yuHRdDG5B5QHus6wSwb",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Finding My Way",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "findingmyway|7FQRbf8gbKw8KZQZAJWxH2|263080",
} as const satisfies Track
