import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallASacredChristmasPianoCollectionSilentNight = {
  id: "01a0b4c8-421e-7864-b0bd-228d8e884197",
  type: "page-type/track",
  slug: "paul-cardall-a-sacred-christmas-piano-collection-silent-night",
  ownLength: 5.46785,
  ownProgress: 5.46785,
  partOfCollections: ["release/paul-cardall-a-sacred-christmas-piano-collection"],
  status: "completed",
  unit: "unit/minutes",
  title: "Silent Night",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "silentnight|7FQRbf8gbKw8KZQZAJWxH2|328071",
  song: "song/celtic-woman-silent-night",
  carriedBy: [
    {
      release: "release/paul-cardall-a-sacred-christmas-piano-collection",
      discNumber: 1,
      position: 11,
      externalId: "4qlf2100Gwh5BxaAkMbsJI",
      externalLink: "https://open.spotify.com/track/4qlf2100Gwh5BxaAkMbsJI",
    },
  ],
} as const satisfies Track
