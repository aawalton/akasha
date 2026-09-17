import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3BeforeYouGoBeforeYouGo = {
  id: "01a0afa2-07fe-727b-a171-8f61def26f1b",
  type: "page-type/track",
  slug: "the-piano-guys-3-before-you-go-before-you-go",
  ownLength: 3.8839166666666665,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-before-you-go"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5JLUo91wuHD9coSvZn0Nl9",
      externalLink: "https://open.spotify.com/track/5JLUo91wuHD9coSvZn0Nl9",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Before You Go",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "beforeyougo|0jW6R8CVyVohuUJVcuweDI|233035",
} as const satisfies Track
