import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3SoFarSoGoodMichaelMeetsMozart = {
  id: "01a0afa2-1bd2-736e-aeb7-57db0badf1d6",
  type: "page-type/track",
  slug: "the-piano-guys-3-so-far-so-good-michael-meets-mozart",
  ownLength: 5.311333333333334,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-so-far-so-good"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2ro0V80w0BSF53D8fCI983",
      externalLink: "https://open.spotify.com/track/2ro0V80w0BSF53D8fCI983",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Michael Meets Mozart",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "michaelmeetsmozart|0jW6R8CVyVohuUJVcuweDI|318680",
  song: "song/the-piano-guys-michael-meets-mozart",
} as const satisfies Track
