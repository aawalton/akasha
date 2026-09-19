import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallASacredChristmasPianoCollectionOurLittleAngel = {
  id: "01a0b4c8-40fa-7b58-a849-1b4c0f45249c",
  type: "page-type/track",
  slug: "paul-cardall-a-sacred-christmas-piano-collection-our-little-angel",
  ownLength: 2.9823,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-a-sacred-christmas-piano-collection"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5r37KfoFIhOEPmIA71IUdC",
      externalLink: "https://open.spotify.com/track/5r37KfoFIhOEPmIA71IUdC",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Our Little Angel",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "ourlittleangel|7FQRbf8gbKw8KZQZAJWxH2|178938",
  song: "song/paul-cardall-our-little-angel",
} as const satisfies Track
