import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3WeddingSeasonYoullBeInMyHeart = {
  id: "01a0afa1-d6c7-75fc-92e6-d941411551a2",
  type: "page-type/track",
  slug: "the-piano-guys-3-wedding-season-youll-be-in-my-heart",
  ownLength: 4.123483333333334,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-wedding-season"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3ta3IRrOxI3QJx7X2IdlMl",
      externalLink: "https://open.spotify.com/track/3ta3IRrOxI3QJx7X2IdlMl",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "You'll Be In My Heart",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "youllbeinmyheart|0jW6R8CVyVohuUJVcuweDI|247409",
} as const satisfies Track
