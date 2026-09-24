import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallMiraclesAJourneyOfHopeHealingTime = {
  id: "01a0b4c8-5b22-7b53-90b2-fc20915d4db8",
  type: "page-type/track",
  slug: "paul-cardall-miracles-a-journey-of-hope-healing-time",
  ownLength: 3.193766666666667,
  ownProgress: 3.193766666666667,
  partOfCollections: [
    "release/paul-cardall-miracles-a-journey-of-hope-healing",
    "release/paul-cardall-saving-tiny-hearts",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Time",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "time|7FQRbf8gbKw8KZQZAJWxH2|191626",
  song: "song/paul-cardall-time",
  carriedBy: [
    {
      release: "release/paul-cardall-miracles-a-journey-of-hope-healing",
      discNumber: 1,
      position: 3,
      externalId: "5xqEpfGKFmEbObwvHMiiks",
      externalLink: "https://open.spotify.com/track/5xqEpfGKFmEbObwvHMiiks",
    },
    {
      release: "release/paul-cardall-saving-tiny-hearts",
      discNumber: 1,
      position: 6,
      externalId: "0KzGkaHpOkqY38zsnbs1Fs",
      externalLink: "https://open.spotify.com/track/0KzGkaHpOkqY38zsnbs1Fs",
    },
  ],
} as const satisfies Track
