import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysPianoFocusFollowYou = {
  id: "01a0afa1-c3bf-7af2-a165-4d09ce028fbe",
  type: "page-type/track",
  slug: "the-piano-guys-piano-focus-follow-you",
  ownLength: 3.186,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-piano-focus"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5OJi4LVsOhzE0km9KIjDnp",
      externalLink: "https://open.spotify.com/track/5OJi4LVsOhzE0km9KIjDnp",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Follow You",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "followyou|0jW6R8CVyVohuUJVcuweDI|191160",
} as const satisfies Track
