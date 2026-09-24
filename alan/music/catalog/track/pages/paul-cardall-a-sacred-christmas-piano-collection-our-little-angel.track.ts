import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallASacredChristmasPianoCollectionOurLittleAngel = {
  id: "01a0b4c8-40fa-7b58-a849-1b4c0f45249c",
  type: "page-type/track",
  slug: "paul-cardall-a-sacred-christmas-piano-collection-our-little-angel",
  ownLength: 2.9823,
  ownProgress: 2.9823,
  partOfCollections: ["release/paul-cardall-a-sacred-christmas-piano-collection"],
  status: "completed",
  unit: "unit/minutes",
  title: "Our Little Angel",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "ourlittleangel|7FQRbf8gbKw8KZQZAJWxH2|178938",
  song: "song/paul-cardall-our-little-angel",
  carriedBy: [
    {
      release: "release/paul-cardall-a-sacred-christmas-piano-collection",
      discNumber: 1,
      position: 3,
      externalId: "5r37KfoFIhOEPmIA71IUdC",
      externalLink: "https://open.spotify.com/track/5r37KfoFIhOEPmIA71IUdC",
    },
  ],
} as const satisfies Track
