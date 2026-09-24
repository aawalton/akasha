import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallLoveOneAnotherLoveOneAnother = {
  id: "01a0b4c8-6963-7a13-9f61-8a8a8bdc6e49",
  type: "page-type/track",
  slug: "paul-cardall-love-one-another-love-one-another",
  ownLength: 4.01385,
  ownProgress: 4.01385,
  partOfCollections: ["release/paul-cardall-love-one-another", "release/paul-cardall-return-home"],
  status: "completed",
  unit: "unit/minutes",
  title: "Love One Another",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "loveoneanother|7FQRbf8gbKw8KZQZAJWxH2|240831",
  song: "song/paul-cardall-love-one-another",
  carriedBy: [
    {
      release: "release/paul-cardall-love-one-another",
      discNumber: 1,
      position: 1,
      externalId: "6jSeWJeDXcej6tOXk4QB4n",
      externalLink: "https://open.spotify.com/track/6jSeWJeDXcej6tOXk4QB4n",
    },
    {
      release: "release/paul-cardall-return-home",
      discNumber: 1,
      position: 3,
      externalId: "3n8ZTiG1QT4zNQ4qhfSOos",
      externalLink: "https://open.spotify.com/track/3n8ZTiG1QT4zNQ4qhfSOos",
    },
  ],
} as const satisfies Track
