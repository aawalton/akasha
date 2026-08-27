---
id: 01a01d14-6614-7000-ac48-a5f358aa35f8
page-type-slug: page-type
title: "Monarch account"
extends-slug: domain
files: instructions:**/*.monarch-account.md
body-shape-slug: domain
slug: monarch-account
plural-slug: monarch-accounts
domain-parent-slug: domain/monarch
---

# Definition

- **Monarch account** — one balance, whether it is money held or money owed.

# Design

An account holding no transaction is still an account: a retirement or brokerage balance moves without a row ever standing against it.

Monarch reopens a closed account under a second id rather than reviving the first, so two accounts can carry the same last four digits.
