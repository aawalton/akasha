import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3PopOnPianoSomeoneYouLoved = {
  id: "01a0afa1-ce63-7e91-87f5-6f03ec75b6e2",
  type: "page-type/track",
  slug: "the-piano-guys-3-pop-on-piano-someone-you-loved",
  ownLength: 3.3857,
  ownProgress: 3.3857,
  partOfCollections: ["release/the-piano-guys-3-pop-on-piano"],
  position: 5,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4ujEHSTeMg1UjA1N4NETbJ",
      externalLink: "https://open.spotify.com/track/4ujEHSTeMg1UjA1N4NETbJ",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Someone You Loved",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "someoneyouloved|0jW6R8CVyVohuUJVcuweDI|203142",
  song: "song/the-piano-guys-someone-you-loved",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-pop-on-piano",
      discNumber: 1,
      position: 5,
      externalId: "4ujEHSTeMg1UjA1N4NETbJ",
      externalLink: "https://open.spotify.com/track/4ujEHSTeMg1UjA1N4NETbJ",
    },
  ],
} as const satisfies Track
