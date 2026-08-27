---
id: ad277a2a-dfcc-5265-90f4-4c84a081fdf1
page-type-slug: finding
title: "Persona roster has two stores"
domain-slug: domain/agent-harness
---

# Claim

The persona roster is enumerated from two stores that disagree in both directions. The name
grammar reads the corpus, which holds `claude` and no `alan`; wake-arming reads the persona pages
via `listPersonaSlugs`, which hold `alan` and no `claude`. Nothing compares them.

# Evidence

Measured 2026-08-03 during `#17561`'s definition pass and corroborated first-hand.

The corpus holds 41 persona documents in `personas/`. `claude.md` is among them; there is no
`alan.md`. That is the roster `parseAgentName` checks a name against, through the
`AgentNameRoster`'s `personaSlugs`.

`listPersonaSlugs` (`packages/agents/shared/persona-wake-slugs.ts:144`) enumerates persona PAGES
instead, and the pass measured 42 — carrying `alan` and not carrying `claude`. Its own docblock at
line 87 describes itself as "single persona-enumeration source for the persona-gated agent
behaviors", which is true of the behaviours it serves and not of the estate: the grammar does not
consult it.

The `alan` direction is correct by design — `alan` is the declared human exception, a name with one
holder and no grammar producing it, so a document for her would be the anomaly.

The `claude` direction is the defect. `domains/persona.md` states that everything not worn for Alan
"runs as `claude`, whose whole content is that nothing has been authored over it", so `claude` is
the most-used persona in the estate. Once `#17561` admits the bare persona slug as a bindable name,
a seat named `claude` binds through the grammar and is armed by nothing on the wake path, because
wake-arming's roster does not carry her. It would be reachable by `ops seat send` and unrevivable
by inbound mail.

The condition is pre-existing rather than introduced by `#17561`: the two stores already disagree
and already serve different questions. What `#17561` changes is that the disagreement becomes
reachable for the one persona it omits.
