---
id: 01a01d14-6614-7003-8e68-d4f06528a899
page-type-slug: page-type
title: "Monarch month"
extends-slug: page
files: memory:**/*.monarch-month.md
body-shape-slug: empty
slug: monarch-month
domain-parent-slug: domain/monarch
required-reading-slugs:
  - repo/memory-repo
named-for: "{slug}"
---

# Definition

- **Monarch month** — one calendar month of Alan's money, holding every transaction dated inside it.

# Design

A month is named for the year and the month it covers, as `2026-08`.

A month past the trusted period is closed: nothing Monarch reports moves a row into or out of it.

A month states what it covers and nothing else; every word about the money is on the transactions beside it.
