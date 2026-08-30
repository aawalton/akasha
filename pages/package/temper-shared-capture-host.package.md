---
id: c5b1198e-f214-5add-8fab-b962531eb256
page-type-slug: package
title: "Temper shared capture host"
slug: temper-shared-capture-host
repo: akasha
domain-parent-slug: domain/temper-eso-files
---

# Definition

- **Temper shared capture host** — the code that reads a capture file's outer table and checks its schema against the addon's.

# Design

A payload mirror is strict; a permissive one carries an extra key the equality check never matches.

The check passes over nothing unless the writer and the reader derive from one declared shape.

An addon whose saved variables hold more than capture takes the reader half alone and keeps its own writer.

Such an addon's parse stays tolerant of partial records, and drift is caught where the types meet instead.
