---
page-type-slug: rules-engine-rule-set
title: "Email rule"
id: 01a0078a-e6b3-7001-8760-3a2cb8d1c14c
extends-slug: page
files: none
body-shape-slug: domain
applies-to-slug: email-message
path-pattern: '^pages/email-rule-(?<kind>agent|code)/(?<holder>[a-z0-9-]+)/(?<slug>[a-z0-9-]+)(?:\.email-rule-\k<kind>)?\.md$'
slug: email-rule
domain-parent-slug: domain/email
required-reading-slugs:
  - domain/rules-engine
---

# Definition

- **Email rule** — what to do with some of a person's mail.

# Design

An email rule is a match, its filing, the actions to take and a kind.

A person's rules are their own set, and nothing is shared between two people's sets.

A code rule's filing is a key of its own, `archive` or `skip`, rather than one of its actions.

A code rule forwards by naming a recipient; there is no forward action.
