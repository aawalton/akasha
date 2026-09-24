import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiBadDaysGoodBadDaysGood = {
  id: "01a0b112-971c-7e36-90ba-5f7c0059a65a",
  type: "page-type/track",
  slug: "vinny-marchi-bad-days-good-bad-days-good",
  ownLength: 2.65,
  ownProgress: 2.65,
  partOfCollections: ["release/vinny-marchi-bad-days-good"],
  status: "completed",
  unit: "unit/minutes",
  title: "Bad Days Good",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/vinny-marchi" }, { artistName: "Jason Juliano" }],
  trackKey: "baddaysgood|5USAMqcbMAzF3HBmeD5pJF,64ADBorxGiCOn7wiXxQfYB|159000",
  song: "song/vinny-marchi-bad-days-good",
  carriedBy: [
    {
      release: "release/vinny-marchi-bad-days-good",
      discNumber: 1,
      position: 1,
      externalId: "0Rjy1m7fY46sKHPY7wvuGM",
      externalLink: "https://open.spotify.com/track/0Rjy1m7fY46sKHPY7wvuGM",
    },
  ],
} as const satisfies Track
