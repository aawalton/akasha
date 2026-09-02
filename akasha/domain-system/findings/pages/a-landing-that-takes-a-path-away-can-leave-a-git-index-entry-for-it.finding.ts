import type { Finding } from "../finding.page-type.ts"

export const aLandingThatTakesAPathAwayCanLeaveAGitIndexEntryForIt = {
  id: "01a06259-3e2f-7858-98fa-512fa1eb8d49",
  pageTypeSlug: "finding",
  slug: "a-landing-that-takes-a-path-away-can-leave-a-git-index-entry-for-it",
  domainSlug: "domain/akasha",
  claim:
    "A landing that takes a path away can leave a git index entry for that path after HEAD no longer carries it. No akasha command clears such an entry, and both git repairs for it are refused, so the one route left is `git update-index --force-remove`, which the guard does not name.",
  evidence:
    "Measured 2026-09-02 at 8eb269ca67. An `akasha write` naming three paths, one of them `--remove`, answered `40 checks judged the 3 paths asked for, and none refused` and `committed as 8eb269ca67`. `git status --porcelain` then read `AD` for the removed path: gone from HEAD, gone from disk, held in the index at blob 7aac53be. `restore-akasha-when-dirty` fired on every later call, saying one path went back as HEAD has it, though nothing was on disk for it to put back and it put nothing back. `git reset -q HEAD -- <path>` is refused by `block-destructive-git` for moving HEAD; `git restore --staged -- <path>` is refused by the same guard for writing the working tree. Neither does what it is refused for when it is handed `--` and one path. `git update-index --force-remove -- <path>` cleared the entry, on the second try, the first losing to a `.git/index.lock` another lane held. `committing` writes the git index before the branch moves, so a reader between those two acts sees HEAD still carrying the path while the index does not, which is the window this fell into. The entry costs no commit its content, since a commit is built from trees, and the next landing rewrites the index; what it costs is every later call, each one refused by the hook.",
} as const satisfies Finding
