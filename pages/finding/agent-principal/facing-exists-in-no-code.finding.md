---
id: 310018f0-e980-5a44-a9f2-8f561327e963
page-type-slug: finding
title: "Facing exists in no code"
domain-slug: domain/global
---

# Claim

Both facing domains are referenced by nothing in either repository, and the question they name is re-derived at four sites from four different inputs.

# Evidence

Searching both repos for alan-facing, agent-facing, alanFacing and agentFacing as an identity concept returns nothing. There is no column, no constant and no type.

The four derivations: name equality against the protected name at `cli/src/agent/send.ts:173`; persona resolution at `shared/ask-alan.ts:168-175`; absence of a name at `send.ts:393-397`; and prompt envelope shape at `shared/prompt-shape.ts:184-192`.

`send.ts:389-392` records its own premise as measurably false — the test assumes only an interactive seat is unnamed, and unnamed headless rows exist in quantity, each falsely reading as Alan reaching out.
