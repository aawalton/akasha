---
page-type-slug: finding
slug: the-file-that-stops-the-suite
title: "The batch that spends the suite's budget is stopped by one test file whose memory grows without bound in the suite's own worktree"
domain-slug: domain/checks-system
---

# Claim

`tools/lib/subjects.unit.test.ts` is the file that stops the standard suite. Inside the suite's own worktree it walks the repository with its resident memory climbing without bound — 8.9 GB observed, still rising at about 54 MB a second — until the kernel kills it at around 150 seconds. It is not a hang. The process is running the whole time it is measured.

Run in an ordinary checkout the same file passes in 3.2 seconds. That is why it went unfound: anyone who opened it and ran it saw a fast green test, and the failure exists only in the tree the check builds for itself.

It sits at index 74 of the 581 files the suite asks for, so it lands in the tenth batch of eight. That batch is handed the whole remaining budget, spends it, and is killed, which is what fixes the suite's reach at the 72 files of batches one to nine.

# Evidence

Measured 2026-08-28, from `907649ec`, on a workstation carrying several seats. An earlier finding recorded which file this was as NOT SETTLED, on the grounds that one clean-tree run stalled and another finished in 3.8 seconds. That contradiction is now resolved: both readings were true, of two different trees.

THE TREE IS THE VARIABLE. Every run below used a worktree built by `withSuiteTree` from `tools/lib/suite-tree.ts` with its `tree.env`, which is exactly what `suite-runs.ts:127` runs the suite in. The file's eight-file batch is indices 72-79 of the sorted 581.

    WHOLE BATCH round 1                     143498ms   exit=null   no summary
    WHOLE BATCH round 2                     148124ms   exit=null   no summary

Each round was bounded at 180 seconds and neither reached the bound, so neither was killed by the harness. `exit=null` is a signal death.

ITS SEVEN BATCH-MATES ARE INNOCENT. Run alone in the same tree, three rounds each:

    tools/lib/seat-proc-key.unit.test.ts    216ms, 205ms, 211ms   exit=0   3 tests
    tools/lib/seat-usage.test.ts            222ms, 226ms, 233ms   exit=0   7 tests

THE FILE ALONE, IN THE SAME TREE.

    tools/lib/subjects.unit.test.ts         158180ms  exit=null   no summary

Again inside a 180-second bound it did not reach, so again a signal death rather than the harness.

THE SAME FILE IN THE LIVE WORKING TREE, three rounds:

    3.20s, 3.21s, 3.22s   exit=0   Ran 3 tests across 1 file

Three for three green in an ordinary checkout, three for three dead in the tree the check builds.

WHAT IT IS DOING WHILE IT RUNS. Read from `/proc` during a run, at about 145 seconds in:

    State:    R (running)
    VmRSS:    8882216 kB
    Threads:  13

8.9 GB resident, and the state is `R` rather than any blocked state, so this is not a deadlock or a lock wait. The open descriptors at that moment were directory handles part-way through a walk of the tree:

    .../repo/temper/game-trading-pricing-client/src
    .../repo/temper/game-trading-pricing/src
    .../repo/player-build-validation/src
    .../repo/temper/player-completion-addon/metadata

Watched again on the next round, the growth is monotonic and fast:

    VmRSS 2705928 kB, then 2977816 kB five seconds later

about 54 MB a second, with no sign of levelling off.

SO THE DEATH IS MEMORY, WHICH IS WHY THE TIMING WANDERS. 143.5s, 148.1s and 158.2s are not a timeout — a timeout is the same number every time. They are the point at which a process growing at ~54 MB/s is killed, which moves with whatever else the box is holding. This also disposes of the earlier worry that the varying figures were contention: contention would slow a bounded workload, not kill it.

WHAT THE FILE DOES. `tools/lib/subjects.unit.test.ts:8` takes its root from its own location:

    const ROOT = new URL("../../", import.meta.url).pathname.replace(/\/$/, "")

and its three cases call `readSubject(ROOT, subject)` and `diskFileTree(roots)`, the last of them walking every record of every subject and stating each file. In the live checkout that walk terminates in three seconds. In the worktree it does not, and the worktree differs from the checkout in one relevant way: `withSuiteTree` calls `linkModulesInto` at `suite-tree.ts:46` and `linkSibling` at `:43`, so the tree is dressed with symlinked module trees and a sibling link the live checkout does not carry in the same shape.

WHY THE WALK DOES NOT TERMINATE THERE IS NOT SETTLED. A walker that follows those symlinks would revisit trees repeatedly, and could loop, which fits unbounded growth at a steady rate. I did not read the walker to confirm it follows symlinks, and I am not asserting the cause. What is settled is the file, the behaviour, the memory, and the dependence on the tree.

NOT MEASURED. Whether the second stalling batch already on record — batch 48, holding `pages-hold-properties.test.ts`, the five `parse-args*` files, `pending-decide.test.ts` and `pid-signal.test.ts` — fails the same way. It was not bisected, and it should not be assumed to share this cause.

A NOTE ON COST. Each reproduction takes about 9 GB. Two rounds of the batch and two of the file alone were enough to settle it; a third round of the file was stopped deliberately rather than run, because repeating a 9 GB allocation on a box other seats are working buys a fourth reading of something already shown twice.
