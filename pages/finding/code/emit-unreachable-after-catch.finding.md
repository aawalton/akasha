---
id: 9c8dc95d-4979-555f-b9ce-42bdfe8c7972
slug: emit-unreachable-after-catch
page-type-slug: finding
title: "Emit unreachable after catch"
domain-slug: domain/global
---

# Claim

Three independent agents (worker-16225, áine, and #16278's author) each landed the same censoring defect in the same file within one evening: a measurement-emit line placed after a `try` whose `catch` arms all `return` reads as correct at the point of edit but is unreachable on exactly the failure path the measurement exists to explain — satisfying Rule of Three for structural prevention rather than a fourth careful fix.

# Evidence

worker-16225's diagnosis: the child's only documented return channel is stdout, so "report a measurement" reads as "add a field to the payload," and the kill path is invisible from where that line is written; the dispatch catch's every classified arm returns, so the visually obvious emit site is unreachable on exactly the paths that matter. Both read as correct at the point of edit.

Candidate preventions, per worker-16225, not acted on:
1. A lint for `await emit*` positioned after a `try` whose catch arms all `return`. Catches the shape, but needs care — legitimate when the emit should run only on success.
2. A discriminated result the timeout path also populates, so "no measurement on this path" is unrepresentable. Stronger (a type catches it before anything runs) and matches the fix worker-16225 landed in the small on #16225, which moved the duration onto `acquireWorkspaceGraph`'s own return value (`acquisitionMs`) so every branch must produce one.

Establish whether a similar return-shape refactor exists for the child/dispatch seam first.

Deliberately not built inside #16225: a structural change inside a deploy-blocking project widens scope on the last hours of an incident night. #16225 landed the narrow fix and its own test; this is the class fix.

Pattern: the failure is invisible from where the code is written — same reason a truncated read has no tell (#16351) and a guessed key feels like recall (#16344). Related: #16350 (residual coverage gap after #16225's fix, not why the defect recurs); #16344 (the measurement/declaration family this instances); #16351 (truncated-read sub-class, same no-tell property).

Verification, not automated: a fixture exercising the timeout path must fail the check before the fix and pass after, mutation-verified by deleting the prevention and confirming the known-bad shape is admitted again.

Project #16358, someday_maybe, domain code. Carried no objective; captured off the project's retired `notes` attribute on 2026-08-15.
