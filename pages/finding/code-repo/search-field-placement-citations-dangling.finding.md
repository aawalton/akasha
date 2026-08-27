---
id: 82f1c11a-e91c-5ec0-ac07-c3d5187771f6
page-type-slug: finding
title: "Search field placement citations dangling"
domain-slug: repo/code-repo
---

# Claim

Four live files in the code repository cite a document called "Search-Field Placement" that no longer exists in any repository, so a reader who follows the pointer finds nothing and cannot tell whether the reasoning it stood for was retired or merely moved.

# Evidence

`rg -n "Search-Field Placement"` across `~/code`, hidden files included and `node_modules` and `.git` excluded, returns four hits:

- `.gitignore:84` — "Grep from any worktree hits it. See Search-Field Placement."
- `.ignore:8` — "projection. See Search-Field Placement."
- `packages/shared/pages/fs-projector/src/checkouts.ts:6` — "main repo plus every project worktree. See Search-Field Placement."
- `packages/infra/git/cli/src/lib/worktree-ops.ts:220` — "makes a brand-new worktree greppable (see Search-Field Placement). It is"

The document those name stood at `dirty/docs/search-field-placement.md` in the instructions repository, under quarantine rather than live, and was emptied a block at a time and removed on 2026-08-07 at commit b3e1b925. Every one of its ten blocks was cut; nothing was kept and nothing was promoted, so there is no successor document the four citations could be repointed at.

The citations are not load-bearing in the sense of carrying reasoning that went with the document. Each of the four sites states its own rationale inline and then cites the document as corroboration — `.ignore:1-8` gives both ripgrep precedence facts in its own header, and `checkouts.ts:1-7` gives the whole untracked-content-does-not-follow-a-worktree argument in its own. What is lost is a pointer, not an explanation.

The reason this is worth recording rather than left to be noticed: a dangling "See X" reads exactly like a live one. Nothing in the code repository resolves the name, no check spans the two repositories to report it, and the instructions repository's own `[mentions]` gate reported 0 stranded mentions on the removal because it measures that repository. Filed at the removal rather than after it, because the removing seat is the only party who knows the four sites were reachable an hour earlier.
