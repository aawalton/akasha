import type { Finding } from "../finding.page-type.ts"

export const threeReadersStillNameStoryChapterTypesThatNoLongerExist = {
  id: "01a06868-8fab-750f-afba-1e977e67c5b9",
  pageTypeSlug: "finding",
  slug: "three-readers-still-name-story-chapter-types-that-no-longer-exist",
  domainSlug: "domain/akasha-migration",
  claim:
    'Three akasha files still name the page type slugs `story-chapter-wandering-inn` and `story-chapter-royal-road`, which no longer exist anywhere in the repo. The page type definitions went in 10e2ed47f6, which folded them into `story-chapter-read`; their data pages went in e46fe627c0. `stories-the-wandering-inn.view.ts` therefore carries `drawsSlug: "story-chapter-wandering-inn"` against a type with no pages, and draws nothing.',
  evidence:
    'Read 2026-09-03, after both removals. The three: `akasha/story/wandering-inn/chapter/chapter.module.code.ts` line 3 declares `CHAPTER_PAGE_TYPE = "story-chapter-wandering-inn"`; `akasha/pages-system/views/pages/stories-the-wandering-inn.view.ts` line 9 declares `drawsSlug: "story-chapter-wandering-inn"`; and `akasha/alan/library/reading/offline-reading/offline-reading.module.code.ts` line 7 declares `READ_CHAPTER_TYPES = ["story-chapter-royal-road", "story-chapter-wandering-inn"]`.\n\nThat neither slug survives: `git ls-tree -r HEAD --name-only | grep story-chapter-wandering-inn` and the same for `story-chapter-royal-road` both return nothing. `git log --diff-filter=D` dates the type definitions to 10e2ed47f6 at 11:44:25 ("the story-chapter page types migrate into the read, written and played trio") and the eight wandering-inn data pages to e46fe627c0 at 11:40:58. The two removals are halves of one migration, not a conflict: the successors stand as `story-chapter-read`, and the eight pages were verified carried field-for-field before they went.\n\nThe repointing is one slug in each of the three files, to `story-chapter-read`. I did not make it: the view and the two modules belong to other lanes and `story-chapter-read` groups all stories rather than the wandering inn alone, so the view would need a narrow on `partOfSlugs` that I have not designed.\n\nNot measured: I did not run the view or either module, so I state which slug they name and that no page carries it, not what a reader sees.',
} as const satisfies Finding
