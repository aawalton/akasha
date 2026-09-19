import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardall40HymnsForFortyDaysTheLordIsMyShepherd = {
  id: "01a0b4c8-3811-7004-aa5e-377c501f3f4c",
  type: "page-type/track",
  slug: "paul-cardall-40-hymns-for-forty-days-the-lord-is-my-shepherd",
  ownLength: 3.264883333333333,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-40-hymns-for-forty-days"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6Mct92mPPlKz2dEmbhWzSl",
      externalLink: "https://open.spotify.com/track/6Mct92mPPlKz2dEmbhWzSl",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "The Lord Is My Shepherd",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "thelordismyshepherd|7FQRbf8gbKw8KZQZAJWxH2|195893",
  song: "song/paul-cardall-the-lord-is-my-shepherd",
} as const satisfies Track
