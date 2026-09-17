import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3LiveLetItGoLive = {
  id: "01a0afa2-130f-7a9b-8cda-23f17f7e975a",
  type: "page-type/track",
  slug: "the-piano-guys-3-live-let-it-go-live",
  ownLength: 4.2184333333333335,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-live"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5ovrNcHReZB4EVbbtlShrY",
      externalLink: "https://open.spotify.com/track/5ovrNcHReZB4EVbbtlShrY",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Let It Go (Live)",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "letitgolive|0jW6R8CVyVohuUJVcuweDI|253106",
} as const satisfies Track
