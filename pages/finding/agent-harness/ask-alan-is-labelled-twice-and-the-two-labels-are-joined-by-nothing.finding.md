---
id: ec811eeb-987f-5f51-bc03-d754ae8f80f6
page-type-slug: finding
title: "Ask Alan is labelled twice and the two labels are joined by nothing"
domain-slug: domain/agent-harness
---

# Claim

The ask-alan path spells its own name twice — as a notification `kind` in one package and as a question page `source` in another — with no declaration, test or type tying the two, so they are two contracts that agree only because both were typed the same way, and renaming either breaks the join silently.

# Evidence

Measured 2026-08-13 in `~/code`, while verifying the port of `packages/agents/shared/ask-alan.ts` under #18904. Surfaced by the seat that ported it, from a mutation that SURVIVED, and confirmed here off disk.

Two declarations, two packages, one value:

- `packages/shared/notifications/src/notify.ts:17` — `export const ASK_ALAN_KIND = "ask-alan"`, written to the notification's `kind` field at line 68.
- `packages/agents/shared/ask-alan.ts:39` — `const ASK_ALAN_SOURCE = "ask-alan"`, private, written to the question page's `source` field at line 74.

The mutation is what makes the gap visible rather than theoretical. Reading the notification's `kind` off `ASK_ALAN_SOURCE` instead of `ASK_ALAN_KIND` moved NOTHING across the port's whole vector set — no digest, no assertion, no refusal. Respelling either constant's VALUE killed 14 answers each. So the value is pinned twice over and the WIRING between the two is pinned nowhere: an equivalence proof that catches a changed string cannot see that two fields were crossed, because crossing them is currently a no-op.

What that costs is the join, not the label. The notification is what reaches Alan and the page is what he opens; they are the two ends of one act. Today they match by coincidence of typing. A rename on either side leaves both files compiling, both suites green, and the notification pointing at a page nothing filters to it.

This is the shape `the-machine-prompt-prefix-is-spelled-six-times-and-pinned-in-two.md` records for a different string, and it is a different instance rather than the same one: that one is six spellings of one label inside one concern, this is two spellings across a producer and a consumer that nothing declares as a pair.

Not measured: whether any live reader filters questions on `source`, or whether the push router branches on `kind` at all — both would decide whether the break is visible to Alan or silent.
