---
id: 24098dfc-7cc8-5509-bac9-d9083e4d5ae8
page-type-slug: domain
title: "Check"
slug: check
domain-parent-slug: domain/instrument-kind
---

# Definition

- **Check** — an instrument run on a provisional change, ruling on whether it may be kept.

# Design

Each check runs in a process of its own rather than inside the runner that calls it.

A check that could not load is answered for apart from a check that found violations.

# Condition

A change's checks all finish within five minutes of the first one starting.

# Intent

What a review finds again across checks stands here as a unit rather than in each review that found it.

# Principles

## Change Reach

**Limit what a check measures to what the provisional change could invalidate.**

An audit pays for its reach once a run; a check pays on every change, by every author.

Never scope a check to what the diff touched.

Reach the whole repo where a change can break it.

## Removal First

**Establish that a check still earns its place before making it faster or more correct.**

No check is faster or more correct than one that is not there, and a repair is always available.

Even a small speedup asks the question first.

Never take a check's age for its worth.

## Superseded Reach

**Weigh a check that duplicates a gate by what that gate does not reach, never by what it repeats.**

The repetition is what a reader sees, so removal reads as obvious while the gap goes unnamed.

Write down what the gate misses before deciding.

Cut the part of the check the gate reaches.

# Rules

## Fail Closed

**Fail a check that could not run.**

A check that could not look verified nothing, so passing it lets an unchecked change land.

A timeout or a killed process could not run.

Never catch a check's own error and exit zero.

## Do The Work

**Never create a check for a set of work to be completed; complete the work instead.**

A check with nothing left to catch reads like one still working, and every author pays for it.

Ask whether a new violation can arrive tomorrow.

Never refuse a check for arriving in a migration.

## Header By Hand

**Repair a header that has gone false by hand, never by gating prose against the code beneath it.**

A header is false only against code the reader has in mind and the text never names.

Never delete the header instead of fixing it.

Never repair it by copying the code beneath.

## Zero At Landing

**Fix every violation a new check finds before landing it, never freezing the ones left into a list.**

The check reads green while every defect it found still stands, so it blocks nobody.

Never narrow its reach to make the count zero.

Where zero is out of reach, do not land it.

## Dispatch Reach

**Wake a check on every file class a violation it judges can arrive in.**

A check the breaking change cannot wake is clean on the very commit it exists for.

Never dispatch from the files the check reads.

Wake it on a file removed, not just one written.

## Derived Reach

**Derive a check's reach wherever a new member can arrive, never from a list in the check.**

The member arriving after the list was written is the one the check exists to catch.

A list moved out of the check is still a list.

Never take a big count for a whole reach.
