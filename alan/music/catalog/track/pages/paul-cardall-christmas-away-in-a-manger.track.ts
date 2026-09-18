import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChristmasAwayInAManger = {
  id: "01a0b4c8-3526-7e87-8f57-1afd011aedc7",
  type: "page-type/track",
  slug: "paul-cardall-christmas-away-in-a-manger",
  ownLength: 4.394933333333333,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-christmas"],
  position: 12,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3Cw9vV3b8G6ftnoD23SpwN",
      externalLink: "https://open.spotify.com/track/3Cw9vV3b8G6ftnoD23SpwN",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Away in a Manger",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "awayinamanger|7FQRbf8gbKw8KZQZAJWxH2|263696",
} as const satisfies Track
