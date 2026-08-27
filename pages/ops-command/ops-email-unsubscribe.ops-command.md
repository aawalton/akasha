---
id: 52e06dc7-5cd9-5cd4-8f04-f7d5fc9c24f5
page-type-slug: ops-command
title: "Ops email unsubscribe"
slug: ops-email-unsubscribe
domain-parent-slug: domain/ops-email
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/email/unsubscribe.ts
path: email unsubscribe
irreversible: true
---

# Definition

- **Ops email unsubscribe** — an unsubscribe fired down the route one message's own headers advertise.

# Help

Unsubscribe from a message using ONLY its List-Unsubscribe / List-Unsubscribe-Post headers (RFC 2369 / 8058) — never body links. With --dry-run, prints the parsed intent (what it would do) as JSON without firing. Otherwise fires the one-click POST or mailto fallback and prints the result as JSON.
