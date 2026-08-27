---
id: 781159f2-3110-519f-91f5-574f79d53ba3
slug: direct-commit-hook-tests-assert-a-retired-protocol
page-type-slug: finding
title: "Direct-commit hook tests assert a retired protocol"
domain-slug: domain/global
---

# Claim

`tools/tests/block-instructions-direct-commit.on-demand.test.ts` is 12 red of 23 because it asserts a JSON block decision on stdout that the hook no longer emits. The guard itself refuses correctly, so what is broken is the measurement rather than the protection.

# Evidence

Measured 2026-08-17. Confirmed pre-existing: the same 12 fail identically in a worktree at a commit before this evening's work, so nothing landed today caused them.

The suite's `expectBlocked` asserts three things — `exitCode` is 2, and stdout contains `"decision"` and `"block"`. Run the hook by hand on the payload the first failing case sends, and it refuses with prose on stderr and writes no JSON at all. So the assertion is against a protocol the hook has stopped speaking, not against behaviour that has stopped happening.

The refusal it does emit is thorough: it names the repo it is protecting, names `edit.ts` and `write.ts` as the way content enters, tells an author who already edited a file to hand it to `write.ts` as its own source, and says reads are not gated. It also explains why it no longer copies the commands' flags — a copy it used to carry went on naming flags they had stopped taking, and an unrecognised flag leaves the command silently waiting on stdin.

One thing measured and not resolved: the refusal reports `This one targets: /var/home/walton/instructions` while the test passes `INSTRUCTIONS_ROOT=/var/tmp/test-instructions-root`. Either the hook resolves the real root regardless of the variable, or it ignores it. That matters for more than the tests, because a suite that cannot point the hook at a fixture root can only exercise it against the live checkout.

Not measured: whether the JSON protocol was retired deliberately or lost. The hook's own text argues for prose over a copied interface, which reads deliberate, but nothing here says so and the tests were never moved with it.

Worth noting the suite is `.on-demand`, so whether anything runs it nightly is a separate question from whether it is green.
