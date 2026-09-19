import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallFaithfulScarboroughFair = {
  id: "01a0b4c8-59c3-7040-83a4-133647c9cec2",
  type: "page-type/track",
  slug: "paul-cardall-faithful-scarborough-fair",
  ownLength: 3.713766666666667,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-faithful"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2SBbX0Yvk7JhkBqEdIzLru",
      externalLink: "https://open.spotify.com/track/2SBbX0Yvk7JhkBqEdIzLru",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Scarborough Fair",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "scarboroughfair|7FQRbf8gbKw8KZQZAJWxH2|222826",
  song: "song/paul-cardall-scarborough-fair",
} as const satisfies Track
