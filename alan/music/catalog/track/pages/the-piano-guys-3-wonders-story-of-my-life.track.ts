import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3WondersStoryOfMyLife = {
  id: "01a0afa2-159b-7d42-9b46-bb5812517bd6",
  type: "page-type/track",
  slug: "the-piano-guys-3-wonders-story-of-my-life",
  ownLength: 4.51355,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-wonders"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "71I9xjigtEcEYcbZgtvG1J",
      externalLink: "https://open.spotify.com/track/71I9xjigtEcEYcbZgtvG1J",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Story of My Life",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "storyofmylife|0jW6R8CVyVohuUJVcuweDI|270813",
  song: "song/the-piano-guys-story-of-my-life",
} as const satisfies Track
