---
id: 62c37e4e-2c6c-51d2-b8a1-812fb728bfb2
slug: custody-live-in-harness
page-type-slug: finding
title: "Custody live in harness"
domain-slug: domain/agent-harness
---

# Claim

`custody` is live vocabulary in the instructions repository's own code, and nothing in that repository refuses it. #18250 retired `Custody` and `custody` in the code repository, where `check-retired-vocabulary` walks `packages/**` and nothing else — and `domains/code-check.md` defines a code check as code run on a change to the CODE repo's main, so that reach is the design rather than a gap in it. The harness is where checks on the harness run, and no equivalent stands there.

# Evidence

A case-sensitive sweep of the instructions repository on 2026-08-10, after #18250 landed the retirement entry, returns the word in live code rather than only in prose about the past.

`tools/lib/seat-sweep.ts` carries the concept as a named type and reads it as a field: `export type Custody` at line 77, `custodyOf` at 185, `readonly custody: Custody | null` at 175, and the `custody-unrecorded` and `custody-arriving` strings it pushes at 217 and 221. `tools/sweep-seats.ts` spells the same two as seat classes at lines 60, 61 and 93, and prints them in its summary at 244. `tools/lib/headless-halt-wake.sh` matches `custodian-dead` at 158, and `tools/checks/hook-reasons-mirror.ts` names the same token at 80.

`domains/lists/headless-not-blocked.md:21` reads "**Custodian dead** — the layer being waited on is proven gone". `tools/document/schemas/task.ts` describes a task as declaring where a seat's CUSTODY ends, at lines 30, 37 and 45.

Two of these are the same cross-repository wire #18250 left standing on purpose: `custodian-dead` is written by `HOLDER_DEAD_VERDICT` in the code repository and matched by the bash `case` here, and that token moves only after this side widens. The rest are not that token and are not reached by anything.

No `custodyTransfer` stands anywhere in this repository, so the key #18250 moved left nothing stale here.
