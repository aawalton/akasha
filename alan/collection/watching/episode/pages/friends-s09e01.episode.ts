import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const friendsS09e01 = {
  id: "01a18848-c2c5-76f9-b10e-071a7f2af711",
  type: "page-type/episode",
  slug: "friends-s09e01",
  description:
    "Following Rachel's acceptance of Joey's accidental proposal, confusion reigns as Rachel wonders whether it was the right thing to do and Phoebe can't seem to mind her own business. Finally, Rachel, Ross and Joey get together and figure out that no one was actually going to propose. Meanwhile, Mr. Geller walks in on Monica and Chandler having sex in a closet.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/friends-season-9"],
  position: 1,
  publishedAt: "2002-09-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "87422",
      externalLink: "https://www.themoviedb.org/tv/1668/season/9/episode/1",
    },
  ],
  title: "The One Where No One Proposes",
  episodeType: "standard",
  stillPath: "/dNqS2szoMmfgfFttsVZTggXjttz.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-29T15:30:32.248Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Episode
