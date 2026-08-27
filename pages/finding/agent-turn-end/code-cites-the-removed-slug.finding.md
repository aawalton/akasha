---
id: fba132d6-aaa6-5ca0-bac2-51e0ce19aba9
page-type-slug: finding
title: "Code cites the removed slug"
domain-slug: domain/agent-turn-end
---

# Claim

Eight source files in the code repository still name `domains/seat-turn-end.md`, a document that no longer exists, and `ops seat halt-census --help` prints the dead path twice to anyone who asks what rule it measures.

# Evidence

Measured 2026-08-11, on a `review-instructions` reading of `domains/agent-turn-end.md` dispatched from `review-documents`. The reading named the help text; the count below was taken here rather than from it.

`domains/seat-turn-end.md` does not exist; the domain became `domains/agent-turn-end.md`. A grep of the instructions repository for the old slug across `*.ts`, `*.sh` and `*.md` returns nothing — the last one, `tools/lib/halt-census-shell.ts`, was repaired by that reading at `e11e35c95`, having been missed when its sibling `legal-endings.ts` was repointed at `2a01c1f14`.

Under `/var/home/walton/code`, eight files still carry it: `packages/agents/cli/src/agent/` holds `halt-census.ts`, `halt-census-core.ts`, `halt-census-shell.ts`, `halt-census-baseline.ts`, `interactive-census.ts`, `interactive-census-core.ts`, `interactive-cases.unit.test.ts` and `registry.ts`.

`ops seat halt-census --help` prints it twice — in the one-line summary ("for the rule stated at `domains/seat-turn-end.md`") and under the heading WHERE THE RULE IS STATED. So an agent asking the command where its rule lives is sent to a path that resolves to nothing.

No check catches it in either tree: `links-resolve` passes 94 of 94 because it reads markdown links, not backtick paths inside comments and help strings.

Not measured: how many of the eight are comments against strings a reader sees, or what the change would cost beyond the project, worktree, CI and deploy the reading named.
