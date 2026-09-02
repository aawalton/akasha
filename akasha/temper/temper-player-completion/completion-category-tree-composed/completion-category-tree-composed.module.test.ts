import { describe, expect, test } from "bun:test"
import { COMPLETION_CATEGORY_TREE_STATIC } from "../completion-category-tree/completion-category-tree.module.code.ts"
import type { CompletionCategoryNode } from "../completion-category-tree-types/completion-category-tree-types.module.code.ts"
import {
  ACCOUNT_ACHIEVEMENTS_CARD_ID,
  type AchievementHeading,
  CHARACTER_ACHIEVEMENTS_CARD_ID,
  composeCompletionCategoryTree,
} from "./completion-category-tree-composed.module.code.ts"

const ACCOUNT_HEADINGS: readonly AchievementHeading[] = [
  { name: "Recent Seasons", subCategories: [{ name: "General" }] },
  { name: "Crafting", subCategories: [{ name: "Enchanting" }, { name: "Provisioning" }] },
  { name: "Arenas", subCategories: [{ name: "Maelstrom Arena" }] },
  { name: "Imperial City", subCategories: [] },
]

const CHARACTER_HEADINGS: readonly AchievementHeading[] = [
  { name: "Crafting", subCategories: [{ name: "Enchanting" }] },
  { name: "Arenas", subCategories: [{ name: "Maelstrom Arena" }] },
]

function findCard(
  cards: readonly CompletionCategoryNode[],
  id: string
): CompletionCategoryNode | undefined {
  return cards.find((card) => card.id === id)
}

describe("the cards the composition is aimed at", () => {
  test("the static tree holds both achievement cards under the ids composed against", () => {
    expect(
      findCard(COMPLETION_CATEGORY_TREE_STATIC.account, ACCOUNT_ACHIEVEMENTS_CARD_ID)
    ).toBeDefined()
    expect(
      findCard(COMPLETION_CATEGORY_TREE_STATIC.characters, CHARACTER_ACHIEVEMENTS_CARD_ID)
    ).toBeDefined()
  })

  test("neither achievement card carries children before anything is composed", () => {
    expect(
      findCard(COMPLETION_CATEGORY_TREE_STATIC.account, ACCOUNT_ACHIEVEMENTS_CARD_ID)?.children
    ).toBeUndefined()
    expect(
      findCard(COMPLETION_CATEGORY_TREE_STATIC.characters, CHARACTER_ACHIEVEMENTS_CARD_ID)?.children
    ).toBeUndefined()
  })

  test("the companions tab holds neither achievement card", () => {
    expect(
      findCard(COMPLETION_CATEGORY_TREE_STATIC.companions, ACCOUNT_ACHIEVEMENTS_CARD_ID)
    ).toBeUndefined()
    expect(
      findCard(COMPLETION_CATEGORY_TREE_STATIC.companions, CHARACTER_ACHIEVEMENTS_CARD_ID)
    ).toBeUndefined()
  })
})

describe("composeCompletionCategoryTree hangs the headings", () => {
  test("the account achievement card gains one child per account heading, in order", () => {
    const tree = composeCompletionCategoryTree(ACCOUNT_HEADINGS, CHARACTER_HEADINGS)
    const card = findCard(tree.account, ACCOUNT_ACHIEVEMENTS_CARD_ID)
    expect(card?.children?.map((child) => child.id)).toEqual([
      "Recent Seasons",
      "Crafting",
      "Arenas",
      "Imperial City",
    ])
  })

  test("a heading is named by its own title under both id and name", () => {
    const tree = composeCompletionCategoryTree(ACCOUNT_HEADINGS, CHARACTER_HEADINGS)
    const card = findCard(tree.account, ACCOUNT_ACHIEVEMENTS_CARD_ID)
    const heading = card?.children?.[0]
    expect(heading?.id).toBe("Recent Seasons")
    expect(heading?.name).toBe("Recent Seasons")
  })

  test("a subheading is named by its own title under both id and name, in order", () => {
    const tree = composeCompletionCategoryTree(ACCOUNT_HEADINGS, CHARACTER_HEADINGS)
    const crafting = findCard(tree.account, ACCOUNT_ACHIEVEMENTS_CARD_ID)?.children?.[1]
    expect(crafting?.children).toEqual([
      { id: "Enchanting", name: "Enchanting" },
      { id: "Provisioning", name: "Provisioning" },
    ])
  })

  test("a heading with no subheadings carries an empty list rather than none", () => {
    const tree = composeCompletionCategoryTree(ACCOUNT_HEADINGS, CHARACTER_HEADINGS)
    const imperialCity = findCard(tree.account, ACCOUNT_ACHIEVEMENTS_CARD_ID)?.children?.[3]
    expect(imperialCity?.children).toEqual([])
  })

  test("the character card takes the character headings rather than the account ones", () => {
    const tree = composeCompletionCategoryTree(ACCOUNT_HEADINGS, CHARACTER_HEADINGS)
    const card = findCard(tree.characters, CHARACTER_ACHIEVEMENTS_CARD_ID)
    expect(card?.children?.map((child) => child.id)).toEqual(["Crafting", "Arenas"])
  })

  test("the two cards are hung separately though their headings share names", () => {
    const tree = composeCompletionCategoryTree(ACCOUNT_HEADINGS, CHARACTER_HEADINGS)
    const accountCrafting = findCard(tree.account, ACCOUNT_ACHIEVEMENTS_CARD_ID)?.children?.[1]
    const characterCrafting = findCard(tree.characters, CHARACTER_ACHIEVEMENTS_CARD_ID)
      ?.children?.[0]
    expect(accountCrafting?.children?.length).toBe(2)
    expect(characterCrafting?.children?.length).toBe(1)
  })

  test("no headings at all still hangs an empty list on the card", () => {
    const tree = composeCompletionCategoryTree([], [])
    expect(findCard(tree.account, ACCOUNT_ACHIEVEMENTS_CARD_ID)?.children).toEqual([])
    expect(findCard(tree.characters, CHARACTER_ACHIEVEMENTS_CARD_ID)?.children).toEqual([])
  })
})

