import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys310KungFuPianoCelloAscends = {
  id: "01a0afa2-0c9b-71f3-8ac0-1e5c8854c08b",
  type: "page-type/track",
  slug: "the-piano-guys-3-10-kung-fu-piano-cello-ascends",
  ownLength: 4.04705,
  ownProgress: 4.04705,
  partOfCollections: [
    "release/the-piano-guys-3-10",
    "release/the-piano-guys-3-classical-movie-soundtracks",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Kung Fu Piano: Cello Ascends",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "kungfupianocelloascends|0jW6R8CVyVohuUJVcuweDI|242823",
  song: "song/the-piano-guys-kung-fu-piano-cello-ascends",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-10",
      discNumber: 2,
      position: 6,
      externalId: "6CR8JUW0AOPTGhCrz0P6dC",
      externalLink: "https://open.spotify.com/track/6CR8JUW0AOPTGhCrz0P6dC",
    },
    {
      release: "release/the-piano-guys-3-classical-movie-soundtracks",
      discNumber: 1,
      position: 3,
      externalId: "3AJkijY8fS8mFae3TvZQM3",
      externalLink: "https://open.spotify.com/track/3AJkijY8fS8mFae3TvZQM3",
    },
  ],
} as const satisfies Track
