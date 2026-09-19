import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3LimitlessRewriteTheStars = {
  id: "01a0afa2-0e28-770a-ac0d-0d9cd2d8d17a",
  type: "page-type/track",
  slug: "the-piano-guys-3-limitless-rewrite-the-stars",
  ownLength: 3.52555,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-limitless"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1t4NUQuv33szmm8jeLzsZW",
      externalLink: "https://open.spotify.com/track/1t4NUQuv33szmm8jeLzsZW",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Rewrite the Stars",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "rewritethestars|0jW6R8CVyVohuUJVcuweDI|211533",
  song: "song/the-piano-guys-rewrite-the-stars",
} as const satisfies Track
