import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiHeroInYourStoryHeroInYourStory = {
  id: "01a0b112-9632-7bcc-bb0c-a2c939f7375f",
  type: "page-type/track",
  slug: "vinny-marchi-hero-in-your-story-hero-in-your-story",
  ownLength: 2.8611,
  ownProgress: 0,
  partOfCollections: ["release/vinny-marchi-hero-in-your-story"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3Wnovz4rElq4aYr8cxbqYO",
      externalLink: "https://open.spotify.com/track/3Wnovz4rElq4aYr8cxbqYO",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Hero In Your Story",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "5USAMqcbMAzF3HBmeD5pJF", artistName: "Vinny Marchi" }],
  trackKey: "heroinyourstory|5USAMqcbMAzF3HBmeD5pJF|171666",
  song: "song/vinny-marchi-hero-in-your-story",
} as const satisfies Track
