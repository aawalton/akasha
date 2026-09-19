import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallPeacefulPianoOutOfTheAshes = {
  id: "01a0b4c8-32e4-7405-a089-fc4293e38ef6",
  type: "page-type/track",
  slug: "paul-cardall-peaceful-piano-out-of-the-ashes",
  ownLength: 3.68955,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-peaceful-piano"],
  position: 13,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "401671bNrYWakt7WxNohsG",
      externalLink: "https://open.spotify.com/track/401671bNrYWakt7WxNohsG",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Out of the Ashes",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "outoftheashes|7FQRbf8gbKw8KZQZAJWxH2|221373",
  song: "song/paul-cardall-out-of-the-ashes",
} as const satisfies Track
