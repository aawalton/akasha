---
id: 8cbc0bb2-c1d6-548e-b455-bc48ab0462d5
slug: command-body-move-reddens-main
page-type-slug: finding
title: "Command body move reddens main"
domain-slug: domain/ops-cli
---

# Claim

Moving a command body into the instructions repository turns the code repository's `main` red, and nothing in the instructions repository reports it.

`check-ast-unused` resolves its entry set from the live instructions repository, which has no branch, no CI and no deploy. So a `move-command-bodies` commit leaves the code-repo export it stopped reaching as an unreached `default` on `main`, while the only check that can see it runs in the other repository's CI, over a tree nobody changed.

# Evidence

Run against `~/code` on `main` at `fd8f590e0f`, `check-ast-unused` exits 1 over a full population of 1349 of 1349 analysis inputs, reporting three unreached `default` exports:

- `packages/temper/player/inventory-management/cli/src/temper/inventory/snapshot.ts:175`
- `packages/temper/player/inventory-management/cli/src/temper/inventory/buy-rule/list.ts:165`
- `packages/infra/tests/src/tests/slow-suite-sweep.ts:3`

Each traces to an instructions-repo commit landed on 2026-08-15: `e240507a6`, `e6aa325ea` and `e3a17b850`. The third says so itself, without treating it as a defect: "leaving main in the code repo with no caller".

Observed from #19149, whose branch CI failed partly on these three. They are not that tree's: it touches none of those paths, and `main` reports them with no feature branch involved. Any deploy queued while they stand meets them at the merge queue's staging CI, which tests the merged result.

Not measured here: whether every earlier `move-command-bodies` run left the same residue, or how long `main` has carried a red `check-ast-unused`.
