---
id: 2bf5d6f8-9858-5db3-a177-91d5d3ef876c
slug: subagent-page-reaches-no-seat
page-type-slug: finding
title: "Nothing pulls the subagent page type into a seat's required reading"
domain-slug: domain/seat-delegating
---

# Claim

Nothing pulls `pages/page-type/subagent.md` into a seat's required reading. It is reachable only through an explicit `required-reading-slugs:` entry, because required reading closes over `domain-parent-slug` and `required-reading-slugs` and never follows `page-type-slug`. No document names it.

So what the corpus states about a subagent — what it is, what it reads, which tools it calls, how a message to one behaves — reaches no agent that runs one.

# Evidence

`bun tools/read.ts --seat` for persona `ryn`, domain `domain-system`, role `definer` returns 60 documents. `pages/page-type/subagent.md` is not among them. `pages/page-type/role.md` names `seat-writing`, `seat-running` and `seat-delegating` under `required-reading-slugs:` and does not name `subagent`.

Grepped the corpus for a `required-reading-slugs:` entry naming `subagent` and found none.

`pages/subagent/definitions.md` asserted the opposite until commit `d49539d4f`, in the clause "which every seat carrying a role holds at boot", and thinned each delegate's `### Description` on the strength of it. That clause is now removed; the wiring question it depended on is what this records.

Not measured: whether every seat shape reaches the same answer. One seat's set was pulled, carrying persona, domain and role and no assignment. A seat holding a task, project or initiative pulls more, and none of those chains was checked for an entry naming `subagent`.

Not measured: whether the page should be required reading at all, or whether its content belongs on `pages/domain/seat-delegating.md` instead. This records the gap, not the remedy.
