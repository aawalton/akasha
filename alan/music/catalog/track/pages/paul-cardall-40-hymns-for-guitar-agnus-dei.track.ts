import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardall40HymnsForGuitarAgnusDei = {
  id: "01a0b4c8-1d79-7dfb-b902-5f98f5281858",
  type: "page-type/track",
  slug: "paul-cardall-40-hymns-for-guitar-agnus-dei",
  ownLength: 2.321066666666667,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-40-hymns-for-guitar"],
  position: 37,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1o5UMg4uhzIRw15bUl6r9I",
      externalLink: "https://open.spotify.com/track/1o5UMg4uhzIRw15bUl6r9I",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Agnus Dei",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "agnusdei|7FQRbf8gbKw8KZQZAJWxH2|139264",
  song: "song/paul-cardall-agnus-dei",
} as const satisfies Track
