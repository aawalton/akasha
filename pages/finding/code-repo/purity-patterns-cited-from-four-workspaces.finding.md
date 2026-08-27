---
id: 56b577a7-bbde-57ea-b5fe-6a7275bb2594
page-type-slug: finding
title: "Purity patterns cited from four workspaces"
domain-slug: repo/code-repo
---

# Claim

Four live modules, in four different workspaces, cite *Functional Purity Patterns* by title, and
the document is gone: `dirty/docs/` is empty and nothing of it was kept under
`dirty/maybe-keep/docs/`. The citations name a title rather than a path, so the `[mentions]` gate
that runs at removal sees none of them, and a reader who follows one is told a document exists
that they cannot open. The title is the rare form: 97 tracked files carry its phrase and 206 the label `Purity:`.

# Evidence

Read 2026-08-07 against `~/code` at main `47a2a573e45a469061c65aaa2db522a65fa473d4`. Recount 2026-08-08 over tracked `packages/**`: 97 the phrase, 206 the label, 440 the word. Body at `8c91cf18d`.

Found with `rg -n -U --multiline-dotall "Functional\s+(//\s*)?Purity"` over the code repo,
excluding `dist/` and `node_modules/` — the multiline form, because a citation of this kind is
known to wrap a line with a `//` inserted mid-phrase. Four hits, each in a different workspace:

- `packages/shared/pages/fs-projector/src/watermark.ts:7` — "functions are the pure selection
  logic (Functional Purity Patterns: pure core".
- `packages/shared/pages/ui/src/components/use-live-now.ts:12` — "interval loop is the worse
  smell (Rule of Three / Functional Purity)".
- `packages/alanwalton/personas/cli/src/persona/persona-attributes.ts:8` — "this pure core each
  under the file-length cap (Functional Purity: pure core /".
- `packages/agents/cli/src/agent/inbox-core.ts:6` — "client (Functional Purity Patterns — pure
  core / effectful shell)".

The target is gone rather than merely quarantined. `ls dirty/docs/` in the instructions repo
returns nothing, and `dirty/maybe-keep/docs/` holds no `functional-purity-patterns` under either
name, so the seat that emptied that source kept none of it. Nothing live carries the name either:
`rg -n -i "purity|\bpure\b|decider|imperative shell|functional.core" domains/` returns three
unrelated hits.

`pages/finding/infra/check-docblocks-cite-quarantine.finding.md` records the same shape for two other titles
across three modules under `packages/infra/`. This is a separate instance: four different files, a
different vanished document, and a spread across four workspaces rather than one, which is what
says the class is not confined to the infra tree.

Found ingesting `dirty/questions/purity-doctrine.md`, which asserted the estate meets this claim
only inside package head documents. It does not — these four are ordinary source files, and all
four outlive the heads.
