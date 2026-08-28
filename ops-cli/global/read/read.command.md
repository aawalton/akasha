---
id: 01a03f91-0e40-7000-b10c-75ee640482c7
page-type-slug: command
title: "Read"
slug: read
path: read
domain-parent-slug: domain/ops-global
required-reading-slugs:
  - page-type/command
---

# Definition

- **Read** — a file and what is required for it, recorded as read, and on a re-read only what changed.

# Design

A read of a body that is not UTF-8 text, or of a generated file, returns what it is instead of the body and records it read whole.

A read takes no line range.

A read too big for one answer returns fewer files and how to ask for the rest.

What a path warrants is worked out by the code that refuses the write.

A read runs akasha's reader a second time and records where the two disagree.

The second reader changes neither the answer nor whether the read succeeds.
