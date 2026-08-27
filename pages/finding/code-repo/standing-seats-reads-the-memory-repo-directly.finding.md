---
id: de17fd6c-dd20-5a75-ac42-1339575dee5d
page-type-slug: finding
title: "Standing seats reads the memory repo directly"
domain-slug: repo/code-repo
---

# Claim

`code-repo` intent says the code repo reaches another repo's content only by page query. `standing-seats` reaches `memory:seats/*.md` with `readdirSync`, `readFileSync` and its own YAML frontmatter parser, and so does `seat-session-lineage` beside it.

# Evidence

Measured 2026-08-20, moving `@agents/shared/standing-seats` out of `packages/agents` and into `packages/infra/git/cli/src/lib/standing-seats.ts`.

The module takes `memoryRoot()` from `@alanwalton/projects-core/lib/project-document`, appends `seats`, `realpathSync`s it, then `readdirSync`s the directory and `readFileSync`s every `.md` under it. It parses each seat's frontmatter itself, with `Bun.YAML.parse` between the first two `---` fences, and reads the `id` and `project-seq` keys straight out of the resulting object. No page query is involved at any point.

`packages/agents/shared/seat-session-lineage.ts` does the same on the same directory, for the `claude-code-session-uuid` key, and reaches further: it shells `git show` against the memory repo across a depth of 50 commits to recover sessions from seat pages that no longer stand.

The consumer is `worktree-reconcile`, which asks which seats hold which project seq before it removes a worktree. A read that answers wrongly there removes a worktree a seat is sitting in.

The relocation carried this across unchanged rather than repairing it, on the grounds that a repair mixed into a move is a second change wearing the first one's diff.

Not measured: whether a page query can answer this at all today, or what it would cost `worktree-reconcile` to ask one. `seat` is a file page type under `memory:seats/*.md`, so the rows the query would read are the same files — the question is whether a query can reach them, not whether the data is there.