describe("what the composition leaves alone", () => {
  test("the achievement card keeps every other field it stated", () => {
    const tree = composeCompletionCategoryTree(ACCOUNT_HEADINGS, CHARACTER_HEADINGS)
    const card = findCard(tree.account, ACCOUNT_ACHIEVEMENTS_CARD_ID)
    expect(card?.name).toBe("Achievements")
  })

  test("every tab keeps the count of cards the static tree holds", () => {
    const tree = composeCompletionCategoryTree(ACCOUNT_HEADINGS, CHARACTER_HEADINGS)
    expect(tree.account.length).toBe(COMPLETION_CATEGORY_TREE_STATIC.account.length)
    expect(tree.characters.length).toBe(COMPLETION_CATEGORY_TREE_STATIC.characters.length)
    expect(tree.companions.length).toBe(COMPLETION_CATEGORY_TREE_STATIC.companions.length)
  })

  test("every tab keeps the order of card ids the static tree holds", () => {
    const tree = composeCompletionCategoryTree(ACCOUNT_HEADINGS, CHARACTER_HEADINGS)
    expect(tree.account.map((card) => card.id)).toEqual(
      COMPLETION_CATEGORY_TREE_STATIC.account.map((card) => card.id)
    )
    expect(tree.characters.map((card) => card.id)).toEqual(
      COMPLETION_CATEGORY_TREE_STATIC.characters.map((card) => card.id)
    )
  })

  test("a card that is no achievement card crosses over as the very same card", () => {
    const tree = composeCompletionCategoryTree(ACCOUNT_HEADINGS, CHARACTER_HEADINGS)
    expect(findCard(tree.account, "lore-library")).toBe(
      findCard(COMPLETION_CATEGORY_TREE_STATIC.account, "lore-library")
    )
  })

  test("a card holding its own children keeps them untouched", () => {
    const tree = composeCompletionCategoryTree(ACCOUNT_HEADINGS, CHARACTER_HEADINGS)
    const scribing = findCard(tree.account, "account-scribing-knowledge")
    expect(scribing?.children?.map((child) => child.id)).toEqual(["grimoires", "scripts"])
  })

  test("the companions tab is carried across whole", () => {
    const tree = composeCompletionCategoryTree(ACCOUNT_HEADINGS, CHARACTER_HEADINGS)
    expect(tree.companions).toBe(COMPLETION_CATEGORY_TREE_STATIC.companions)
  })

  test("composing leaves the static tree unchanged, however often it runs", () => {
    composeCompletionCategoryTree(ACCOUNT_HEADINGS, CHARACTER_HEADINGS)
    composeCompletionCategoryTree([], [])
    expect(
      findCard(COMPLETION_CATEGORY_TREE_STATIC.account, ACCOUNT_ACHIEVEMENTS_CARD_ID)?.children
    ).toBeUndefined()
    expect(
      findCard(COMPLETION_CATEGORY_TREE_STATIC.characters, CHARACTER_ACHIEVEMENTS_CARD_ID)?.children
    ).toBeUndefined()
  })

  test("two composings do not share the card they each built", () => {
    const first = composeCompletionCategoryTree(ACCOUNT_HEADINGS, CHARACTER_HEADINGS)
    const second = composeCompletionCategoryTree([], [])
    expect(findCard(first.account, ACCOUNT_ACHIEVEMENTS_CARD_ID)?.children?.length).toBe(4)
    expect(findCard(second.account, ACCOUNT_ACHIEVEMENTS_CARD_ID)?.children?.length).toBe(0)
  })
})
