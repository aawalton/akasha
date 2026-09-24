import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiHeroInYourStoryHeroInYourStory = {
  id: "01a0b112-9632-7bcc-bb0c-a2c939f7375f",
  type: "page-type/track",
  slug: "vinny-marchi-hero-in-your-story-hero-in-your-story",
  ownLength: 2.8611,
  ownProgress: 2.8611,
  partOfCollections: [
    "release/vinny-marchi-hero-in-your-story",
    "release/vinny-marchi-tales-of-the-lesbian-hunter",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Hero In Your Story",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/vinny-marchi" }],
  trackKey: "heroinyourstory|5USAMqcbMAzF3HBmeD5pJF|171666",
  song: "song/vinny-marchi-hero-in-your-story",
  carriedBy: [
    {
      release: "release/vinny-marchi-hero-in-your-story",
      discNumber: 1,
      position: 1,
      externalId: "3Wnovz4rElq4aYr8cxbqYO",
      externalLink: "https://open.spotify.com/track/3Wnovz4rElq4aYr8cxbqYO",
    },
    {
      release: "release/vinny-marchi-tales-of-the-lesbian-hunter",
      discNumber: 1,
      position: 11,
      externalId: "3G3CSxthmtB0kaipBm30g4",
      externalLink: "https://open.spotify.com/track/3G3CSxthmtB0kaipBm30g4",
    },
  ],
} as const satisfies Track
