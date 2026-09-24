import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallLiveVoicesLive = {
  id: "01a0b4c8-58d9-7bf2-96d0-091eb2da109b",
  type: "page-type/track",
  slug: "paul-cardall-live-voices-live",
  ownLength: 3.6477666666666666,
  ownProgress: 3.6477666666666666,
  partOfCollections: ["release/paul-cardall-live"],
  status: "completed",
  unit: "unit/minutes",
  title: "Voices - Live",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "voiceslive|7FQRbf8gbKw8KZQZAJWxH2|218866",
  song: "song/paul-cardall-voices",
  carriedBy: [
    {
      release: "release/paul-cardall-live",
      discNumber: 1,
      position: 11,
      externalId: "3rwmNEybeOPzshmdvD4u71",
      externalLink: "https://open.spotify.com/track/3rwmNEybeOPzshmdvD4u71",
    },
  ],
} as const satisfies Track
