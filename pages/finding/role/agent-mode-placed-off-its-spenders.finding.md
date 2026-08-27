---
id: f32f9944-4508-5445-b95f-29f9bf927f01
page-type-slug: finding
title: "Agent mode placed off its spenders"
domain-slug: page-type/role
---

# Claim

`role` carries the `agent-mode` glossary entry, but nothing `role` governs uses the terms. The live spenders are the seat pin and `persona`'s One Question rule.

# Evidence

`domains/role.md` declares `glossary: [agent-mode]` and renders "**Agent mode** — whether anything attends an agent's output as it is produced: `interactive` or `headless`."

`rg -rln "headless|interactive" domains/roles/ domains/tasks/general/` returns nothing. `domains/role.md` declares `instructions-path: domains/tasks/general/*.md`, so that is the whole of what it governs.

`domains/persona.md` spends the distinction in its **One Question** rule — "headless, one ask-alan apiece; interactive, your last words" — and declares no `glossary:` of its own.

`domains/agent-mode.md` declares `domain-parents: agent`, which is not an ancestor of `role`, so the entry does carry a definition its readers cannot otherwise reach. That much is working.

Coverage is identical either way, since every seat boots both chains. So this is a placement question — where the term belongs — rather than a gap, and no instrument settles it.

Raised by the `review-instructions` reading of `domains/role.md` on 2026-08-05.
