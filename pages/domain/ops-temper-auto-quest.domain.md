---
id: e39127d7-3e41-5234-8902-8f494c465cfc
page-type-slug: domain
title: "Ops temper auto-quest"
slug: ops-temper-auto-quest
domain-parent-slug: domain/ops-temper
required-reading-slugs:
  - domain/ops-namespace
  - domain/temper
---

# Definition

- **Ops temper auto-quest** — the one command that reads back what the quest addon recorded while its debug capture was on.

# Design

The capture reaches disk only when the client reloads, so the order is enable, reproduce the stall, `/reloadui`, then read.

It replaces copying the chat log out of the game by hand, and that is the whole of what stands here.
