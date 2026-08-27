---
id: 32d656c4-468c-5da6-a2fa-5d65a4e38eed
slug: inbound-import-unresolved
page-type-slug: refusal
title: "Inbound import unresolved"
holes:
  - repo
  - importer
  - target
---

# Refusal

`{repo}` imports `{target}` at `{importer}`, and this change leaves no such file here.

Nothing outside akasha is gated, so no write there will refuse the import once it breaks; it fails when the module is next loaded, which is the next time anyone runs a command that reaches it. Move the file back, or land the importer's new path in the same act.
