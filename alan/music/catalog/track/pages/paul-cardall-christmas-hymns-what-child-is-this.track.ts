import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChristmasHymnsWhatChildIsThis = {
  id: "01a0b4c8-54f6-7dfc-abad-9a2c75e65f3c",
  type: "page-type/track",
  slug: "paul-cardall-christmas-hymns-what-child-is-this",
  ownLength: 4.77555,
  ownProgress: 4.77555,
  partOfCollections: ["release/paul-cardall-christmas-hymns"],
  status: "completed",
  unit: "unit/minutes",
  title: "What Child is This?",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "whatchildisthis|7FQRbf8gbKw8KZQZAJWxH2|286533",
  song: "song/paul-cardall-what-child-is-this",
  carriedBy: [
    {
      release: "release/paul-cardall-christmas-hymns",
      discNumber: 1,
      position: 7,
      externalId: "5iecWfAO5gbQ5bZoCHZ3xH",
      externalLink: "https://open.spotify.com/track/5iecWfAO5gbQ5bZoCHZ3xH",
    },
  ],
} as const satisfies Track
