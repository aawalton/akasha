import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3LoveMeLikeIAmLastTime = {
  id: "01a0afa1-f34d-7d85-bf41-952b478a1ec8",
  type: "page-type/track",
  slug: "the-piano-guys-3-love-me-like-i-am-last-time",
  ownLength: 3.1416666666666666,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-love-me-like-i-am"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "77hcaLD2LDCPO5vozjU8cG",
      externalLink: "https://open.spotify.com/track/77hcaLD2LDCPO5vozjU8cG",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Last Time",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "lasttime|0jW6R8CVyVohuUJVcuweDI|188500",
} as const satisfies Track
