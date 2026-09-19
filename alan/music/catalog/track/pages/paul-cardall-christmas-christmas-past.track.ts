import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChristmasChristmasPast = {
  id: "01a0b4c8-344d-7596-8d93-62462e85a485",
  type: "page-type/track",
  slug: "paul-cardall-christmas-christmas-past",
  ownLength: 4.335016666666666,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-christmas"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5GUFRGn6QwJu2p2chIcXGG",
      externalLink: "https://open.spotify.com/track/5GUFRGn6QwJu2p2chIcXGG",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Christmas Past",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "christmaspast|7FQRbf8gbKw8KZQZAJWxH2|260101",
  song: "song/paul-cardall-christmas-past",
} as const satisfies Track
