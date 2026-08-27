---
id: 1a7a7023-4266-5d62-aa6f-f62c590111ac
slug: row-lands-against-domain-vision
page-type-slug: finding
title: "Row lands against domain vision"
domain-slug: domain/agent-harness
---

# Claim

A project row can land a ruling that contradicts the vision of a domain it sits inside, and
nothing compares the two. `#17327` did, against `domains/persona.md`, and stood `done` for five
days while an initiative in a second domain carried the contradicted objective as an open gap.

# Evidence

`domains/persona.md`'s vision states: *"Every persona is one stable identity: a name carrying a
default role and a default domain, so that naming her names all three. Alan and any agent reach
her at that name alone and reach the same person each time."*

`#17327` is `done`. It implements a ruling recorded on the row:

> "In general, if a persona has a role they should absolutely be persona-role. Assume they will
> always be started with a role."

Reaching her at that name alone and always spelling her `{persona}-{role}` are not compatible. The
row acted on it, removing all 40 persona `SKILL.md:9` lines carrying `ops seat set-name
<persona>` — which its own notes call *"the only thing that claims a persona's name at all"*.

The effect reached the grammar: probed against `isDeclaredAgentName` on 2026-08-03, `athena`,
`sophia` and `amy` were all refused and no declared shape was a bare persona, while `an` still
composed one for a roleless launch. **That instance closed the same day** — Alan ruled the
persona-role ruling obsolete and #17561 (`b532e90e`) restored `{persona}` as a declared family, so
the probe now returns 41 of 41. The mechanism claim is unaffected: what closed it was a person
noticing, not anything comparing a row to a vision.

Nothing raised the conflict. `domains/persona.md` is owned by `sophia`; `#17327` sat in
`agent-harness`; `initiatives/seat-identity.md` carried *"addressed by her persona name alone"* as
an open objective throughout. Three surfaces, one contradiction, no reader holding two at once.
Alan declared the persona-role ruling obsolete on 2026-08-03, five days after the row went `done`.

The gap is not that a ruling was superseded, which is ordinary. It is that the landing was never
weighed against the visions of the domains it changed. `tasks/define-project.md` walks the
PRINCIPLES of every domain the work sits inside; it does not walk their visions.
