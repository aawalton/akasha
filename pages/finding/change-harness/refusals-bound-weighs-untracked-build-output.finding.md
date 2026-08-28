---
id: f1aa800d-403a-477d-bff4-72f5e95bf6b6
slug: refusals-bound-weighs-untracked-build-output
page-type-slug: finding
title: "Refusals bound weighs untracked build output"
domain-slug: domain/change-harness
---

# Claim

`tools/lib/own-typescript.ts:8` globs `**/*.ts` and sets aside only `node_modules`, so `refusals-bound` weighs build output: 3854 files across three `dist` trees, none of them tracked and only one ignored. What the check measures therefore depends on whether anyone has run a build.

Four of those files declare a `refusalText` whose source no longer stands. `ownTypeScript` has one caller, this check, so narrowing it reaches nothing else.

# Evidence

Counted 2026-08-28 against akasha at `24c0b43`: 288 `.ts` files under `shared/pages-access/dist`, 3297 under `shared/status-bar-access/dist`, 269 under `infra/scripts/dist`. `git status` shows the first two untracked and unignored; `git check-ignore` names `infra/scripts/.gitignore:3` for the third.

The four stale declarations: `shared/status-bar-access/dist/tools/lib/refusal.d.ts` declares a four-argument `refusalText` and a `refusalDirIn`, and `dist/checks-system/refusal/refusal.d.ts` under each of the three trees declares the checks-system copy. Neither `tools/lib/refusal.ts` nor `checks-system/refusal/` stands; `refusal/refusal.ts:46` is the one definition left. Their mtimes run 2026-08-27 11:22 to 2026-08-28 03:46, so they are emitted by `tsc -b` behind the `typecheck` script rather than left by hand.

Until `6f8f215` all four were read as callers whose slug could not be read, which is 4 of the 11 occurrences the check then reported. The declaration skip landed there quiets them.

That the walk still reaches build output was established rather than assumed: a fixture printer at `tools/pkg/dist/printer.ts` with a non-literal slug is still named in the messages at `24c0b43`. So the four going quiet is a reading of what they are, not a file that stopped being opened.
