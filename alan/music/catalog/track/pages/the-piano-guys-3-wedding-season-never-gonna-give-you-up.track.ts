import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3WeddingSeasonNeverGonnaGiveYouUp = {
  id: "01a0afa1-d840-75d6-a816-e62ddd4a62a6",
  type: "page-type/track",
  slug: "the-piano-guys-3-wedding-season-never-gonna-give-you-up",
  ownLength: 3.04385,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-wedding-season"],
  position: 17,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "42j5dbhzMrr6Zdj6GNY6oA",
      externalLink: "https://open.spotify.com/track/42j5dbhzMrr6Zdj6GNY6oA",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Never Gonna Give You Up",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "nevergonnagiveyouup|0jW6R8CVyVohuUJVcuweDI|182631",
  song: "song/the-piano-guys-never-gonna-give-you-up",
} as const satisfies Track
