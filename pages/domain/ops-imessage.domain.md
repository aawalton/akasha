---
id: 755b7133-34a1-5f90-aee9-beca837ef495
page-type-slug: domain
title: "Ops imessage"
slug: ops-imessage
domain-parent-slug: domain/ops-cli
required-reading-slugs:
  - domain/ops-namespace
---

# Definition

- **Ops imessage** — the commands that read the macbook's messages and contacts, and send one through its Messages app.

# Design

Every command reaches the macbook over ssh and runs sqlite3 or osascript there, so a run costs a round trip and leaves nothing here.

A contact is given as an AddressBook name, a phone number or an email alike.
