import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys310AMillionDreams = {
  id: "01a0afa2-0ce9-7387-ba74-30d39522e663",
  type: "page-type/track",
  slug: "the-piano-guys-3-10-a-million-dreams",
  ownLength: 4.751883333333334,
  ownProgress: 4.751883333333334,
  partOfCollections: [
    "release/the-piano-guys-3-10",
    "release/the-piano-guys-3-classical-movie-soundtracks",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "A Million Dreams",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "amilliondreams|0jW6R8CVyVohuUJVcuweDI|285113",
  song: "song/evynne-hollens-a-million-dreams",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-10",
      discNumber: 2,
      position: 8,
      externalId: "46qfd3eMFxvrUVS9yu9g9H",
      externalLink: "https://open.spotify.com/track/46qfd3eMFxvrUVS9yu9g9H",
    },
    {
      release: "release/the-piano-guys-3-classical-movie-soundtracks",
      discNumber: 1,
      position: 9,
      externalId: "43ASUvZueyQ3vC4Gy1GqGL",
      externalLink: "https://open.spotify.com/track/43ASUvZueyQ3vC4Gy1GqGL",
    },
  ],
} as const satisfies Track
