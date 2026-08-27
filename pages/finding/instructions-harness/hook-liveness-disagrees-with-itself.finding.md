---
id: abf3b7fe-3679-5e60-a307-b0b003036832
page-type-slug: finding
title: "Hook liveness disagrees with itself"
domain-slug: domain/global
---

# Claim

The `hook-liveness` gate reports its own instrument inoperative on some `ops instructions write`/`edit` calls and passing on others, within the same session and seconds apart.

# Evidence

Observed 2026-08-04 across six consecutive `ops instructions write` / `ops instructions edit` calls from one headless seat, no configuration changing between them.

Three calls reported `[hook-liveness] pass — tools/hooks/hold-identity.ts fired for this call 140ms/145ms/201ms ago`.

Three others reported `[hook-liveness] advisory — last fired ... for Bash, not for this call`, with the body: "`tools/hooks/hold-identity.ts` is firing for this agent but the last firing names neither `tools/edit.ts` nor `instructions edit`, so this act cannot be shown to have passed through it ... otherwise the hook stopped firing after <time> and everything it refuses is now inoperative."

The two readings alternated with no pattern in the calling shell, the door used, or the tree written. The advisory arm names a serious condition — the identity gate being inoperative — and it fires often enough beside a clean pass that a reader learns to ignore it, which is the failure mode an alarm has when it is intermittent rather than wrong.

Both arms cannot be true of the same running hook seconds apart, so at least one of the two readings is wrong. Which one is undetermined here: this seat did not instrument the hook itself, and the finding is filed on the disagreement rather than on a diagnosis of it.
