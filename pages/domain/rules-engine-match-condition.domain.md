---
id: 135caadd-17ac-51d6-a74e-44937d74f7cf
page-type-slug: domain
title: "Rules engine match condition"
slug: rules-engine-match-condition
domain-parent-slug: domain/rules-engine-match
---

# Definition

- **Rules engine match condition** — one thing a match requires.

# Design

A condition names one thing about what is matched and the values it accepts, and holds when any one of them does.

A negated condition holds where none of its values does.

A negated condition's values split across several conditions match the same things; a positive condition's do not.

The ways a condition can compare a value are a closed set, and none of them is a regular expression.

Every comparison has a negated spelling.

A condition compares without regard to case.
