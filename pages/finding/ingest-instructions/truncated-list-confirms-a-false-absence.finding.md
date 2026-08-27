---
id: 9a5ddd0d-d2e8-5b9d-b393-743ddde6623b
page-type-slug: finding
title: "Truncated list confirms a false absence"
domain-slug: domain/global
---

# Claim

A `| head -N` on an `rg -l` run can reverse an absence verdict silently, and it errs toward keeping false content rather than losing true content. Where the truncated prefix is homogeneous — every surviving path in one package — it reads as a complete answer confirming the symbol is consumed nowhere else. Measured: `rg "resumePolicy" -l | head -12` returned twelve routing-core files; the full list is 25, and all thirteen the pipe ate were the disconfirming ones.

# Evidence

Measured 2026-08-07 in a headless seat running `ingest-instructions` over a quarantined package document, searching `~/code`.

The document claimed, as a negative: "The on-demand helper lifecycle today has no resume-vs-fresh decision: `acquireHelper` always spawns fresh."

First probe, piped:

    rg -n "resumePolicy" --glob '!.git/**' -l | head -12

Twelve results, every one under `packages/agents/routing-core/src/`. That is the shape of an honest confirmation — a field declared in a package and consumed nowhere else. Nothing in the output said it was a prefix.

Unpiped:

    rg -n "resumePolicy" --glob '!.git/**' -l | wc -l   -> 25

The thirteen past the cut include `packages/agents/cli/src/agent/acquire.ts`, `helper-lifecycle.ts`, `route-and-delegate.ts` and three tests named for the wiring. `helper-lifecycle.ts:486` calls `decideAcquireResume(policy, observation)`. The claim was false.

WHY THE DIRECTION MATTERS. The standing guidance frames truncation as cutting a TRUE claim because a search wrongly came back empty. This is the reverse, and under a task whose ruling is to lean toward removal it costs more. A cut needs no positive evidence; "not carried, not obvious" is enough. A KEEP is what a confirmed claim earns, and a keep lands content under quarantine for a later reading to promote. A truncation that CONFIRMS a false negative manufactures the one outcome the loop cannot cheaply undo.

WHAT MAKES IT INVISIBLE IS SORT ORDER. `rg -l` walks in directory order, so the declaring package sorts before the consuming ones. The surviving prefix is therefore systematically the self-referential half — the half that looks like "declared here, used nowhere". The bias points the same way every time, at exactly the negative claims a probe is checking.

NOT MEASURED: how many standing findings rest on a piped `-l` run; whether the Grep tool's `head_limit` default of 250 has produced this in practice.
