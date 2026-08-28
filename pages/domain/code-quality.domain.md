---
id: b68fd1ce-29ca-5812-abe8-b3e502894812
page-type-slug: domain
title: "Code quality"
slug: code-quality
domain-parent-slug: domain/coding
required-reading-slugs:
  - domain/file-structure
  - domain/generated-file
conditional-reading-slugs:
  - split-file
settled: true
---

# Definition

- **Code quality** — how a body of code is organized and structured, and what has been left in it.

# Rules

## Bounded Wait

**Give every wait a ceiling, and fail at that ceiling with the reason the wait was for.**

An unbounded wait emits nothing, neither finished nor failed, so nothing alerts and nothing retries.

Bound the whole wait, not each attempt.

Never go on past the ceiling without the result.

## Split First

**Split an authored file too big to read in one answer before you change it, never around it.**

A write needs a body read, and no read returns this one, so the two refusals point at each other.

The split is derived, not authored.

A part still too big to read is not split.

## Real Path

**Resolve a filesystem path to its real location where the path is made.**

Two spellings of a path open the same file, so nothing fails until a comparison quietly answers no.

Follow the symlink; `path.resolve` does not.

Where nothing is there yet, resolve the parent.

## No Class

**Write a plain function; never a `class`.**

A class ties state to behaviour behind a `this` the call site can change.

Extend `Error` where a throw needs its own type.

A class expression is a class.
