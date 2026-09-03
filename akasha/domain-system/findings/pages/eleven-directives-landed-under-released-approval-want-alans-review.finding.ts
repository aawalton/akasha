import type { Finding } from "../finding.page-type.ts"

export const elevenDirectivesLandedUnderReleasedApprovalWantAlansReview = {
  id: "01a06599-4683-774e-9284-8011b2fb7561",
  pageTypeSlug: "finding",
  slug: "eleven-directives-landed-under-released-approval-want-alans-review",
  domainSlug: "domain/akasha-migration",
  claim:
    "Eleven directives were added to five akasha pages while reconciling the old domain-system pages, each covered by an Alan Approves directive whose approval the migration initiative releases. Every one is a rule Alan had already written on a `pages/domain` page that akasha carried nowhere, reworded only to fit the act, warrant and aids shape. None is new policy, but all eleven bind every reader of those pages and want his review.",
  evidence:
    "Landed 2026-09-02. On `akasha/code/code.domain.ts`, commit 2cb3d679: Bounded Wait, Split First and Real Path, the three rules of `code-quality.domain.md` that were not already code-checks. On `akasha/design/design.domain.ts`, commit 6ed8015f: Nothing Unexplained from `design.domain.md`, Share An Edge from `alignment.domain.md`, and Obvious Or None, Color Earns Attention and Failure Is Boring from `contrast.domain.md`. On `akasha/required-reading/required-reading.domain.ts`, commit 860b8de0: Dilution and Cut The Obvious from `context-push.domain.md`, its third principle Simple Language being already carried by the `invariant-statement-is-plain` check. On `akasha/command-system/commands/command.page-type.ts`, commit 6004b414: Repeating Problem from `command.domain.md`.\n\nEach was checked against akasha before landing, by the directive's name and by the wording of its warrant. The only hit any of the names returned was a temper character class called No Class, which is a game class rather than a rule.\n\nThe warrants are Alan's own words. Where a statement had to change to pass the plainness check it was split rather than reworded: an invariant joining two facts at a comma became two invariants.\n\nThe alternative was to delete the rules with their pages, which would have lost them, or to keep 93 markdown pages alive to hold eleven rules.",
} as const satisfies Finding
