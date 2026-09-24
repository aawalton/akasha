import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallMiraclesAJourneyOfHopeHealingMiracles = {
  id: "01a0b4c8-5ad5-73f3-ba90-73bf2fe13b56",
  type: "page-type/track",
  slug: "paul-cardall-miracles-a-journey-of-hope-healing-miracles",
  ownLength: 4.7871,
  ownProgress: 4.7871,
  partOfCollections: [
    "release/paul-cardall-miracles-a-journey-of-hope-healing",
    "release/paul-cardall-saving-tiny-hearts",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Miracles",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "miracles|7FQRbf8gbKw8KZQZAJWxH2|287226",
  song: "song/paul-cardall-miracles",
  carriedBy: [
    {
      release: "release/paul-cardall-miracles-a-journey-of-hope-healing",
      discNumber: 1,
      position: 1,
      externalId: "3pvaOAc9478HNlW4GJMNrp",
      externalLink: "https://open.spotify.com/track/3pvaOAc9478HNlW4GJMNrp",
    },
    {
      release: "release/paul-cardall-saving-tiny-hearts",
      discNumber: 1,
      position: 4,
      externalId: "4EAZb7BXKd1Hl8Radtavmb",
      externalLink: "https://open.spotify.com/track/4EAZb7BXKd1Hl8Radtavmb",
    },
  ],
} as const satisfies Track
