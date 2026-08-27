---
page-type-slug: page-type
title: "Ops command"
id: 019ffe7e-358c-7000-b3b4-ce1b3f003972
extends-slug: domain
files: instructions:**/*.ops-command.md
body-shape-slug: ops-command
slug: ops-command
domain-parent-slug: domain/ops-cli
required-reading-slugs:
  - domain/command
---

# Definition

- **Ops command** — a command reached through `ops`.

# Design

Each command has a document of its own, slugged for the whole invocation.

A command is required reading for the one file it runs, and nothing else.

Each command's own document declares whether it is irreversible.


# Intent

Every command's help stands in its own document.

Every command names the namespace it is invoked through as its parent.

A command is not a test.

A command is not a service.


A command performing a transition a domain names is spelled with that name.
