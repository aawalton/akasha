import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3ChillBeforeYouGo = {
  id: "01a0afa1-e17f-7ea7-86a4-119ddb34cb82",
  type: "page-type/track",
  slug: "the-piano-guys-3-chill-before-you-go",
  ownLength: 3.8839166666666665,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-chill"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6DcQaaai7MGhgMXEaCg0oF",
      externalLink: "https://open.spotify.com/track/6DcQaaai7MGhgMXEaCg0oF",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Before You Go",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "beforeyougo|0jW6R8CVyVohuUJVcuweDI|233035",
  song: "song/the-piano-guys-before-you-go",
} as const satisfies Track
