---
id: 07c89ef5-94a4-5e5d-985a-fff659cb8bcd
slug: definition-excludes-the-subagent-it-binds
page-type-slug: finding
title: "Definition excludes the subagent it binds"
domain-slug: domain/agent-turn-end
---

# Claim

`domains/agent-turn-end.md`'s Definition scopes the domain to an agent's work "in a seat", while its Design binds a subagent's turn end — and `domains/subagent.md` states flatly that a subagent is not a seat, so the document binds a case its own Definition excludes.

# Evidence

Measured 2026-08-11, on a `review-instructions` reading of `domains/agent-turn-end.md` dispatched from `review-documents`. The reading raised it as a fork it left standing; the three documents were re-read here rather than taken from it.

`domains/agent-turn-end.md`, Definition: "**Agent turn end** — an agent's work in a seat ending until its next turn starts." Design, second entry: "A subagent's turn ends by returning to the seat that ran it."

`domains/subagent.md`, Design, first entry: "A subagent is not a seat." Its Definition names a subagent as "an agent a seat runs with the Agent tool, stating no attributes of its own", and `domains/seat.md` gives a seat attributes, properties and a flex — none of which a subagent has.

`domains/subagent.md` says nothing about how a subagent's turn ends, so the entry is bound once and moving it would strand no reader.

The Definition is Alan's settled line, reworded by him at `5af0c2ae0` two days before this reading, and the commit message there shows the wording was weighed against a sibling edit he approved and the seat declined to take. The fork is whether the Definition widens off "in a seat" or the subagent entry moves to `domains/subagent.md`; either answer changes what the domain covers.

Not measured: whether any other domain's Definition scopes to a seat while binding subagents, or whether a reader has acted on the entry from the wrong document.
