import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiSugarStarsMayItBe = {
  id: "01a0b112-940c-7ceb-9d09-414df93510ce",
  type: "page-type/track",
  slug: "vinny-marchi-sugar-stars-may-it-be",
  ownLength: 3.215133333333333,
  ownProgress: 0,
  partOfCollections: ["release/vinny-marchi-sugar-stars"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5gGvxZp05Lj0aXFVRtin3E",
      externalLink: "https://open.spotify.com/track/5gGvxZp05Lj0aXFVRtin3E",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "May It Be",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "5USAMqcbMAzF3HBmeD5pJF", artistName: "Vinny Marchi" }],
  trackKey: "mayitbe|5USAMqcbMAzF3HBmeD5pJF|192908",
} as const satisfies Track
