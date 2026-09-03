import type { Finding } from "../finding.page-type.ts"

export const aPlayedChapterAndItsCharacterInteriorityCarryNoPageType = {
  id: "01a064c6-1df0-779d-b301-b261aba17de0",
  pageTypeSlug: "finding",
  slug: "a-played-chapter-and-its-character-interiority-carry-no-page-type",
  domainSlug: "domain/story-engine",
  claim:
    "A played chapter and 390 files of per-turn character interiority sit in `dirty/coffee-shop-date` carrying no page type, and no code names the folder.",
  evidence:
    "The folder holds 392 files. One is `story/chapters/1.md`: 8,290 bytes of finished scene prose, 1,539 words, with no frontmatter and so no id, no title and no page type. The other 390 are `characters/<element>/<index>/<layer>/<facet>.md`, which is 3 elements by 13 indices by 2 layers by 5 facets exactly. `scene.json` calls `abby` and `alan` agents and `coffee-shop` a setting. The layers are `immediate` and `stable`; the facets are `do`, `feel`, `know`, `perceive` and `want`. All 15 stable facets hold the same bytes at every one of the 13 indices, and all 15 immediate facets differ at every index, so the index counts turns and the stable layer is one value per element rather than thirteen. Abby is a persona, and every played story whose cast is personas names the `personas` world, so the world this story is of is already a page. Nothing else is: no story page, no chapter page, and no page type for what a character holds at a turn. Two facts argue against reading this as the game engine's own: the folder arrived whole in one dump at `f015af303a` on 27 August, and no tracked file outside `.git` spells `coffee-shop-date`, so no code reads it. The 139 turns landed at `e9116d8e1c` came from `story-turn` files mirrored by `game-turn` rows, and this folder matches neither shape. What it needs before migrating is a title for the story and a title for the chapter, neither of which the data carries.",
} as const satisfies Finding
