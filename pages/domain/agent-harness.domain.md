---
id: 1c785c70-07e8-54d1-81e6-4b99dec89199
page-type-slug: domain
title: "Agent harness"
slug: agent-harness
domain-parent-slug: domain/global
persona-champion-slug: athena
sequence-slugs:
  - domain/agent-definitions
  - domain/agent-runtime
  - domain/agent-tools
settled: true
---

# Definition

- **Agent harness** — how agents do things.

# Design

Every change into akasha is judged before it reaches disk. Outside akasha nothing is judged.

Only a check akasha defines judges a change.

A removal has no author, so no check weighing one runs on it.

One path writes a seat's Claude configuration, whichever command launched it.

No seat is launched with a plugin.

# Intent

What a row means is settled by the harness, never by the code that wrote it.

A write an agent makes into akasha from a shell is judged the same as one it makes with a tool.

# Principles

## Fast Correction

**Buy the harness's reliability by fixing real cases fast, not by adding gates ahead of them.**

A change here reaches every seat on the commit, so a fault is cheap to fix; a gate is paid forever.

Never answer a fault you fixed with a new gate.

Never hold a fix back to design a better one.

# Rules

## Single Authority

**Bind each claim from exactly one document.**

Where two documents bind one claim, their disagreement is a contradiction nothing can settle.

Never summarise a claim another document binds.

Delete the old line when you move a claim.

## Headroom

**Never report that a part is close to its bound as a defect, in your own words or in an instrument's.**

A bound makes the next write push something out, so a part just under one is the bound working.

Say how close a part is to a bound only if asked.

Never propose raising a bound a part came near.
