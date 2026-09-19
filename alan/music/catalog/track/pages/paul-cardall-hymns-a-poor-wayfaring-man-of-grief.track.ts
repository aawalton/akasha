import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallHymnsAPoorWayfaringManOfGrief = {
  id: "01a0b4c8-63ab-7518-ad09-5340dbcd9c5e",
  type: "page-type/track",
  slug: "paul-cardall-hymns-a-poor-wayfaring-man-of-grief",
  ownLength: 2.9873333333333334,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-hymns"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2Vq7TPmzLII0tzSzC5vohu",
      externalLink: "https://open.spotify.com/track/2Vq7TPmzLII0tzSzC5vohu",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "A Poor Wayfaring Man Of Grief",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "apoorwayfaringmanofgrief|7FQRbf8gbKw8KZQZAJWxH2|179240",
  song: "song/paul-cardall-a-poor-wayfaring-man-of-grief",
} as const satisfies Track
