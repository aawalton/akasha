import type { Finding } from "../finding.page-type.ts"

export const theRootClaudeMdHeldOneRuleAndNoDomainHeldIt = {
  id: "01a06551-09dd-7bff-bc49-5c0078ad2496",
  pageTypeSlug: "finding",
  slug: "the-root-claude-md-held-one-rule-and-no-domain-held-it",
  domainSlug: "domain/change",
  claim:
    "The repo root's CLAUDE.md carried the Atomic Commit rule and no akasha domain carried it, so the migration landed it on the change domain under the released approvals rather than losing it. Alan owes the directive a review.",
  evidence:
    "CLAUDE.md at the repository root was eleven lines and held one rule: stage and commit in one command, naming the paths that commit is for, because main's worktree is shared by every agent and anything staged and not committed is swept up. A search of `akasha/` for `Atomic Commit` and for `Stage and commit in one command` matched only `an-ignored-declaration-compiles-here-and-not-in-any-git-built-tree.finding.ts`, which cites the rule by name and does not say what it is. No domain carried it.\n\nThe act is already enforced. `akasha/hook-system/agent-hooks/block-git-writes/block-git-writes.agent-hook.ts` says `A git write is refused unless the call names its paths and every path sits outside akasha/`. What that hook cannot reach is the atomicity: its own gap says `A hand-written commit does not leave the index stamp behind HEAD`, and its constraint says `What a commit would carry is in the index rather than on the command line`. The enforcement therefore covers naming the paths and not committing in one call.\n\nThe directive was added to `akasha/changes/change.domain.ts` at commit 9c4c77d1, a domain defined as `everything one act edits` whose first invariant is `Nothing lands but through an akasha command or a service`. `Alan Approves Directives` on `akasha/domain-system/domains/domain.page-type.ts` covers this addition, and the initiative constraint `All Alan approvals are released for this migration` released it. CLAUDE.md was then removed as migrated content, on the match that its whole body is now that directive.\n\nWhat Alan may want to change: the third aid, `A command that lands names its own paths for the same reason`, is new rather than carried over from CLAUDE.md.",
} as const satisfies Finding
