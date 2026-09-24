import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys310Happier = {
  id: "01a0afa2-0b39-7b19-ab0a-e77182a02473",
  type: "page-type/track",
  slug: "the-piano-guys-3-10-happier",
  ownLength: 3.74,
  ownProgress: 3.74,
  partOfCollections: [
    "release/the-piano-guys-3-10",
    "release/the-piano-guys-3-happier",
    "release/the-piano-guys-3-pop-on-piano",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Happier",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "happier|0jW6R8CVyVohuUJVcuweDI|224400",
  song: "song/the-piano-guys-happier",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-10",
      discNumber: 1,
      position: 8,
      externalId: "46ZIrFWY7doQykCs1JD0ip",
      externalLink: "https://open.spotify.com/track/46ZIrFWY7doQykCs1JD0ip",
    },
    {
      release: "release/the-piano-guys-3-happier",
      discNumber: 1,
      position: 1,
      externalId: "2BDB6Mf9m4qhgxZzv03ziX",
      externalLink: "https://open.spotify.com/track/2BDB6Mf9m4qhgxZzv03ziX",
    },
    {
      release: "release/the-piano-guys-3-pop-on-piano",
      discNumber: 1,
      position: 7,
      externalId: "4WisyS4wK9Jd2BOIM8GxI6",
      externalLink: "https://open.spotify.com/track/4WisyS4wK9Jd2BOIM8GxI6",
    },
  ],
} as const satisfies Track
