import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys310RewriteTheStars = {
  id: "01a0afa2-0d10-7708-b6d4-0f566c548920",
  type: "page-type/track",
  slug: "the-piano-guys-3-10-rewrite-the-stars",
  ownLength: 3.504,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-10"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6y3fZqqhznBstwpi2RECob",
      externalLink: "https://open.spotify.com/track/6y3fZqqhznBstwpi2RECob",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Rewrite the Stars",
  trackType: "studio",
  discNumber: 2,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "rewritethestars|0jW6R8CVyVohuUJVcuweDI|210240",
  song: "song/the-piano-guys-rewrite-the-stars",
} as const satisfies Track
