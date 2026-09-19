import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiBadDaysGoodBadDaysGood = {
  id: "01a0b112-971c-7e36-90ba-5f7c0059a65a",
  type: "page-type/track",
  slug: "vinny-marchi-bad-days-good-bad-days-good",
  ownLength: 2.65,
  ownProgress: 0,
  partOfCollections: ["release/vinny-marchi-bad-days-good"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0Rjy1m7fY46sKHPY7wvuGM",
      externalLink: "https://open.spotify.com/track/0Rjy1m7fY46sKHPY7wvuGM",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Bad Days Good",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "5USAMqcbMAzF3HBmeD5pJF", artistName: "Vinny Marchi" },
    { externalId: "64ADBorxGiCOn7wiXxQfYB", artistName: "Jason Juliano" },
  ],
  trackKey: "baddaysgood|5USAMqcbMAzF3HBmeD5pJF,64ADBorxGiCOn7wiXxQfYB|159000",
  song: "song/vinny-marchi-bad-days-good",
} as const satisfies Track
