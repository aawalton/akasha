---
id: 379635de-f204-531d-a2db-9cda38f6f544
page-type-slug: domain
title: "Monarch"
slug: monarch
domain-parent-slug: domain/alan-harness-agents
---

# Definition

- **Monarch** — the outside service that gathers every account Alan holds into one picture of his money.

# Design

Monarch's own rules engine is never written to.

Category rules run outside Monarch, and only an update to a single transaction is posted back.

The categorization ring reads Monarch directly, on Alan's own signed-in browser cookie.

Category rules run without asking on that sync, over a window narrower than the one the copy keeps.

Transactions alone move faster than daily: they are checked every minute and only changed rows move.

# Intent

Only the daily full run speaks for rows older than the trusted period.

Every monarch page stands in a file.

What a schedule writes stands in memory; what names it stands in the instructions.

A monarch page holds the fields its readers name, rather than a copy of Monarch's reply.
