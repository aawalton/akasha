---
id: a7a1d870-d2fc-5704-90a9-e5bb4dca330c
page-type-slug: domain
title: "Page storage secret"
slug: page-storage-secret
domain-parent-slug: domain/page-storage
---

# Definition

- **Page storage secret** — a page property a page's files hold without revealing.

# Design

Everyone who can read a page's repo can read every page in it from the files.

A secret's value stands in a sops file beside the page, never in the page's own frontmatter.

A page's sops file is named for the page, with `.md` replaced by `.sops.yaml`.

# Intent

A secret's value is unreadable to whoever holds the files.

A secret's value goes in through a command that encrypts it, rather than through a write of the page's file.

A secret's value is withheld from a read that did not ask for it.
