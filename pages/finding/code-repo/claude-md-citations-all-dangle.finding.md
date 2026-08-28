---
id: c822b744-b949-5aad-8694-5631de5ae94c
slug: claude-md-citations-all-dangle
page-type-slug: finding
title: "Claude MD citations all dangle"
domain-slug: repo/akasha-repo
---

# Claim

Every `CLAUDE.md` citation in the code repository dangles, and no standing sweep reaches this form. 412 tracked files under `packages/` (that tree now stands unprefixed at this repository's root) carry 639 references; exactly one tracked `CLAUDE.md` survives and it is a check fixture. The three filed dangling-pointer findings key on a `docs/` prefix or on a lowercase first character, so a repair driven by any of them completes, reads as complete, and touches none of these. A live check's ratchet holds 81 such paths, green by design.

# Evidence

Re-measured 2026-08-08 in `~/code` on `main`, consolidating three findings of one claim (see the commit message). `git grep -l -F "CLAUDE.md" -- 'packages/'` returns 412 files, `-o` returns 639 lines; earlier counts of 375, 310 and 358 each scoped to a file-type subset. `git ls-files '*CLAUDE.md'` returns one path, `packages/infra/checks/__fixtures__/no-readme/clean/CLAUDE.md`, a `check-no-readme` fixture. The targets moved rather than died: `7205e28efd` put each under `dirty/code/`, and they are being emptied document by document.

WHY EVERY STANDING SWEEP MISSES IT. `bare-filename-citations-unswept.md` matches `` `[a-z0-9][a-z0-9-]+\.md` ``, anchored lowercase, so `CLAUDE.md` cannot match — its pattern against ``see `CLAUDE.md` here`` exits 1. `quarantined-doc-references-dangle.md` greps `See docs/`, and `docs-pointer-sweep-stops-at-typescript.md` widens the file kind while keeping that prefix. These citations carry no `docs/` segment.

THE SHARPEST INSTANCE IS AN INSTRUMENT. `infra/cluster-checks/src/lib/prose-mechanism-restatement.ratchet.json` holds 81 accepted keys whose file half is a `CLAUDE.md` — `packages/agents/supervisor/CLAUDE.md#decideChildTerminal`, eleven under `packages/agents/pacing/`. Its check goes red only when the count RISES and is never red on the accepted set existing, so 81 keys naming nothing are the shape it cannot report.

THREE SHAPES, no single regex reaching all: full path, bare filename, and a relative reference with no filename at all (`auto-eject-merge-queue-entries.ts:14`, "see the parent CLAUDE.md"). Many name a SECTION by heading, which would not resolve on a repointed path either — that bears on whether the repair is repointing at all. The costly shape is a header declaring its own prose deliberately thin because the narrative lives elsewhere: `move-to-deploy.ts:4` leaves a reader with neither.

`pages/finding/agent-fleet/monitor-doc-pointers-dangle.finding.md` and `supervisor-docs-pointers-dangle.md` are instances; this is their census.
