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

A read returns the whole file where the agent asks for it or nothing says what it last saw.

A read of a body that is not UTF-8 text, or of a generated file, returns what it is instead of the body and records it read whole.

A read takes no line range.

A read too big for one answer returns fewer files and how to ask for the rest.

A body past what one answer holds returns what it is, and records nothing.

The second reader changes neither the answer nor whether the read succeeds.
