import type { Finding } from "../finding.page-type.ts"

export const theRestoredPlayedSceneAndItsInteriorityCarryNoPageType = {
  id: "01a0680a-6997-7487-82cd-2acbc7975c5d",
  pageTypeSlug: "finding",
  slug: "the-restored-played-scene-and-its-interiority-carry-no-page-type",
  domainSlug: "domain/akasha-migration",
  claim:
    "The 392 files back at `dirty/coffee-shop-date/` are a played scene of 1,539 words and 390 files of per-turn character interiority, and no page type in akasha fits them. What blocks carriage is a story title and a chapter title the data does not hold. Deriving those from the folder name would be inventing them, so the titles are Alan's to give.",
  evidence:
    "Restored at `ca80aa2668`, `e2e7aab5e0` and `b3215cf615` from `ad78a41f4c^`, each body read back off the disk byte for byte.\n\n`story/chapters/1.md` holds 1,539 words counted rather than taken from the audit. Under `characters/`, the 195 `immediate/` files are all distinct at 20,636 words together, and the 195 `stable/` files hold 15 character-sheet bodies repeated across the 13 turns.\n\n`story-chapter-read` is for chapters Alan read rather than ones he played, and nothing in akasha takes per-turn interiority at all, so the gap is a page type rather than a folder.\n\nFiled as new work rather than as the old finding restored, which is what the page type says to do. Its predecessor was deleted in the same commit as the content it described. That is the part worth carrying: the deletion removed the record that contradicted it in the same act, so nothing was left to review the deletion by, and the justification given — that Alan ruled this an experiment — survives on no record anywhere in the repository.",
} as const satisfies Finding
