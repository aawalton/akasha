---
id: a2664300-11ba-5a82-a574-3b5d726ef03b
page-type-slug: page-type
title: "Package"
extends-slug: domain
files: akasha:**/*.package.md
body-shape-slug: domain
slug: package
plural-slug: packages
domain-parent-slug: domain/repo-system
required-reading-slugs:
  - domain/workspace-package
named-for: "{slug}"
---

# Definition

- **Package** — a domain whose subject is one workspace package.

# Design

A package page stands whether or not anything has been written about it yet.

A package's parent is the system it serves, not the folder it sits in.

# Intent

A package's files are read off the workspace that declares them, never matched by path.
