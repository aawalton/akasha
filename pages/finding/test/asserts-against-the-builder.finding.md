---
id: aaf10b32-94fd-5eb6-9c13-1d1e37ca1360
slug: asserts-against-the-builder
page-type-slug: finding
title: "A test asserting a value equals the builder the code used to make it agrees by construction"
domain-slug: domain/test
---

# Claim

A test asserting a value equals the builder the code used to make it agrees by construction. `apply-migration.unit.test.ts:96` asserts `verdict.error` is `contractRefusalError(11)`, and `apply-migration.ts:74` produces that error by calling the same exported function. The assertion holds for any message the builder could return, so it stays green through a rewrite that empties the message. `test.md` names this: a helper the code uses is the code.

# Evidence

Read in the worktree at `/var/home/walton/worktrees/19447`. `contractRefusalError` is exported at `apply-migration.ts:29`, called by the code under test at `:74`, and imported by the test at `:2`.

The line beside it, `:97`, does assert a literal (`"owning project's deploy"`), so this one test is not wholly blind. It was added while clearing ops names from that message, which is how the pattern was noticed rather than sought.

Not measured: how many other tests in either repository assert against a builder, constant or fixture the code under test also uses. One site is not a rate.
