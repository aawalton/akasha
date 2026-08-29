---
id: 01a04a2c-9c3d-7765-aa3b-9f9701bab539
page-type-slug: check
title: "Akasha witness not asserted"
slug: akasha-witness-not-asserted
needs: tree
check-on-patch: true
check-on-worktree: false
---

# Definition

- **Akasha witness not asserted** — fails a file asserting to a witness type outside the module that declares it.

# Design

A witness type is one carrying a key computed from a `unique symbol` its module declares and does not export.

The module declaring a witness may assert to it, that being the only way one is made.

A witness type is found rather than listed, so a new one is covered as soon as it is written.

Only a file under the `akasha` folder is judged.
