---
id: ff0b29ab-7e25-5687-9d6b-2a0aad4b0f0c
page-type-slug: finding
title: "Persona default role unpinned"
domain-slug: barred-meaning/identity
---

# Claim

The interactive front `an <persona>` pins the fallback role `worker` rather than the role that persona's own document declares, so a persona whose default role is anything but `worker` boots into a seat pinned to the wrong one.

# Evidence

Alan ran `an athena` and the seat booted pinned to `role worker`. `personas/athena.md` declares `role: lead`. The same boot pinned `domain agent-harness`, which is that document's `championed-domain:`, so the persona document was reached and only the role did not survive to the pin.

`packages/shared/cli/src/aw/init/pin-identity.ts` pins each axis from `ops seat whoami` against the seat's row, and substitutes the fallback `worker` wherever the row answers empty or `null` — so a row that never recorded a role is indistinguishable at the front from one that recorded `worker`. The reader for the key exists further back: `packages/agents/shared/persona-corpus.ts` lifts `role:` off the persona document, and `persona-facts.ts` composes a binding of role and domain per persona slug.

Not measured: which link between the corpus and the row drops it. I did not read the agent row for this seat, did not run `ops seat whoami` against its id, and did not check whether `ops seat start` states the role when it mints the row. I also did not trace `task change-instructions`, which the same boot pinned although that front declares `task` is not one of its axes. One occurrence, my own boot; I did not re-run `an athena` to see whether it repeats, and I have tested no other persona whose declared role is not `worker`.
