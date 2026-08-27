---
id: d0085fde-a132-56ce-8cc4-0521d48e8653
page-type-slug: finding
title: "Hand back names no command"
domain-slug: domain/global
---

# Claim

The hand-back step of `domains/tasks/archivist/ingest-instructions.md` names no command. 4/**Hand** says to hand back and 4/**Stop** says "once the handback has gone", and nothing between them says how it goes — where the six project task documents that hand back at the same point all name `ops seat send --help`.

# Evidence

Raised by the dispatched reviewer of `domains/tasks/archivist/ingest-instructions.md` on 2026-08-08 and relayed here unjudged. It did not add the command: Add is the one act in `review-instructions` that grows what every reader pays at boot, and the task reserves anything resting on judgment for the principal.

The count of six sibling task documents is the reviewer's; I did not survey them. It did run `ops seat stop --help` in the same reading and confirmed the positional defaults to `$AGENT_ID`, so the command 4/**Stop** names is right — the gap is on the line above it.

Not measured: whether any ingest seat has actually failed to hand back, or handed back by a route nobody expected. The seats in this pass all handed back on an instruction carried in their dispatch prompt rather than from the task document, which is exactly the substitution that would keep this gap invisible.
