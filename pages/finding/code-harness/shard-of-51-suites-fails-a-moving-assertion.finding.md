---
id: dbe40631-0ad3-5852-abf2-f0c43c711565
slug: shard-of-51-suites-fails-a-moving-assertion
page-type-slug: finding
title: "Shard of 51 suites fails a moving assertion"
domain-slug: domain/global
---

# Claim

`supervisor-compact-resume.integration.test.ts` failed one test inside a slow-suite shard while passing 3 of 3 in isolation, and a DIFFERENT assertion failed in the previous run of the same shard. That shard runs 51 suites in one process. #19033's fix is holding, so this is cross-suite interference rather than a regression. It reached #18909 twice, which stopped and recorded it rather than chasing it. Nobody owns it, and it presents as an unrelated project's red each time.

# Evidence

## What was observed

Reported by #18909's seat on 2026-08-14, recorded rather than chased:

- The suite failed one test inside a slow-suite sweep shard.
- It passes 3 of 3 in isolation in that seat's worktree.
- Shard 9 failed on a DIFFERENT assertion in the seat's previous run than in this one.
- That shard runs 51 suites in one process.

The lead verified separately that the suite passes on an untouched checkout: 2 pass, 0 fail, 11 assertions. #19033's repair is holding.

## Why this is filed rather than dispatched

Nothing here is a wrong answer yet — it is a suite that sometimes fails for reasons that move between runs. A project would have to begin by establishing whether the interference is shared database rows, a shared process-level singleton, or ordering, and that is research rather than a defect with a fix. A finding informs that decision; it does not demand one.

## Why it will keep costing somebody

It presents as an unrelated project's red. #18909 met it twice while its own footprint was three generated dumps and a package rewrite, and had to spend a stop and a diagnosis each time to establish it was not theirs. The pattern is the same one that made `supervisor-compact-resume` expensive in the first place: a failure that reaches whoever happens to select the suite, rather than whoever owns it.

An intermittent failure is also the shape that erodes a stop: a seat told twice that its red was not its own learns to carry on, and stopping is the behaviour worth protecting here.

## What would settle it

Running the shard's 51 suites in isolation against the same seed and observing whether the failure follows suite ORDER or the shard's shared state. If it follows order, the interference is between named suites and can be named. If it does not, the shared process is the subject.

## Delete this when

The interference is named and a row opened for it, or the suite runs clean across several full sweeps and the observation stops being true.
