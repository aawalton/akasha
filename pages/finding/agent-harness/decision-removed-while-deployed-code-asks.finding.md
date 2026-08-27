---
id: cedad8b7-f2d4-53b0-b66e-7a571aeac4ac
page-type-slug: finding
title: "A decision was removed while deployed code still asked for it, killing its one caller for thirty hours"
domain-slug: domain/agent-harness
---

# Claim

A decision was taken out of the instructions repository while deployed code still asked for it, and the one caller reaching that code died for about thirty hours. The removal and the code depending on it need two commits, and only one was made. Nothing failed at the boundary: the tool answered the keys it still knew and said nothing about the one it no longer did, so this reached the caller as a stack trace rather than as a refusal naming what was missing.

# Evidence

Instructions commit `16ee98f7a` at 2026-08-17 13:59 -0600, "a seat's name is an address ops seat send accepts", took `personaSeatMisaddressed` and `personaSeatRefusal` out of `tools/send-recipient.ts` and their two functions out of `tools/lib/decide-send-recipient.ts`.

The code repository at HEAD `5905e65e90` (2026-08-17 19:44 -0600) still calls both. `packages/agents/cli/src/agent/send.ts` line 109 calls `rule.isMisaddressed({...})` for every send whose target resolves to an agent id, and `packages/agents/cli/src/agent/send-recipient-rule.ts` asks for `personaSeatMisaddressed` there and for `personaSeatRefusal` inside the branch that call opens.

The blast radius is one command. `packages/alanwalton/projects/cli/src/project/rule.ts` is the only non-test import of `@agents/cli/agent/send` in `packages/`, so `ops project rule --rail wake` is the only caller that reached the missing decision. `ops seat send` was never affected: `tools/commands/seat/send.ts` composes its own flow and asks for `sendRecipient` alone. A send from #19349's seat landed at 2026-08-18T00:50:49Z, inside the window, which is what showed the wider reading wrong.

Measured 2026-08-18. `ops project rule --seq 19340 --rail wake` exited 70 with: "send-recipient: /var/home/walton/instructions/tools/send-recipient.ts exited 1, so nothing it decides is decided. It said: error: `personaSeatMisaddressed` names no decision this verb makes — it takes sendRecipient". The window runs from 13:59 on 2026-08-17 to the repair.

Instructions commit `99514587f9` restored `personaSeatMisaddressed` answering false for every input, which is what `domains/message-to.md` now intends. `personaSeatRefusal` was not restored: `send.ts` reaches it only inside the branch `isMisaddressed` never opens now.

NOT MEASURED. How many rulings failed in the window, or which seats went unstarted by them. Whether any other decision name crossed the same way — `tools/reaches.ts` publishes what this repository's commands reach, and nothing publishes the reverse, the direction that broke here.
