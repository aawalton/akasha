import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3ThePianoGuysMichaelMeetsMozart = {
  id: "01a0afa2-19dc-7004-84cf-540ddfc53de7",
  type: "page-type/track",
  slug: "the-piano-guys-3-the-piano-guys-michael-meets-mozart",
  ownLength: 5.345983333333334,
  ownProgress: 5.345983333333334,
  partOfCollections: ["release/the-piano-guys-3-the-piano-guys"],
  status: "completed",
  unit: "unit/minutes",
  title: "Michael Meets Mozart",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "michaelmeetsmozart|0jW6R8CVyVohuUJVcuweDI|320759",
  song: "song/the-piano-guys-michael-meets-mozart",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-the-piano-guys",
      discNumber: 1,
      position: 10,
      externalId: "7i9XGfQXm9fY3CM4fLa2vA",
      externalLink: "https://open.spotify.com/track/7i9XGfQXm9fY3CM4fLa2vA",
    },
  ],
} as const satisfies Track
