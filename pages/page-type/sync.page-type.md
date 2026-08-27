---
id: abaa065f-421f-55e9-8343-1acbf83facfa
page-type-slug: page-type
title: "Sync"
extends-slug: page
files: akasha:**/*.sync.md
body-shape-slug: empty
slug: sync
domain-parent-slug: domain/collection-system
named-for: "{slug}"
---

# Definition

- **Sync** — one outside place this system pulls from, and how each pull went.

# Design

A sync runs one pull at a time, and a second starting says the first died without saying so.

Which pull is in flight is rewritten on every start and every finish, so it is held without being committed.
