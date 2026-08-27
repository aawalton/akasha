---
id: 136d55ef-fe42-50eb-b012-79dd9eaae4f1
page-type-slug: ops-command
title: "Ops imessage contacts"
slug: ops-imessage-contacts
domain-parent-slug: domain/ops-imessage
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/imessage/contacts.ts
path: imessage contacts
---

# Definition

- **Ops imessage contacts** — the macbook's merged AddressBook filtered by a name substring, one line per contact.

# Help

Search the macbook's AddressBook (every source db, merged) by name — case-insensitive substring over first/last/organization names.

Default stdout (one line per contact; no match → empty stdout, exit 0):
  <name>\t<phones-csv>\t<emails-csv>
