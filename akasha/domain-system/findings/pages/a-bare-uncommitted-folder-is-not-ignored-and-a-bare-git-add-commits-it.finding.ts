import type { Finding } from "../finding.page-type.ts"

export const aBareUncommittedFolderIsNotIgnoredAndABareGitAddCommitsIt = {
  id: "01a0697d-0dba-7b9f-9e9d-8404bf2897ba",
  pageTypeSlug: "finding",
  slug: "a-bare-uncommitted-folder-is-not-ignored-and-a-bare-git-add-commits-it",
  domainSlug: "domain/akasha-migration",
  claim:
    "`.gitignore:2` was `*.uncommitted.*`, which needs a suffix segment after `uncommitted`. A folder named `<something>.uncommitted` matched nothing, so a lane that named its scratch folder for the rule was not covered by it, and a bare `git add` swept two of its files into another lane's commit. The rule now carries a `*.uncommitted/` line beside it.",
  evidence:
    "Measured 2026-09-03. `git check-ignore -v --no-index` exits 1 with no output for `lane-loose-tmp.uncommitted` and for `g2-seed.uncommitted`, and exits 0 naming `.gitignore:2:*.uncommitted.*` for `flat03.uncommitted.d` and `seed.uncommitted.d`. The difference is the trailing dot segment and nothing else.\n\nWHAT IT COST. `git log --diff-filter=A --date=iso -- lane-loose-tmp.uncommitted/` names one commit: 48c5b62df8 at 16:39:43, 'carried thirty-one tools/lib seat modules into @akasha/seat-system and repointed every reader'. That commit's stat holds no path under `lane-loose-tmp.uncommitted/` in its own subject, and the two files it added there — `akasha-work-tree.command.code.ts` and `probe-work-tree.ts` — carry mtimes inside the same minute, so they were live scratch the add reached rather than work the lane meant to land.\n\nWHY THE NAMING LOOKED SAFE. `.uncommitted` reads as a declaration of intent, and three other spellings in the tree do work: `.uncommitted.d` for a folder, `.uncommitted.ts` for a file, `.uncommitted.diff` for a patch. The one shape a person reaches for first is the one that failed.\n\nAdding the rule does not untrack what is already tracked, so the two files stay in the index until the lane that owns them settles them.\n\nNeighbour: `a-bare-git-add-lets-another-lane-commit-your-work` records the add side of this.",
} as const satisfies Finding
