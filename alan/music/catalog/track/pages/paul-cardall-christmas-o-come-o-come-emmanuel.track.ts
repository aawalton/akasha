import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChristmasOComeOComeEmmanuel = {
  id: "01a0b4c8-33de-774a-ab1a-61143b13c1ef",
  type: "page-type/track",
  slug: "paul-cardall-christmas-o-come-o-come-emmanuel",
  ownLength: 4.2462,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-christmas"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0MAMeuBzELX6ydhBMg1eEO",
      externalLink: "https://open.spotify.com/track/0MAMeuBzELX6ydhBMg1eEO",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "O Come, O Come, Emmanuel",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "ocomeocomeemmanuel|7FQRbf8gbKw8KZQZAJWxH2|254772",
  song: "song/paul-cardall-o-come-o-come-emmanuel",
} as const satisfies Track
