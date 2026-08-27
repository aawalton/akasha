---
page-type-slug: page-type
title: "Monarch transaction"
id: 01a00785-037a-7000-bfe0-a153b042e42c
extends-slug: page
files: none
body-shape-slug: domain
slug: monarch-transaction
plural-slug: monarch-transactions
domain-parent-slug: domain/monarch
---

# Definition

- **Monarch transaction** — one movement of money into or out of an account.

# Design

A transaction stands beside the month its date falls in, rather than in a file of its own. Ten thousand of them arrive from a poller and nobody writes one by hand.

A transaction that has been split leaves the list Monarch serves, and its parts stand there in its place. The original stays alive and reachable by its own id.

# Intent

A transaction can carry images, receipts among them.

# Rules

## Notes

**Write a note only where Monarch, read at that moment, reports that transaction's note empty.**

Monarch keeps no earlier version, so a note you replaced and one nobody wrote look the same.

Re-read the note per transaction, not per batch.

Skip a transaction whose reply had no note field.
