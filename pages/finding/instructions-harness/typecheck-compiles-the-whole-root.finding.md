---
id: 2d7289c6-9d0a-5f56-9a6e-c36537006a07
slug: typecheck-compiles-the-whole-root
page-type-slug: finding
title: "Typecheck compiles the whole root"
domain-slug: domain/global
---

# Claim

The `typecheck` gate compiles every `.ts` file anywhere under the instructions root, so any tree an agent leaves there refuses every TypeScript write in the estate until it is moved.

# Evidence

`tools/lib/materialize.ts` gathers the module graph with `new Bun.Glob("**/*.ts").scanSync({ cwd: subject.roots.instructions })`, filtered only by `isDirty`. Nothing narrows it to what the repository tracks, and nothing narrows it to what any schema, verb or gate could import.

Observed on 2026-08-02. `code-server-explore/` — an untracked clone of code-server, its own `.git` inside it, dropped in the root at 10:51 by the seat holding row #17537 — put 1271 errors across 68 files into the gate's verdict, every one a `TS2307: Cannot find module` for a dependency the clone never had installed here. `bun tools/write.ts --file-path tools/document/schemas/ruling.ts …` refused on `typecheck` with that count, having passed every other gate. The tracked tree was clean throughout: `git ls-files '*.ts'` copied to a temp directory with the proposed body beside it, under the gate's own generated config, printed no diagnostic at all.

The refusal names files the writer did not touch, for imports it cannot resolve, and points at the diagnostics rather than at the tree — so the reader goes looking for what they broke.

Two properties make this recur rather than being one seat's mistake. An exploration clone in the root is an ordinary thing for a seat to do and nothing refuses it at the moment it lands; and the seat it blocks is never the seat that put it there, because the one who dropped it is working in the code repository. The blocked seat cannot clear it either — foreign state is another agent's work until proven otherwise, and proving it takes a message and a wait.

`git ls-files` is not obviously the answer: the gate materializes `subject.pending` precisely because a file the act creates is tracked by nothing yet. What the graph wants is the tracked set plus what the call is writing, which is a different question from what the disk holds.

Very likely one finding with `stray-checkout-fails-every-write`, filed the same day against the same outage. A classify pass's call.
