import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallMiraclesAJourneyOfHopeHealingVoices = {
  id: "01a0b4c8-5afb-7a38-8c7a-6034e4d6c130",
  type: "page-type/track",
  slug: "paul-cardall-miracles-a-journey-of-hope-healing-voices",
  ownLength: 5.0131,
  ownProgress: 5.0131,
  partOfCollections: [
    "release/paul-cardall-miracles-a-journey-of-hope-healing",
    "release/paul-cardall-saving-tiny-hearts",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Voices",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "voices|7FQRbf8gbKw8KZQZAJWxH2|300786",
  song: "song/paul-cardall-voices",
  carriedBy: [
    {
      release: "release/paul-cardall-miracles-a-journey-of-hope-healing",
      discNumber: 1,
      position: 2,
      externalId: "7DTVHqCt786rrATJqSJb2N",
      externalLink: "https://open.spotify.com/track/7DTVHqCt786rrATJqSJb2N",
    },
    {
      release: "release/paul-cardall-saving-tiny-hearts",
      discNumber: 1,
      position: 5,
      externalId: "7gZAdeyC9vbc0x4ZszHo4s",
      externalLink: "https://open.spotify.com/track/7gZAdeyC9vbc0x4ZszHo4s",
    },
  ],
} as const satisfies Track
