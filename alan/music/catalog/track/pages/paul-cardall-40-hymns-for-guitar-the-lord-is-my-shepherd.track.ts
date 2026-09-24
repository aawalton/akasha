import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardall40HymnsForGuitarTheLordIsMyShepherd = {
  id: "01a0b4c8-1b11-7c9f-914c-906933fdb3b1",
  type: "page-type/track",
  slug: "paul-cardall-40-hymns-for-guitar-the-lord-is-my-shepherd",
  ownLength: 3.14025,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-40-hymns-for-guitar"],
  status: "not-started",
  unit: "unit/minutes",
  title: "The Lord is My Shepherd",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "thelordismyshepherd|7FQRbf8gbKw8KZQZAJWxH2|188415",
  song: "song/paul-cardall-the-lord-is-my-shepherd",
  carriedBy: [
    {
      release: "release/paul-cardall-40-hymns-for-guitar",
      discNumber: 1,
      position: 20,
      externalId: "5i3yQwUGwn7y38I3C7njwv",
      externalLink: "https://open.spotify.com/track/5i3yQwUGwn7y38I3C7njwv",
    },
  ],
} as const satisfies Track
