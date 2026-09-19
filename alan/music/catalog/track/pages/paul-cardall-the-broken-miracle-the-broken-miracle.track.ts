import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheBrokenMiracleTheBrokenMiracle = {
  id: "01a0b4c8-30f3-7731-9ea4-3cf18f218ad2",
  type: "page-type/track",
  slug: "paul-cardall-the-broken-miracle-the-broken-miracle",
  ownLength: 3.2157666666666667,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-the-broken-miracle"],
  position: 17,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7jILjtJcgedVF7Jeqco90f",
      externalLink: "https://open.spotify.com/track/7jILjtJcgedVF7Jeqco90f",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "The Broken Miracle",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" },
    { externalId: "0o77vi5tCsW348tzvdjNPw", artistName: "Matt Hammitt" },
  ],
  trackKey: "thebrokenmiracle|0o77vi5tCsW348tzvdjNPw,7FQRbf8gbKw8KZQZAJWxH2|192946",
  song: "song/paul-cardall-the-broken-miracle",
} as const satisfies Track
