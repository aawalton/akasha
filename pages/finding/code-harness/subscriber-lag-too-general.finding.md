---
id: 9b084a3b-c4d0-57a2-83c7-d03c8fcca075
slug: subscriber-lag-too-general
page-type-slug: finding
title: "Subscriber lag too general"
domain-slug: domain/global
---

# Claim

`subscriber-lag` fires for any subscriber falling behind the event stream, and it is filed to `code-harness` because the subscribers that matter most today are that domain's. Subscribers outside code-harness raise the same condition, and their alerts now reach the code-harness operator.

# Evidence

The condition's own definition is domain-agnostic: "a subscriber has fallen behind the event stream." Its subject is `events-system`, whose glossary declares `events-subscriber` and whose `code-path` is `packages/shared/worker-runtime/**` — a shared package, so its subscribers are not confined to one domain.

Before this filing the document declared `persona: aranya` while the firing site at `packages/agents/devops-monitor/src/wedges/subscriber-lag.ts` used the literal `"dalla"`, so the document and the code had already disagreed about the recipient without either being the condition's true domain.

`events-system` carries no `persona-champion`, so stating it as the requirement would have resolved to nobody under exact matching. `graph-system` has the same gap.

The split would be one condition per subscriber domain, or one condition that states its domain from whichever subscriber lagged.
