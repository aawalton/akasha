---
id: 043bc2f2-a86b-564f-802e-bcafeeb942c2
page-type-slug: old-ops-command
title: "Ops page secret reveal"
slug: ops-page-secret-reveal
domain-parent-slug: domain/ops-page-secret
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/page/secret/reveal.ts
path: page secret reveal
irreversible: false
---

# Definition

- **Ops page secret reveal** — one secret decrypted and printed.

# Design

A reveal writes nothing.

The value reaches stdout in the clear, and where it stands after that is whatever received it.

A key is refused before anything is decrypted.

# Help

Decrypt one key out of the sops file beside a page and print its value on stdout, with a
trailing newline and nothing else. Nothing is written: the sops file, the page and the repo
are left exactly as they stood.

WHICH KEYS EXIST IS THE PAGE TYPE'S CALL, not this command's. A key the page type does not
declare `secret: true` is refused naming the ones it does, before any decryption is attempted.

The value reaches stdout in the clear, so what receives it decides where it then stands. Pipe
it; do not let it land in a file, a log or a shell history.

The repository is the one the page stands in: an absolute path carries it, and a relative one
is taken against the directory this ran in.
