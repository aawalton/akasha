---
id: 02043997-72a2-54e0-a5b9-27b5c3ee3a1e
page-type-slug: finding
title: "The help describes plural claimed projects the command cannot produce"
domain-slug: domain/global
---

# Claim

The help in `tools/commands/seat/owed.ts` describes a case the command cannot produce. It speaks of plural claimed projects — "every project claimed", and "A seat holding a finished project BESIDE a parked one is still owed that act" — while `claimedProjectsOf` returns at most one row, off a single `project-seq`. The document's singular "the project it states" is the accurate one.

# Evidence

Read off the `review-instructions` reading of `domains/commands/ops-seat-owed.md` finished 2026-08-21, which ran `ops seat owed` and `ops seat owed --json` and traced `claimedProjectsOf` while checking the Definition bullet clause by clause.

The reading did not act: the defect is in the code file rather than in the subject it was reading.

Not measured here: I did not open the file or run the command, and I did not check whether the plural case was once producible. Whether the help should narrow or the command should take more than one project is not settled here.
