import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheBrokenMiracleABeautifulMind = {
  id: "01a0b4c8-2f83-7a84-b630-3e5bec482d79",
  type: "page-type/track",
  slug: "paul-cardall-the-broken-miracle-a-beautiful-mind",
  ownLength: 1.1357666666666666,
  ownProgress: 1.1357666666666666,
  partOfCollections: ["release/paul-cardall-the-broken-miracle"],
  status: "completed",
  unit: "unit/minutes",
  title: "A Beautiful Mind",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "abeautifulmind|7FQRbf8gbKw8KZQZAJWxH2|68146",
  song: "song/paul-cardall-a-beautiful-mind",
  carriedBy: [
    {
      release: "release/paul-cardall-the-broken-miracle",
      discNumber: 1,
      position: 7,
      externalId: "3cZX04frpYwTKh0YSZxdcF",
      externalLink: "https://open.spotify.com/track/3cZX04frpYwTKh0YSZxdcF",
    },
  ],
} as const satisfies Track
