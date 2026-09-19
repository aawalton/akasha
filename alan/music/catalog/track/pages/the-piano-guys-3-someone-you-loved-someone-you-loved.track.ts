import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3SomeoneYouLovedSomeoneYouLoved = {
  id: "01a0afa2-1d78-7258-8d15-f326b48ae52a",
  type: "page-type/track",
  slug: "the-piano-guys-3-someone-you-loved-someone-you-loved",
  ownLength: 3.3857666666666666,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-someone-you-loved"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0PiNYPMkmHxtDS0EZKK35X",
      externalLink: "https://open.spotify.com/track/0PiNYPMkmHxtDS0EZKK35X",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Someone You Loved",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "someoneyouloved|0jW6R8CVyVohuUJVcuweDI|203146",
  song: "song/the-piano-guys-someone-you-loved",
} as const satisfies Track
