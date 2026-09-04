import type { Finding } from "../finding.page-type.ts"

export const theComposedCategoryTreeKeysAchievementHeadingsByTitleSoTheCharacterOnesHaveNoPath = {
  id: "01a06411-b9bb-7d45-b8f5-d84e23459bfb",
  pageTypeSlug: "finding",
  slug: "the-composed-category-tree-keys-achievement-headings-by-title-so-the-character-ones-have-no-path",
  domainSlug: "domain/temper",
  claim:
    "The composed completion tree names each achievement heading by its game title, so the two tallies collide on every heading. All 20 character titles repeat an account title, and a path is looked for under account first, so no character achievement heading is reachable by `getCompletionNodePath`. The landed pages carry `account-crafting` and `character-crafting`, which would tell the two apart, and the tree drops that prefix.",
  evidence:
    'Carried across from `temper/player-completion/src/completion-category-tree-data.ts:11-18`, where `buildAchievementChildren` sets `id: cat.name` for a heading and `id: sub.name` for a subheading. The recreation at `akasha/temper/temper-player-completion/completion-category-tree-composed/completion-category-tree-composed.module.code.ts` keeps that, so the defect is inherited rather than introduced.\n\nThat the titles collide is measured by an earlier finding, `the-two-achievement-tallies-are-told-apart-by-a-slug-prefix`: every one of the 20 character category names and all 26 character `category/subcategory` paths repeat an account one.\n\nProved by two tests landed at `5b5c21a47f`. In `completion-category-tree-utils.module.test.ts`, `getCompletionNodePath("Crafting", TREE)` answers `[account-achievements, Crafting]` while the character tree holds a `Crafting` heading of its own; in `completion-category-tree-composed.module.test.ts`, the account heading answers 2 subheadings against the character heading\'s 1, so both nodes are there and only one is reachable.\n\nWhat a reader asks for by tab is unharmed: `getCompletionNodeChildren("Crafting", "characters", TREE)` answers the character subheadings, because children are asked for under one named tab. Only the path reading is one-sided.\n\nNot fixed here, because changing the id would change what the completion window keys a card on, and the picker spine is another seat\'s work this same night.',
} as const satisfies Finding
