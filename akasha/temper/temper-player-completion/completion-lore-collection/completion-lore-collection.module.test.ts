import { describe, expect, test } from "bun:test"
import {
  findFirstIncompleteLoreCollection,
  type LoreCollectionInput,
} from "./completion-lore-collection.module.code.ts"

const COLLECTIONS: readonly LoreCollectionInput[] = [
  {
    collectionIndex: 1,
    name: "Glenumbra Lore",
    books: [
      { bookIndex: 1, name: "The Anticipations" },
      { bookIndex: 2, name: "Before the Ages of Man" },
    ],
  },
  {
    collectionIndex: 8,
    name: "Daedric Princes",
    books: [
      { bookIndex: 1, name: "Vaermina" },
      { bookIndex: 2, name: "Azura" },
    ],
  },
  {
    collectionIndex: 5,
    name: "Alik'r Desert Lore",
    books: [{ bookIndex: 1, name: "Yokudan Tales" }],
  },
]

describe("findFirstIncompleteLoreCollection", () => {
  test("returns the first collection alphabetically with an unread book", () => {
    const result = findFirstIncompleteLoreCollection(COLLECTIONS, new Set(), 1)
    expect(result?.collectionName).toBe("Alik'r Desert Lore")
    expect(result?.unreadBookNames).toEqual(["Yokudan Tales"])
    expect(result?.totalBooks).toBe(1)
    expect(result?.knownBooks).toBe(0)
  })

  test("skips fully-read collections and returns the next one alphabetically", () => {
    const known = new Set<string>(["1:5:1"])
    const result = findFirstIncompleteLoreCollection(COLLECTIONS, known, 1)
    expect(result?.collectionName).toBe("Daedric Princes")
  })

  test("lists unread books alphabetically by name", () => {
    const known = new Set<string>(["1:5:1"])
    const result = findFirstIncompleteLoreCollection(COLLECTIONS, known, 1)
    expect(result?.collectionName).toBe("Daedric Princes")
    expect(result?.unreadBookNames).toEqual(["Azura", "Vaermina"])
  })

  test("excludes books already in the known set", () => {
    const known = new Set<string>(["1:5:1", "1:8:1", "1:8:2", "1:1:1"])
    const result = findFirstIncompleteLoreCollection(COLLECTIONS, known, 1)
    expect(result?.collectionName).toBe("Glenumbra Lore")
    expect(result?.unreadBookNames).toEqual(["Before the Ages of Man"])
    expect(result?.totalBooks).toBe(2)
    expect(result?.knownBooks).toBe(1)
  })

  test("caps the unread-book list at five books when no limit is given", () => {
    const books = Array.from({ length: 8 }, (_, index) => ({
      bookIndex: index + 1,
      name: `z${index}`,
    }))
    const collections: readonly LoreCollectionInput[] = [{ collectionIndex: 1, name: "Big", books }]
    const result = findFirstIncompleteLoreCollection(collections, new Set(), 1)
    expect(result?.unreadBookNames).toEqual(["z0", "z1", "z2", "z3", "z4"])
    expect(result?.totalBooks).toBe(8)
    expect(result?.knownBooks).toBe(0)
  })

  test("respects an explicit limit", () => {
    const collections: readonly LoreCollectionInput[] = [
      {
        collectionIndex: 1,
        name: "C",
        books: [
          { bookIndex: 1, name: "a" },
          { bookIndex: 2, name: "b" },
          { bookIndex: 3, name: "c" },
        ],
      },
    ]
    const result = findFirstIncompleteLoreCollection(collections, new Set(), 1, 2)
    expect(result?.unreadBookNames).toEqual(["a", "b"])
  })

  test("keys the known-set lookup by the supplied category index", () => {
    const collections: readonly LoreCollectionInput[] = [
      { collectionIndex: 1, name: "C", books: [{ bookIndex: 1, name: "a" }] },
    ]
    expect(findFirstIncompleteLoreCollection(collections, new Set(["1:1:1"]), 1)).toBeUndefined()
    expect(
      findFirstIncompleteLoreCollection(collections, new Set(["1:1:1"]), 2)?.collectionName
    ).toBe("C")
  })

  test("returns undefined when every book is known", () => {
    const known = new Set<string>(["1:1:1", "1:1:2", "1:8:1", "1:8:2", "1:5:1"])
    expect(findFirstIncompleteLoreCollection(COLLECTIONS, known, 1)).toBeUndefined()
  })

  test("returns undefined for an empty catalog", () => {
    expect(findFirstIncompleteLoreCollection([], new Set(), 1)).toBeUndefined()
  })
})
