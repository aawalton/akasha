---
id: 1be53be1-2b43-5e78-a286-246c153a4398
slug: stale-branch-reverts-guard
page-type-slug: finding
title: "Stale branch reverts guard"
domain-slug: domain/global
---

# Claim

The stale branch `origin/project-14023` (24 days behind main, unlanded) would, if merged, revert #13982's dynamic wake-arming and #16258's message-specific send guard by restoring a hardcoded seat list, its own header still cites a symbol (`WAKE_WATCHER_SPECS`) that no longer exists on main, and nothing in the repo today would catch this on merge because a clean textual merge is plausible.

# Evidence

Project #16311 (domain: merge-queue, status: someday_maybe, live-on: deploy). No objective was written: row was captured, never defined; this is its capture, moved off the row's retired `notes` attribute on 2026-08-15.

Filed by athena, independently re-verifying numbers #16258's added-lines symbol sweep (181-branch width) found.

Verified facts, each with its command:
- Stale 24 days: tip `4227318b49` (2026-07-01 15:51) vs merge-base `6cbdb17d5f` (2026-07-01 20:58); `git log -1 --format=... origin/project-14023`.
- Hardcoded predicate added: `git diff -M --name-status <mb>...origin/project-14023` adds `packages/agents/routing-core/src/resumable-seat-names.ts` (+test), modifies `send.ts`, `decide-dead-recipient-routing.ts` + test. Static `Set` `RESUMABLE_SEAT_NAMES` of `AINE_SEAT_SPECS` ∪ `STANDING_PERSONA_SPECS`; `isResumableSeatName` a bare `.has()`.
- Header cites `WAKE_WATCHER_SPECS`, replaced by #13982's `assembleArmedSpecs`; `git grep -c WAKE_WATCHER_SPECS origin/main` = 0.
- Test asserts opposite of main: `resumable-seat-names.unit.test.ts:22-25` expects "iris"/"aria" false (comment: unreachable by import rank); main's `wake-armed-seats.ts:104` has `EXPLICIT_STATIC_SPECS = [IRIS_SPEC, ARIA_STAGED_SPEC]` — both armed.
- 5 files overlap #16258: `send.ts`, `routing-core/src/index.ts`, `agents/shared/CLAUDE.md`, `decide-dead-recipient-routing.ts` + test. Branch re-adds `recipientIsResumableSeat: boolean` + ~11 test sites, replaced by #16258's `recipientWake`.

Method note: literal grep for `isResumableSeatName("iris")` missed it (loop variable); case-insensitive `iris|aria` found it.

Scope: retire the branch (established by test that #13982+#16258 close its gap) or rebase onto main and re-derive intent. Not resolved incidentally by whoever next touches the five files.

Umbrella's thesis on a branch, not a doc: a derived declaration whose input moved, nothing rechecking it — fifth/sixth such instance that night, only one with a code revert not doc drift.
