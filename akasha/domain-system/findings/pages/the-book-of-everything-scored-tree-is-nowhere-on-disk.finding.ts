import type { Finding } from "../finding.page-type.ts"

export const theBookOfEverythingScoredTreeIsNowhereOnDisk = {
  id: "01a06589-aff9-7000-a725-2c1327d37bdf",
  pageTypeSlug: "finding",
  slug: "the-book-of-everything-scored-tree-is-nowhere-on-disk",
  domainSlug: "domain/authoring",
  claim:
    "The Book of Everything's scored node tree is on no disk here. Its own tools read a `book-of-everything/` folder at the repository root, and there is none, in this repository or in the backup. So the coverage numbers migrated as the `book-of-everything-coverage-dashboard` record cannot be computed again, and the three records migrated out of `dirty/book-of-everything/` are the whole of what is left of the Book.",
  evidence:
    'Measured 2026-09-02 while migrating the three files in `dirty/book-of-everything/` into `book-record` pages.\n\n`tools/lib/book-of-everything-root.ts` throws unless `book-of-everything/` is under `ownRepoRoot()`: "book-of-everything is not in ${root}, so every reading over it would be taken from nothing."\n\nThe folder is absent from `/var/home/walton/repos/akasha` and from `/var/home/walton/repos/akasha-backup-2026-09-02`. A search over `/var/home/walton` to three levels deep answers with two copies of `dirty/book-of-everything` alone, both holding the same three documents.\n\nWhat the Book kept elsewhere is thin: `pages/book/book-of-everything.book.md` carries a title and one HTML comment, and `pages/domain/book-of-everything.domain.md` carries a definition. Neither holds a D score. `pages/book-chapter/` holds folders for all-about-alan, my-faith, my-math and my-strategy, and none for book-of-everything.\n\nSo the dashboard\'s numbers are the last reading rather than a value anything can take again, and the D scores under them are gone. The rotation queue names about forty cells by path (`06-art/02-particular-arts/10-game-design` and its like) that resolve to nothing.\n\nNot probed: whether the tree is in a git history somewhere, or on a machine other than this one.',
} as const satisfies Finding
