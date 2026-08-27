---
id: bab8f3cf-af14-5682-b510-0e514416cbee
page-type-slug: finding
title: "An instructions commit reddens code main"
domain-slug: domain/instrument
---

# Claim

A commit in the instructions repository can turn `main` red in the code repository, with no code-repo commit to attribute it to. `check-ast-unused` derives its entry set from the instructions tree at read time, so a command ported out of the code repo un-roots the module it used to reach, and the next main pipeline accuses a file nobody touched. The accusation is true; what is new is that nothing on the red names the repository the cause is in.

# Evidence

Measured 2026-08-14 against one unchanged code tree — `main` at `2591f2539e`, the merge that landed #19011 and #19089 — with two instructions trees.

At instructions `6fad5bf08` (07:58): exit 0, zero unused exports, 978 reaches from 1500 files, 975 modules rooted.

At instructions `137aa4fca` (current): exit 1, `packages/agents/cli/src/agent/halt-census.ts:317 default default — not reached from any entry`, 973 reaches from 1499 files, 970 rooted.

The cause is `955fc870a` at 07:59, which wrote `tools/commands/seat/halt-census.ts` importing `../../lib/halt-census.ts` — an instructions-side module — where the verb had previously reached the code-side one through `codeModule`. Nothing in the code repository imports `agent/halt-census.ts` any more, so the export really is dead and the checker is right.

This is the design working rather than failing: an entry set derived at read time is what makes the verdict cover both repositories, and it is the same property that lets the entry set move under a tree that did not change. The two are one mechanism and cannot be separated.

What is missing is not correctness but attribution. The red arrives in the code repository, names a code-repository file, and says nothing about the instructions commit that moved the entry set — so the first reader looks for a code change that does not exist. The checker's header does state the instructions root and the reach count, which is the raw material; nothing turns the count's MOVEMENT into part of the report.

A port is the one act that produces this, and `Replace Before Removing` on `domains/agent-harness.md` orders the two halves for the instructions side. The code-side half has no such ordering: the replacement lands in one repository and the thing it replaced is left standing in the other, where a check that now spans both is what discovers it.
