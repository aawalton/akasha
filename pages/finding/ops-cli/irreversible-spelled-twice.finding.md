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

Re-measured in the akasha repository on 2026-08-27: 39 files under `pages/old-ops-command/` carry `irreversible: true`, and 6 declarations carry `irreversible: "irreversible"` — four under `tools/` (`tools/commands/ali/fold.ts:22`, `tools/commands/ask-alan.ts:11`, `tools/commands/page/secret/clear.ts:9`, `tools/lib/seat-send-help.ts:4`) and two under `ops-cli/` (`ops-cli/global/rm/rm.command.code.attachment.ts:134`, `ops-cli/global/deploy/deploy.command.code.attachment.ts:55`).

`tools/lib/ops-command.ts:84` tests `module.help?.irreversible === "irreversible"` when building the manifest that `tools/hooks/agent-hook-require-ops-help.agent-hook.code.attachment.ts` consults, so the document's value reaches nothing.

The 6 commands actually gated are `ali fold`, `ask-alan`, `deploy`, `page secret clear`, `rm` and `seat send`.

Not measured: whether the 35 documents declaring irreversibility without a matching code declaration are right about their commands, or whether the documents or the code hold the truth. I did not read those 35 commands. A search of `tools/` for `irreversible` returned thirteen sites, none of them a check comparing the two.
