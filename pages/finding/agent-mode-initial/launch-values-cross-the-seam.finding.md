---
id: 9772531c-2222-5278-b864-3cd0d53ecfed
page-type-slug: finding
title: "Launch values cross the seam"
domain-slug: domain/agent-mode-initial
---

# Claim

The launch vocabulary is read on both sides of the repository boundary, so renaming its values cannot be done in one repository. `tools/lib/seat-flex.ts` in the instructions repository compares against the literal `spawned`, which the supervisor in the code repository exports to each seat. The instructions side is live on the commit and the code side only on a deploy, so either half changed alone leaves flex assignment refusing every seat it is asked about.

# Evidence

`tools/lib/seat-flex.ts:47-48` holds `const SPAWNED = "spawned"` under a comment naming it the one launch that may carry a flex. The value it compares against arrives from the code repository: `packages/agents/shared/agent-launch.ts:72` is the variable the supervisor exports so a process can read its own launch, and the three values are declared at `agent-launch.ts:47`.

Measured over `pages` where `page_type_slug = 'agent'` on 2026-08-12, 1812 live rows: 1771 carry `launch: spawned`, 40 carry `opened`, 1 carries none. No row has ever carried `nested`, a delegate not being a seat.

The rename this constrains is `domains/agent-mode-initial.md`, whose Intent states that an agent's initial mode is stored as a mode rather than as a launch. The retired vocabulary stands at `domains/retired/agent-launch.md`.
