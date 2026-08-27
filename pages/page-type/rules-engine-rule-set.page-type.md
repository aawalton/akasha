---
page-type-slug: page-type
title: "Rules engine rule set"
id: 01a00777-e7d2-7000-a474-1f819b0cbefb
extends-slug: page-type
files: instructions:**/*.rules-engine-rule-set.md
body-shape-slug: domain
slug: rules-engine-rule-set
domain-parent-slug: domain/rules-engine
---

# Definition

- **Rules engine rule set** — one set of rules, run and proven together.

# Design

A rule set declares its own shape, and no two share one.

The pages a rule set applies to are its own, and nothing crosses between them.

A rule set is proven a partition on its own, never as part of a larger set.
