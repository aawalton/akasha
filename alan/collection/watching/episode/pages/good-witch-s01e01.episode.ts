import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const goodWitchS01e01 = {
  id: "01a18849-3527-7f5e-b79f-eac6ca668f09",
  type: "page-type/episode",
  slug: "good-witch-s01e01",
  description:
    'After the death of her husband, Cassie Nightingale and her family find themselves caring for her ailing father-in-law. Moving in next door are the Radfords, Sam and Nick. Sam, the town\'s new doctor, has difficulty getting patients, as the town goes to Cassie\'s store for her more earthly herbal remedies. (At initial broadcast "Starting Over...Again" was a double-length episode, the second half later becoming known as "Apologies and Remembrances" for example for the DVD release).',
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["season/good-witch-season-1"],
  position: 1,
  publishedAt: "2015-02-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1034920",
      externalLink: "https://www.themoviedb.org/tv/61864/season/1/episode/1",
    },
  ],
  title: "Starting Over… Again",
  episodeType: "standard",
  stillPath: "/Acj3MBeuYdA6qersSNZqnIEZdm1.jpg",
  voteAverage: 5.8,
  createdAt: "2026-10-29T15:31:01.543Z",
  updatedAt: "2026-10-29T15:31:01.543Z",
} as const satisfies Episode
