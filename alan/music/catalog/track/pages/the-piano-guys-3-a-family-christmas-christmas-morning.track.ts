import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3AFamilyChristmasChristmasMorning = {
  id: "01a0afa2-1839-7c67-a15b-af2f76dfc6f7",
  type: "page-type/track",
  slug: "the-piano-guys-3-a-family-christmas-christmas-morning",
  ownLength: 3.9892,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-a-family-christmas"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5fcRaiktOXuGauXlTfumSY",
      externalLink: "https://open.spotify.com/track/5fcRaiktOXuGauXlTfumSY",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Christmas Morning",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "2YQ4MY2VwOMv43C0GemUY5", artistName: "Jon Schmidt" },
    { externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" },
  ],
  trackKey: "christmasmorning|0jW6R8CVyVohuUJVcuweDI,2YQ4MY2VwOMv43C0GemUY5|239352",
} as const satisfies Track
