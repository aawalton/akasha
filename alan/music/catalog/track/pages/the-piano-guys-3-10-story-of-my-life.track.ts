import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys310StoryOfMyLife = {
  id: "01a0afa2-0dcc-7f3f-8bc2-1a4c699afc2c",
  type: "page-type/track",
  slug: "the-piano-guys-3-10-story-of-my-life",
  ownLength: 4.4637,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-10"],
  position: 14,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2kH5Ja9CChF2jU8JJic5Pj",
      externalLink: "https://open.spotify.com/track/2kH5Ja9CChF2jU8JJic5Pj",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Story of My Life",
  trackType: "studio",
  discNumber: 2,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "storyofmylife|0jW6R8CVyVohuUJVcuweDI|267822",
  song: "song/the-piano-guys-story-of-my-life",
} as const satisfies Track
