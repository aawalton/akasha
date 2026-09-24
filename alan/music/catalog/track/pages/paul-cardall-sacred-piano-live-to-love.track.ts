import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallSacredPianoLiveToLove = {
  id: "01a0b4c8-4711-7c33-b15a-163aee655ce8",
  type: "page-type/track",
  slug: "paul-cardall-sacred-piano-live-to-love",
  ownLength: 3.537333333333333,
  ownProgress: 3.537333333333333,
  partOfCollections: ["release/paul-cardall-sacred-piano"],
  status: "completed",
  unit: "unit/minutes",
  title: "Live to Love",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "livetolove|7FQRbf8gbKw8KZQZAJWxH2|212240",
  song: "song/paul-cardall-live-to-love",
  carriedBy: [
    {
      release: "release/paul-cardall-sacred-piano",
      discNumber: 1,
      position: 3,
      externalId: "3LL4bs5JQ508unAk97UYpi",
      externalLink: "https://open.spotify.com/track/3LL4bs5JQ508unAk97UYpi",
    },
  ],
} as const satisfies Track
