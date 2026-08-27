---
id: e5a8987f-72a3-5d7e-85f1-5a198c82bc6b
page-type-slug: domain
title: "Rules engine"
slug: rules-engine
domain-parent-slug: domain/design-patterns
---

# Definition

- **Rules engine** — what every rule set runs on.

# Design

Every page a rule set applies to matches exactly one of its rules.

No rule's match depends on the rules standing beside it.

A more specific rule does not take its matches out of a less specific one.

A rule another overlaps in part becomes several rules.

Covering what no other rule names takes several rules, carried out by an agent.

Rules stand as one document each in a folder.

Several rules stating one action are several rules, not one rule copied.

# Rules

## Ask Before Changing

**Get approval from the person the rules serve before a change, never make it and ask after.**

A rule acts on the next thing it matches, so asking after is asking about what is already in force.

Being asked to change it is not approval.

Related changes serving one goal are one change.
