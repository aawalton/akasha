---
id: 9d8de9e1-685d-544d-a6c4-55a4d6cad478
page-type-slug: domain
title: "Ops email auth"
slug: ops-email-auth
domain-parent-slug: domain/ops-email
required-reading-slugs:
  - domain/ops-namespace
  - domain/email
---

# Definition

- **Ops email auth** — the one command minting the Gmail refresh token every other command here reads from the environment.

# Design

Nothing here holds the token; the command prints it as an export line for `~/.secrets.env`.

The token carries the read, compose and modify scopes asked for at consent.
