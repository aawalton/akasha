import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallDecemberSoloPianoBeyondTheWallSoloPianoVersion = {
  id: "01a0b4c8-2b00-7401-963e-274fbfc05d1a",
  type: "page-type/track",
  slug: "paul-cardall-december-solo-piano-beyond-the-wall-solo-piano-version",
  ownLength: 3.4688833333333333,
  ownProgress: 3.4688833333333333,
  partOfCollections: ["release/paul-cardall-december-solo-piano"],
  status: "completed",
  unit: "unit/minutes",
  title: "Beyond The Wall - Solo Piano Version",
  trackType: "version",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "beyondthewallsolopianoversion|7FQRbf8gbKw8KZQZAJWxH2|208133",
  song: "song/paul-cardall-beyond-the-wall",
  carriedBy: [
    {
      release: "release/paul-cardall-december-solo-piano",
      discNumber: 1,
      position: 2,
      externalId: "0N463spn5tFjyUQIluh6i5",
      externalLink: "https://open.spotify.com/track/0N463spn5tFjyUQIluh6i5",
    },
  ],
} as const satisfies Track
