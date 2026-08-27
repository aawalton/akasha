---
id: 8578a64d-c82b-525f-9fa3-acd5447c5364
page-type-slug: old-ops-command
title: "Ops page secret show"
slug: ops-page-secret-show
domain-parent-slug: domain/ops-page-secret
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/page/secret/show.ts
path: page secret show
irreversible: false
---

# Definition

- **Ops page secret show** — which secrets a page holds, none of them decrypted.

# Design

A show decrypts nothing and prints no value.

Which keys a sops file holds is readable without the key that opens them.

The keys held are read off the file on disk, and the keys declared off the page type claiming the path.

# Help

Print which keys the sops file beside a page holds, and which keys that page's type declares
`secret: true`. No value is printed and nothing is decrypted: which keys a sops file holds is
readable without the key that would open them.

The two lines are read from different places and are meant to be compared. `held:` is read off
the sops file as it stands on disk; `secret:` is read off the page type claiming the path,
resolved from the file tree now. A path no page type claims is refused, because nothing then
declares what the page may hold.

The repository is the one the page stands in: an absolute path carries it, and a relative one
is taken against the directory this ran in.
