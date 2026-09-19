import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3WeddingSeasonMyGirl = {
  id: "01a0afa1-d685-7a97-a8ff-08bd7361c023",
  type: "page-type/track",
  slug: "the-piano-guys-3-wedding-season-my-girl",
  ownLength: 3.9403,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-wedding-season"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4s4trlpizTeByhgUEJZ7hF",
      externalLink: "https://open.spotify.com/track/4s4trlpizTeByhgUEJZ7hF",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "My Girl",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "mygirl|0jW6R8CVyVohuUJVcuweDI|236418",
  song: "song/the-piano-guys-my-girl",
} as const satisfies Track
