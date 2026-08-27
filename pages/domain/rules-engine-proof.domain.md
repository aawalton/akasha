---
id: 0dd7a94e-5dbc-5f09-b0b1-80673f8847bf
page-type-slug: domain
title: "Rules engine proof"
slug: rules-engine-proof
domain-parent-slug: domain/rules-engine
---

# Definition

- **Rules engine proof** — how a rule set is shown to be a partition.

# Design

The proof decides every case a rule set can tell apart, rather than sampling the cases that arise.

A case no value in the rule set holds of is one of them.

The proof decides a case with the same matcher the live run uses.

What the proof cannot decide it reports as undecided, never as proven.
