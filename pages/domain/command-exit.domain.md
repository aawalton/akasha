---
id: f6c423fb-4857-5f15-a50c-051a306f8915
page-type-slug: domain
title: "Command exit"
slug: command-exit
domain-parent-slug: domain/command
---

# Definition

- **Command exit** — the number a finished command leaves for its caller.

# Design

A command chooses its exit from 0, 1, 2 and 3, or declares its own at 4 or above rather than giving one of those a second meaning.
