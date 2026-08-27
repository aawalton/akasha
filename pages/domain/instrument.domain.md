---
id: 86fdc5cc-a500-5207-8624-dddfd2c6a045
page-type-slug: domain
title: "Instrument"
slug: instrument
domain-parent-slug: domain/change-harness-definitions
sequence-slugs:
  - domain/instrument-target
  - domain/instrument-answer
  - domain/instrument-kind
  - domain/instrument-population
---

# Definition

- **Instrument** — code kept to be run again, to find out what is true.

# Design

An instrument may leave marks of its own running; it never changes what it was run on.

# Principles

## Negative Control

**Make an instrument fail before you trust it.**

A blind instrument and a working one both come back clean, and no later run says which you have.

It must catch the planted case, not just break.

It must also stay quiet on a clean case.

# Rules

## Painful Or Worse

**Take an instrument to Alan before landing it at painful cost or worse.**

Whoever writes it never waits for it; everyone after does, and nothing charges the wait back.

Time the run rather than guessing the band.

Approval holds for that instrument at that band.

## Population

**State the population size where an instrument reports, and fail where it could not look at one.**

Without the size, a run that looked at nothing and one that found nothing are the same result.

The instrument prints the count, not you.

Anything it skipped is outside the population.

## Horizon

**Say how far back a store reaches, beside any report taken from it.**

A window and a whole history give the same shape, so a count from either reads as all time.

Your query window is not the store's reach.

A store that keeps no history reaches only now.

## Bound Before Measuring

**Set a budget from what waits on the run, never from what the run costs today.**

A budget taken from the run's own timing refuses nothing; only what waits can say what is too slow.

Still measure, to see if the budget is met.

A run that breaks its budget does not raise it.
