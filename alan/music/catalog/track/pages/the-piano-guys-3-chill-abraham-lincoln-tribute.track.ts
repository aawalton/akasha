import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3ChillAbrahamLincolnTribute = {
  id: "01a0afa1-e15e-73fb-9d69-d8f050dccbce",
  type: "page-type/track",
  slug: "the-piano-guys-3-chill-abraham-lincoln-tribute",
  ownLength: 4.578033333333333,
  ownProgress: 4.578033333333333,
  partOfCollections: ["release/the-piano-guys-3-chill"],
  status: "completed",
  unit: "unit/minutes",
  title: "Abraham Lincoln Tribute",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "abrahamlincolntribute|0jW6R8CVyVohuUJVcuweDI|274682",
  song: "song/the-piano-guys-abraham-lincoln-tribute",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-chill",
      discNumber: 1,
      position: 8,
      externalId: "2ahakOtTjLhMkHU3nRqkmV",
      externalLink: "https://open.spotify.com/track/2ahakOtTjLhMkHU3nRqkmV",
    },
  ],
} as const satisfies Track
