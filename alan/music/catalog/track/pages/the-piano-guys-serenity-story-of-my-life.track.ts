import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysSerenityStoryOfMyLife = {
  id: "01a0afa2-09a1-78f5-8f2e-b2f714b73120",
  type: "page-type/track",
  slug: "the-piano-guys-serenity-story-of-my-life",
  ownLength: 4.51355,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-serenity"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2pVaG6gN3n2g1PSaECpM9a",
      externalLink: "https://open.spotify.com/track/2pVaG6gN3n2g1PSaECpM9a",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Story of My Life",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "storyofmylife|0jW6R8CVyVohuUJVcuweDI|270813",
} as const satisfies Track
