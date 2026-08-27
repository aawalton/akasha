---
page-type-slug: domain
id: 0d9094f4-329f-5d67-824f-1337c56cf5cb
title: "Seat running"
slug: seat-running
domain-parent-slug: domain/seat-capability
settled: true
---

# Definition

- **Seat running** — a seat making something happen outside the repositories.

# Design

Whether a command's help must be read first turns on how it fails, not on how dangerous it is.

A command named inside a string or a heredoc counts as a call.

# Rules

## Scratch Location

**Write every throwaway file under `/var/tmp`, never `/tmp`.**

Here `/tmp` is RAM the whole fleet shares, and it fills on file count rather than size.

Never take a tool's `/tmp` default.

A file Alan will open is not throwaway.
