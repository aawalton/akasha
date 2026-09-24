import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3SoFarSoGoodMichaelMeetsMozart = {
  id: "01a0afa2-1bd2-736e-aeb7-57db0badf1d6",
  type: "page-type/track",
  slug: "the-piano-guys-3-so-far-so-good-michael-meets-mozart",
  ownLength: 5.311333333333334,
  ownProgress: 5.311333333333334,
  partOfCollections: ["release/the-piano-guys-3-so-far-so-good"],
  status: "completed",
  unit: "unit/minutes",
  title: "Michael Meets Mozart",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "michaelmeetsmozart|0jW6R8CVyVohuUJVcuweDI|318680",
  song: "song/the-piano-guys-michael-meets-mozart",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-so-far-so-good",
      discNumber: 1,
      position: 8,
      externalId: "2ro0V80w0BSF53D8fCI983",
      externalLink: "https://open.spotify.com/track/2ro0V80w0BSF53D8fCI983",
    },
  ],
} as const satisfies Track
