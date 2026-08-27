---
id: 2b6dfac9-6f7e-5707-b6d3-faab57e1564a
page-type-slug: finding
title: "A test whose runtime scales with the live corpus has crossed its timeout fleet-wide"
domain-slug: domain/test
---

# Claim

`packages/agents/shared/project-binding.unit.test.ts` holds a test whose work is proportional to the domains the live corpus declares, and it has crossed the 240-second bound. Every branch fails on it at once, on a file none touched. This is the second live-state instrument found gating a repository whose content cannot affect its verdict; #19390 retired the first. Raising the bound does not settle it: what moves is outside the repository and only grows, so it returns on its own schedule.

# Evidence

Measured 2026-08-18 between 00:13 and 01:04 UTC. The test reads the live tree through `instructionTreePresent()`, derives the domain vocabulary from it, and awaits `composeSeatName` once per domain per role.

Three unrelated projects failed the identical test at the identical 240,000ms timeout inside one hour: run 28232 (#19315) at 248.1s, 28230 (#19384) at 248.1s, 28224 (#19340) at 251.9s, 28225 (#19384) at 248.4s, 28221 (#19340) at 248.2s. The step logs for 28230 and 28224 name that test and that timeout.

`ops pipeline step-cost --step check-unit-tests` reaches 20 runs, which is the whole window this rests on. Across them: min 22.2s, median 225.9s, max 252.0s, against a 240s per-test bound. Passing runs in the same window include 28226 at 187.8s and 28218 (merge-queue/staging) at 210.7s. #19340 completed at 216.0s and failed at 235.0s, 251.7s and 252.0s either side of it. Which side of the bound a run lands on is not decided by the branch's content.

Run on an idle workstation the file passes 36 of 36 in 132s, so the bound is roughly twice the idle cost and the CI machine's load spends the rest.

The shape is the one `domains/check.md` names in its intent, and in `Fail Closed`, which ends "an instrument reporting live state is not a check". Project #19390 retired `check-ast-unused` on that ground. Here the live state moves the runtime rather than the verdict, which is why it presents as a flake before it presents as a defect.

NOT MEASURED. How many domains the corpus now declares, or what `composeSeatName` costs per call, so the growth rate is unquantified. Whether any other live-corpus test is on the same path. Whether the merge queue's staging CI, which is the actual gate for landing, crosses the bound as readily as branch CI does — it ran the step green at 210.7s at 00:03.
