---
id: 5598f9fd-7ed4-5da6-845c-764d55da016d
page-type-slug: finding
title: "Action routes to a retired seat"
domain-slug: domain/global
---

# Claim

The Tower routes every player action Alan submits to `awen-gm--the-tower`, whose agent row is
`retired` — the terminal do-not-revive state — and whose name resolves no identity at all. The
fleet the surface was written for was reseated in July and its retirement was approved and never
performed.

# Evidence

Observed 2026-08-03, verified first-hand rather than read off a note.

`~/agents/iris/litrpg/display/serve.ts:79` spawns, for each POSTed player action:

    bun ops seat send awen-gm--the-tower --agent-id <ACTION_BOX_AGENT_ID> --content <action>

That row is `retired` (`seq 9717`), a terminal state as against a transient `stop`, so nothing
revives the target on delivery.

The name also resolves nothing. The `instanced-seat` shape is `[{persona}-]{role}--{campaign}`
and `gm` is not among the nameable role tokens — the corpus declares `game-master`. So the target
is both retired and unclassifiable, and every consumer keyed on a seat's role or persona reads
unknown for it.

The comment directly above the call still describes the old topology: "Route a player action to the
coordinator agent (iris)". `iris` is `retired` too.

Context, from `#17564`'s definition pass: `#15155` ("Reseat the-tower onto game-scoped author
seats") is `done` and moved The Tower off `iris`; the game row carries
`coordinatorAgent = awen-gm--the-tower`. That row's verdict recorded a FLEET RETIRE with all gates
met, deferred to an act gated on iris's signal after the first real turn. `display/state.json`
reads turn 83 with mtime 2026-07-03; the turn never came and the signal-holder is now retired.

Alan has confirmed the awen engine is down for the rebuild, so nothing is currently broken for a
player. This is filed so the routing target is corrected before the engine comes back up, rather
than discovered by a player action that goes nowhere.

Two adjacent corpus facts, found while siting this: `domains/the-tower.md` declares
`domain-parents: narrative-engine`, and `domains/narrative-engine.md` does not exist; and its
`persona-champion-slug:` is `iris`, whose row is retired.
