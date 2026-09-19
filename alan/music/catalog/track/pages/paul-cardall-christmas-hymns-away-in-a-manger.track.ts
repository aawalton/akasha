import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChristmasHymnsAwayInAManger = {
  id: "01a0b4c8-54a7-7213-9df2-d619a7702905",
  type: "page-type/track",
  slug: "paul-cardall-christmas-hymns-away-in-a-manger",
  ownLength: 4.394933333333333,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-christmas-hymns"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0t33iTv2bHVcYUeLmZ08uQ",
      externalLink: "https://open.spotify.com/track/0t33iTv2bHVcYUeLmZ08uQ",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Away in A Manger",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "awayinamanger|7FQRbf8gbKw8KZQZAJWxH2|263696",
  song: "song/celtic-woman-away-in-a-manger",
} as const satisfies Track
