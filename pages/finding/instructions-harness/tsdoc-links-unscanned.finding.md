---
id: 4367c593-a575-5fe1-aa19-0e82069616e0
page-type-slug: finding
title: "Tsdoc links unscanned"
domain-slug: domain/global
---

# Claim

A markdown link written inside a TypeScript doc comment is repointed by no verb and scanned by no check, so it survives a rename pointing at a file that does not exist while every instrument reports the estate clean.

# Evidence

Measured 2026-08-02, first-hand, immediately after renaming `meta-harness` to `instructions-harness`.

`bun tools/mv.ts` moved `domains/meta-harness.md` and reported `[references] 905 surface(s) checked — 0 link(s) would break on the perimeter`. `bun tools/run-checks.ts` then reported `[links-resolve] 2822 of 3715 links resolve across 905 surfaces — 0 broken on the perimeter`.

Both were wrong about the same line. `tools/lib/principle-status.ts:149` carried `[Derivation](../../domains/meta-harness.md)` in a doc comment, resolving to a path the move had just emptied. A plain grep found it; neither instrument did.

The gap is that the two disagree about what a surface is. `mv.ts` states that it repoints "markdown links resolved rather than matched" and "paths written as text — a doc comment, a shell example… a string literal in a test", so this case sits inside its own stated scope and it missed it anyway. `links-resolve` counts 905 surfaces and calls them all perimeter, but a link inside a `.ts` file is not among what it resolves — so its zero is a statement about the files it looked at, phrased as a statement about the estate.

What makes it worth filing rather than fixing quietly is that both reports are the reassuring kind. A rename that breaks a link ordinarily produces a red; this produces two greens and a dead path, and the only reason it surfaced is that the renamer happened to grep for the old string afterwards rather than trusting the verdicts.

A second dangling reference sits in the same comment and is invisible to everything for a different reason: it names **Derivation's `Absent Record`**, and no unit by that name exists — `principles/` holds none, and `derivation` is ranked flat with no children on `domains/instructions-harness.md`. A prose reference to a sub-principle resolves against nothing at all, so it cannot go stale in a way any check can see.
