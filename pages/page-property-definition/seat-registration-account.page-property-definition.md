---
id: 3c2db4b4-0436-5d36-adba-2fb1f31f9824
page-type-slug: page-property-definition
title: "Seat registration account"
defined-on-slug: page-type/seat
key: registration-account
type: relation-name
target-slug: claude-account
slug: seat-registration-account
domain-parent-slug: domain/seat-charter
required-reading-slugs:
  - page-type/claude-account
settled: true
---

# Definition

- **Seat registration account** — the Claude account a seat runs as.

# Design

A seat's registration is fixed when it starts.

A seat's registration does not decide which account its model calls go on.

The account a seat runs as may not be the one it was started with.

# Intent

A seat runs as a different account where the default registration cannot renew its credential.
