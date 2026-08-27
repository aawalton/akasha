---
id: 0bb40c49-0943-58fd-9749-de3b8a4a47bb
page-type-slug: domain
title: "Test"
slug: test
domain-parent-slug: domain/instrument-kind
---

# Definition

- **Test** — an instrument run on a case, ruling on what happens.

# Principles

## Nothing Cheaper Catches It

**Keep a test only where it would catch a defect nothing cheaper would.**

A defect something cheaper catches never reaches the suite, so the test cannot fire.

Cheaper means it refuses sooner: a type, a gate.

Keep it until the cheaper one actually stands.

## Assert The Invariant

**Assert a domain invariant, never a detail of the case at hand.**

An assertion about one case breaks while nothing is wrong, and its repair checks nothing.

Where no domain line stands, settle it with Alan.

Stable so far is not an invariant.

## Write For The Next Change

**Write a test for what a later change could break, never to confirm the one that wrote it.**

A test pays only on runs after the change that wrote it, so confirming that change buys nothing.

Test new code too, not just code being changed.

Aim at what a stranger could break.

# Rules

## Delete It Now

**Delete a test the moment the structure makes the defect it catches impossible.**

You are the last reader who can tell it went redundant; afterwards it reads as a test that passes.

Delete on impossible, never on unlikely.

Delete only the case that went redundant.

## Delete Rather Than Repair

**Delete a test that fails while nothing is wrong; never repair it.**

A repair is confirmed by the failure not returning, which is what the fault looked like.

A retry or a skip is still a repair.

Settle that the code is right before you delete.

## Never Ask The Code

**Work out a test's expected value yourself, never by running the code under test.**

A value computed the way the code computes it agrees by construction: green on every input.

A helper or fixture the code uses is the code.

Approving a generated snapshot is asking the code.
