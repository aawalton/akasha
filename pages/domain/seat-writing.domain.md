---
page-type-slug: domain
id: 112121d1-f157-56a0-ba8c-1eb6a3dfe1a7
title: "Seat writing"
slug: seat-writing
domain-parent-slug: domain/seat-capability
settled: true
---

# Definition

- **Seat writing** — a seat changing what stands in a repository.

# Design

Outside akasha nothing guards a write. Inside it, a live path nothing guards is a gap, not permission.

# Intent

A write into akasha landing on a body its writer never read is refused, not taken.

A write into akasha does not accept a read record of the file being written taken before a mechanical change.

# Rules

## Land On Main

**Land every change on main.**

Outside akasha nothing merges a branch, so a change on one is stranded.

A refused push is not a missing branch.

A worktree outside akasha buys nothing.

## Author Or Derive

**Run a change you can state as a rule as a script that commits its own work.**

A transformation arrives as thousands of small edits, so the authoring route looks right.

A change you can state as a rule is not authored.

Run the checks after rather than the gates before.
