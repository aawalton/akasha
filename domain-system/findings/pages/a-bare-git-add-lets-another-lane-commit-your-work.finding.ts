import type { Finding } from "../finding.page-type.ts"

export const aBareGitAddLetsAnotherLaneCommitYourWork = {
  id: "01a05e65-7b6f-72ae-8f02-a81ff4d330fc",
  pageTypeSlug: "finding",
  slug: "a-bare-git-add-lets-another-lane-commit-your-work",
  domainSlug: "page-type/finding",

  claim:
    "Staging with `git add` and committing in a second call leaves the content staged in the shared index between the two. With several lanes committing minutes apart, another lane's commit picks the staged files up and carries them under its own message. The work lands, correct, attributed to a change it has nothing to do with.",
  evidence:
    "Measured on 2026-09-01. I ran `git add -- <four paths> && git commit -m ... `. The `git add` succeeded; `block-git-writes` then refused the commit and told me to name the paths after `--`. When I re-ran the commit properly, git answered `nothing to commit, working tree clean`. `git log -- <paths>` showed the four files' most recent commit was `2e51456524`, `Follow the game core package to its new name outside akasha` — another lane's rename, whose stat lists a dozen `alanwalton/web/app/awen/` files and, silently, my four. `git show 2e51456524:alanwalton/web/app/routes/api.categorization.ts` carries my `answerReadoutAdmittedBy` text, and `git diff HEAD` over the four paths is empty.\n\nNothing was lost and nothing was wrong, which is what makes it worth writing down: the failure is entirely in the record. Anyone reading that commit later sees a package rename and four unrelated route and check files, and anyone bisecting the categorization repoint finds it under a message that does not mention it.\n\nThe repo rule already says to stage and commit in one command naming the paths, and `block-git-writes` enforces the commit half. It does not enforce the staging half, and `git add` on its own is not refused — so the rule holds only where the writer already keeps it. I did not keep it, and the gap between my two calls was long enough for another lane to land.\n\nThe call taken: filed rather than fixed. Refusing a bare `git add` outright would be the obvious guard, but staging is legitimate on its own for other reasons, and whether that trade is worth making is not mine to decide alone.",
} as const satisfies Finding
