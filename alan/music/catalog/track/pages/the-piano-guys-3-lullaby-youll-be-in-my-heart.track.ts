import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3LullabyYoullBeInMyHeart = {
  id: "01a0afa1-ddf0-722c-91b8-a8c83e22a42c",
  type: "page-type/track",
  slug: "the-piano-guys-3-lullaby-youll-be-in-my-heart",
  ownLength: 4.123483333333334,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-lullaby"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2tPPk70bDRfegwHFJXc0f0",
      externalLink: "https://open.spotify.com/track/2tPPk70bDRfegwHFJXc0f0",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "You'll Be In My Heart",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "youllbeinmyheart|0jW6R8CVyVohuUJVcuweDI|247409",
  song: "song/the-piano-guys-youll-be-in-my-heart",
} as const satisfies Track
