import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiTalesOfTheLesbianHunterHeroInYourStory = {
  id: "01a0b112-925c-73b1-a3b9-9f9428d8a8e8",
  type: "page-type/track",
  slug: "vinny-marchi-tales-of-the-lesbian-hunter-hero-in-your-story",
  ownLength: 2.8611,
  ownProgress: 2.8611,
  partOfCollections: ["release/vinny-marchi-tales-of-the-lesbian-hunter"],
  position: 11,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3G3CSxthmtB0kaipBm30g4",
      externalLink: "https://open.spotify.com/track/3G3CSxthmtB0kaipBm30g4",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Hero In Your Story",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "5USAMqcbMAzF3HBmeD5pJF", artistName: "Vinny Marchi" }],
  trackKey: "heroinyourstory|5USAMqcbMAzF3HBmeD5pJF|171666",
  song: "song/vinny-marchi-hero-in-your-story",
  carriedBy: [
    {
      release: "release/vinny-marchi-tales-of-the-lesbian-hunter",
      discNumber: 1,
      position: 11,
      externalId: "3G3CSxthmtB0kaipBm30g4",
      externalLink: "https://open.spotify.com/track/3G3CSxthmtB0kaipBm30g4",
    },
  ],
} as const satisfies Track
