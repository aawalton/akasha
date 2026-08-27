---
id: c2d3ef0e-1aa8-525d-879d-6e39215fedef
slug: three-value-collapse-undocumented
page-type-slug: finding
title: "Three value collapse undocumented"
domain-slug: domain/instrument
---

# Claim

The principle that a function whose return type cannot express "undetermined" will silently report failure as a healthy negative — a code-level instance of the ratified rule that an instrument's negative is evidence only if it could have returned the positive — is unwritten anywhere in `.claude/docs/` or `docs/`, despite being independently ratified in-tree at least five times.

# Evidence

Project #16080, domain `instrument`. Surfaced by #15968. Not authored unilaterally as a Functional Principle — that would add a row to the root CLAUDE.md index, a shared high-traffic surface — so the author judged it deserved a decision rather than a drive-by addition. Carried no objective; notes only.

VERIFIED UNDOCUMENTED, with a control: `grep -rlai` over `.claude/docs/` + `docs/` for "could not determine", "indistinguishable from", "silent negative", "suppressed error channel", "conflat.*negative" → one hit, a coincidental phrase in `component-layout-padding.md` about visual layout, unrelated to this claim. Control query "exhaustive dispatch" → 4 hits, confirming the search works.

FOUR RATIFICATIONS IN-TREE:
1. #7222 (`00399671b7`) — removed a silent-skip arm from `checkForUpdate`, moved the distinction to a loudly-logging caller.
2. Same commit hour/author, `upload.ts` vs `updater.ts` (`7f7851d730`, fixes #3891), same failure class: `upload.ts` got a discriminated error; `updater.ts` a bare `{available:false}`.
3. #15958's `run-outcome.ts:5-8`: a hidden tray child's only other output is an unopened log, so the server learns what failed only if the watcher says so.
4. `watcher-tray/src/updater.rs`, the Rust sibling on the same contract, returns a three-arm `UpdateOutcome` and logs the healthy case; the TS twin stayed silent four months.

A FIFTH, found the same night: `pricing-source.ts:67-72` maps `priceSource === undefined` (inline: "predates addon stamping") onto the same `"none"` a healthy scan returns. Legacy path, not current risk, same collapse.

WHAT A DOC WOULD SAY: prefer a discriminated union with a named undetermined arm over a boolean/nullable; make the classifier total; log/propagate the reason at the boundary. Exemplars: `UpdateCheck`, `SourceUpdateResult`, `UpdateOutcome`, `SyncOperationState`.

DISTINCT from `.claude/docs/aggregate-derivation.md` ("absent is not false"): that covers display, this covers return-type.
