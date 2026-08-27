---
id: 999bc198-f6d2-56bb-8fc9-483a2395a09d
slug: routing-table-exemption-shape
page-type-slug: finding
title: "Routing table exemption shape"
domain-slug: domain/global
---

# Claim

The quality-check line-count exemption for routing tables is keyed on incidental heading and bullet shape rather than on being a routing table, so two files carrying the same kind of routing table for the same purpose are measured differently, and nothing tells an author which shape pays.

# Evidence

Project #17174 (status someday_maybe, live-on deploy, domain `code-check`). No objective was ever written; captured from the row's notes on 2026-08-15.

Settled by experiment and by reading the implementation, not inferred. A scratch copy of `packages/infra/checks/CLAUDE.md` with its H1 renamed from "# Quality Checks" to "# Local Principles", nothing else touched, measures identically: raw 200, measured 200, before and after.

The exemption has three independent conditions, only one a heading: (1) harvesting stops at the first H2 — `packages/infra/checks/CLAUDE.md` has an H2 at line 11, so lines 11-200 are skipped whatever its H1 says; (2) the bullet form must match a declaration pattern whose backticked-target group must be present — routing bullets written as `- [name](docs/x.md) — …` do not match; (3) the H1 must match `/^(?:global |local |functional )?principles$/i`. The root CLAUDE.md's 83 lines of relief come from exactly that shape: H1 directly followed by `- **Name** (`path`) — …` bullets with no intervening H2.

Not an anti-correlated green: the worry was that renaming a heading under cap pressure could buy relief without deleting a line; the experiment refutes it (rename alone satisfies only one of three conditions). Not a false wall either: both package files measured 200/200, so the restructurings they forced were paid against a real constraint.

Consequence observed: three package CLAUDE.md files hit the cap in one evening, each paying an unbudgeted restructuring, while the file with the largest routing table in the estate has 79 lines of headroom.

Existence check: the exemption should exist (a routing table is an index, not prose, and is not read the way 83 lines of doctrine are). What is wrong is that eligibility turns on shape rather than kind. Remedy direction: uniformity — either routing declarations are exempt wherever they appear, or the exemption goes.
