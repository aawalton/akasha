---
id: 79ad2495-61e4-56bd-a813-bb1febd8096e
slug: core-lib-routes-to-absent-docs
page-type-slug: finding
title: "Core lib routes to absent docs"
domain-slug: barred-meaning/project
---

# Claim

Two live modules under `packages/alanwalton/projects/core/src/lib/` route a reader to documents that exist nowhere. `external-block.ts:36` links `[external-block.md](../docs/external-block.md)` as its "full design record"; `dispatch-predicates.ts:95` names `project-dependency-graph.md` as what its terminal-release rule aligns with. No tracked markdown stands anywhere under `packages/alanwalton/projects/**`, so both pointers read as coverage and resolve to nothing.

# Evidence

Measured 2026-08-08 against `~/code` on `main`, while ingesting the second of the two out of `dirty/code/`.

The package holds no markdown at all. `git ls-files 'packages/alanwalton/projects/**/*.md'` returns no output, exit 0; `git ls-files '*external-block.md' '*project-dependency-graph.md'` over the whole repo returns nothing either. So `../docs/external-block.md` resolves to no file whichever way the relative path is read.

Quoted from the live tracked source. `external-block.ts:36`: "Full design record, including the candidates rejected: `[external-block.md](../docs/external-block.md)`". `dispatch-predicates.ts:95`: "Terminal-release aligns this gate with the persona boot digest's dependency-blocked classification and `project-dependency-graph.md` (Ubiquitous Naming — one deps rule)."

The two differ in what is left. `project-dependency-graph.md` is gone from both repos — it stood under `dirty/code/` and I emptied and removed it in this sweep. `external-block.md` still stands at `dirty/code/packages-alanwalton-projects-core-docs-external-block.md`, quarantined and queued for its own emptying, so that pointer is already dead against `~/code`.

The class is exactly these two here: `rg --pcre2 '\]\((?:\.\./)*docs/[a-z0-9-]+\.md\)'` over `packages/alanwalton/projects/` returns the one `external-block.ts` line and nothing else. The second pointer is bare prose rather than a link, so no link-shaped search reaches it and nothing mechanical reports either.

The second is load-bearing in a way the first is not: code naming a DOCUMENT as its carrier is the strongest evidence that document is live, and it disqualified filter 3 for that whole ingest.

Neighbours I opened, none of them this: `pages/finding/handler/context-doc-names-nothing-live.finding.md`, `pages/finding/temper/rule-names-cited-from-quarantine.finding.md`, and `pages/finding/project/backward-move-note-outlives-its-carrier.finding.md`, a removed note form in this same package.
