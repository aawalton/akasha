import type { Episode } from "../../episode.page-type.ts"

export const swordArtOnlineS01e01 = {
  id: "019ea442-6fef-7899-9749-72deba30420a",
  pageTypeSlug: "episode",
  slug: "sword-art-online-s01e01",
  title: "The World of Swords",
  description:
    'It\'s launch day for one of the most highly-anticipated video games of all time. Join the character "Kirito" as he begins his journey in the virtual world of Sword Art Online.',
  position: 1,
  ownLength: 23,
  unitSlug: "minutes",
  partOfSlugs: ["sword-art-online-s01"],
  publishedAt: "2012-07-08",
  episodeType: "standard",
  stillPath: "/wokec1ewZhYNMLcKuK01H09i2pB.jpg",
  voteAverage: 8.5,
  source: "tmdb",
  externalId: "904435",
  externalLink: "https://www.themoviedb.org/tv/45782/season/1/episode/1",
} as const satisfies Episode
