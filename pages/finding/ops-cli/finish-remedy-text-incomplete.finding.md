---
id: 392cbe0e-a42c-53f2-944a-81b03dd3b145
slug: finish-remedy-text-incomplete
page-type-slug: finding
title: "Finish remedy text incomplete"
domain-slug: domain/ops-cli
---

# Claim

`bun ops project finish --seq N` refuses to delete a project branch when its commits aren't found by SHA on `origin/main`, but since `ops project deploy` rebases, a landed branch's SHAs never match — making this refusal the common case, not an edge case — and the two remedies it offers omit the actual resolution: a per-file content comparison between branch tip and `origin/main`.

# Evidence

Project #16181, domain `ops-cli`, status `someday_maybe`, no objective; moved off retired `notes` 2026-08-15. Found by ember while finishing #16061, 2026-07-25T13:53. The guard itself is correct and valuable; this is about its remedy text.

What happened: `bun ops project finish --seq 16061` refused, citing 4 commits not on origin/main, invoking the illusory-finish class. But the work had landed — `ops project deploy` REBASES, so the branch's original SHAs are never the SHAs that land, and the branch is never fast-forwarded to the rebased result.

Resolved by comparing content per file, branch tip vs origin/main: 8 of 9 files identical; 1 (CLAUDE.md) differed with main as the newer side (post-#16032 split naming). Zero unlanded work; `--discard-unlanded` was then correct and safe.

The gap: the message offers exactly two remedies — "land it first" (a no-op redeploy, nothing to land) or `--discard-unlanded` (correct here, but a blind discard). Neither is "check whether this content already landed under rebased SHAs." Following the message literally either burns a pointless deploy or discards without establishing safety — the very illusory-finish class the guard exists to prevent.

Why it matters at scale: since deploy rebases by design, this is the common path, not an edge case — the guard cannot distinguish "rebased and landed" from "never landed" (both SHA-absent), so a content check is required and nothing tells the caller to run one.

What would close it: cheapest — name the content-check as a third remedy; better — have the guard run the per-file comparison itself; structural — fast-forward the branch to the rebased tip as part of deploy (largest change, may be deliberately not done).

Related but distinct from #16059 (`no-raw-proc-mutation` compiling ground truth from the wrong checkout) — both a deploy-adjacent tool binding to the wrong object.
