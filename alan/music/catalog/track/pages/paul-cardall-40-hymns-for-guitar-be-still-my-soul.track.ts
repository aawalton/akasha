import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardall40HymnsForGuitarBeStillMySoul = {
  id: "01a0b4c8-1b39-78c6-b023-a7418682acd2",
  type: "page-type/track",
  slug: "paul-cardall-40-hymns-for-guitar-be-still-my-soul",
  ownLength: 3.1630166666666666,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-40-hymns-for-guitar"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Be Still, My Soul",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "bestillmysoul|7FQRbf8gbKw8KZQZAJWxH2|189781",
  song: "song/paul-cardall-be-still-my-soul",
  carriedBy: [
    {
      release: "release/paul-cardall-40-hymns-for-guitar",
      discNumber: 1,
      position: 21,
      externalId: "4cArim6RNWjmAfAAItwAyn",
      externalLink: "https://open.spotify.com/track/4cArim6RNWjmAfAAItwAyn",
    },
  ],
} as const satisfies Track
