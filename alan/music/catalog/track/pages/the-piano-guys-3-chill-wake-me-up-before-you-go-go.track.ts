import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3ChillWakeMeUpBeforeYouGoGo = {
  id: "01a0afa1-e092-7277-9f9e-e154bd65aea8",
  type: "page-type/track",
  slug: "the-piano-guys-3-chill-wake-me-up-before-you-go-go",
  ownLength: 3.9680833333333334,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-chill"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6wfKswmsUoucuBXnsK0NzB",
      externalLink: "https://open.spotify.com/track/6wfKswmsUoucuBXnsK0NzB",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Wake Me Up Before You Go-Go",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "wakemeupbeforeyougogo|0jW6R8CVyVohuUJVcuweDI|238085",
  song: "song/the-piano-guys-wake-me-up-before-you-go-go",
} as const satisfies Track
