---
id: 01a00c3a-ce71-7000-8893-7b5fc7f958a0
page-type-slug: page-type
title: "Claude account"
extends-slug: page
files: instructions:**/*.claude-account.md
body-shape-slug: empty
slug: claude-account
domain-parent-slug: domain/model-gateway
---

# Definition

- **Claude account** — a login the fleet runs on.

# Design

Whether an account can be used, and which one a call goes on, are worked out each time and never stored.

Everything recorded about an account stands in its page.

The database has no table for claude accounts.
