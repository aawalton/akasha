import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theWarOfBrokenMirrorsDefyingDestiny = {
  id: "019db533-f39b-731f-b6cb-af7116df10db",
  type: "page-type/book",
  slug: "the-war-of-broken-mirrors-defying-destiny",
  title: "The War of Broken Mirrors: Defying Destiny",
  status: "not-started",
  unit: "unit/words",
  position: 2,
  ownLength: 134250,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B07WWGQG8Q",
      externalLink: "https://www.amazon.com/dp/B07WWGQG8Q",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
