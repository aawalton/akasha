import type { Finding } from "../finding.page-type.ts"

export const gitLsFilesReadsTheIndexSoACarriageCheckReportsAFalseClean = {
  id: "01a0680a-6996-727c-bb13-f65d1265aa3c",
  pageTypeSlug: "finding",
  slug: "git-ls-files-reads-the-index-so-a-carriage-check-reports-a-false-clean",
  domainSlug: "domain/akasha-migration",
  claim:
    "`git ls-files` answers from the index rather than from a commit, so a file staged and never committed reads as carried. A carriage check built on it is blind to the one loss this migration has no backstop for: a blob reachable from the index alone, which a reset, a checkout or a gc drops with no history to recover it from. `git ls-tree -r HEAD` is the question that was meant.",
  evidence:
    "`841d691e1d` deleted 266 `story-chapter-royal-road` files without naming them. A check asking `git ls-files` for their counterparts answered 266 of 266 and reported the carriage clean. `git ls-tree -r HEAD` over the same paths answered 200. The other 66, `melody-of-mana-0061` through `0126`, were `git add`ed and in no commit at 132 files, with a further pair at `0127` the same way.\n\nThe two commands disagree only in this state, which is why the wrong one looks right for as long as nothing has been staged and abandoned. A swarm that stages before it commits produces that state constantly.\n\nSeeded both directions before believing the zero: `stray-cat-strut` returned 1580 entries from `git ls-tree -r HEAD` and `melody-of-mana-0061` returned 0, so a live instrument and a real absence rather than one string that reads as both. Without the positive control a broken search and a true absence would have read alike.\n\nThe 134 files were landed at `de9a6c5e5f` and are reachable from a commit now.",
} as const satisfies Finding
