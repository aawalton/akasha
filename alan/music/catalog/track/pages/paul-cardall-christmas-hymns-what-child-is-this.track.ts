import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChristmasHymnsWhatChildIsThis = {
  id: "01a0b4c8-54f6-7dfc-abad-9a2c75e65f3c",
  type: "page-type/track",
  slug: "paul-cardall-christmas-hymns-what-child-is-this",
  ownLength: 4.77555,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-christmas-hymns"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5iecWfAO5gbQ5bZoCHZ3xH",
      externalLink: "https://open.spotify.com/track/5iecWfAO5gbQ5bZoCHZ3xH",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "What Child is This?",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "whatchildisthis|7FQRbf8gbKw8KZQZAJWxH2|286533",
  song: "song/paul-cardall-what-child-is-this",
} as const satisfies Track
