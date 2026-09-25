import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const swordArtOnlineAlternativeGunGaleOnlineSquadJam = {
  id: "019db533-f38b-72b5-8b81-76ee4a4fed67",
  type: "page-type/book",
  slug: "sword-art-online-alternative-gun-gale-online-squad-jam",
  title: "Sword Art Online Alternative Gun Gale Online: Squad Jam",
  status: "not-started",
  author: "Reki Kawahara, Keiichi Sigsawa",
  unit: "unit/words",
  position: 1,
  ownLength: 76000,
  publishedAt: "2018-06-26",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0791M1NFY",
      externalLink: "https://amazon.com/dp/B0791M1NFY",
    },
  ],
} as const satisfies Book
