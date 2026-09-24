import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiSugarStarsWakeUpToYou = {
  id: "01a0b112-9383-7f8b-b990-5c2b88b468c1",
  type: "page-type/track",
  slug: "vinny-marchi-sugar-stars-wake-up-to-you",
  ownLength: 1.9777666666666667,
  ownProgress: 1.9777666666666667,
  partOfCollections: ["release/vinny-marchi-sugar-stars"],
  status: "completed",
  unit: "unit/minutes",
  title: "wake up to you",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/vinny-marchi" }],
  trackKey: "wakeuptoyou|5USAMqcbMAzF3HBmeD5pJF|118666",
  song: "song/vinny-marchi-wake-up-to-you",
  carriedBy: [
    {
      release: "release/vinny-marchi-sugar-stars",
      discNumber: 1,
      position: 6,
      externalId: "5niBirkmu67BDhhezZwX6Q",
      externalLink: "https://open.spotify.com/track/5niBirkmu67BDhhezZwX6Q",
    },
  ],
} as const satisfies Track
