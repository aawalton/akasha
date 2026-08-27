---
id: 4a4a2d84-6137-575e-81a0-bb057243d35d
page-type-slug: domain
title: "Git repos"
slug: git-repos
domain-parent-slug: domain/storage
---

# Definition

- **Git repos** — the versioned text stores.

# Design

The bare repositories sit on one disk.

A mirror to a second host runs after the push returns, never inside it.
