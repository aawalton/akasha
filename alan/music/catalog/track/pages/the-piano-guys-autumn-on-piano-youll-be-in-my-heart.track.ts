import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysAutumnOnPianoYoullBeInMyHeart = {
  id: "01a0afa1-c06a-7869-9a28-b766a8b4069a",
  type: "page-type/track",
  slug: "the-piano-guys-autumn-on-piano-youll-be-in-my-heart",
  ownLength: 4.123483333333334,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-autumn-on-piano"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3jk6mKKYESmxddccvJBKYl",
      externalLink: "https://open.spotify.com/track/3jk6mKKYESmxddccvJBKYl",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "You'll Be In My Heart",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "youllbeinmyheart|0jW6R8CVyVohuUJVcuweDI|247409",
  song: "song/the-piano-guys-youll-be-in-my-heart",
} as const satisfies Track
