---
id: 515a125d-7e32-5fc2-9dcb-33651f0099c5
slug: irreversible-spelled-twice
page-type-slug: finding
title: "Irreversibility is stated on the document and in the code, and only the code gates"
domain-slug: domain/ops-cli
---

# Claim

Whether an `ops` command is irreversible is stated in two places — `irreversible: true` on its document and `irreversible: "irreversible"` in its help object — and only the code one is read. The hook that demands a command's help be read before it runs consults the module, so a document declaring a command irreversible has no effect on whether that command is gated.

# Evidence

Measured in the instructions repository on 2026-08-24: 45 files under `pages/ops-command/` carry `irreversible: true`, and 6 declarations under `tools/` carry `irreversible: "irreversible"`.

`tools/lib/ops-command.ts:74` tests `module.help?.irreversible === "irreversible"` when building the manifest that `tools/hooks/require-ops-help.ts` consults, so the document's value reaches nothing.

The 6 commands actually gated are `ali fold`, `ask-alan`, `branch delete`, `branch rebase`, `page secret clear` and `seat send`.

Not measured: whether the 39 documents declaring irreversibility without a matching code declaration are right about their commands, or whether the documents or the code hold the truth. I did not read those 39 commands. A search of `tools/` for `irreversible` returned ten sites, none of them a check comparing the two, but I did not search other repositories.
