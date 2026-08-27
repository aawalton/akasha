---
id: b9f9879b-e57f-54c1-80c3-c57105e0377b
page-type-slug: finding
title: "Order copied into serving code"
domain-slug: domain/global
---

# Claim

The code that serves a stoplight readout holds its own copy of that readout's order, and nothing holds the two copies against each other.

# Evidence

The authored orders stand in `tools/lib/readout-definitions.ts` in the instructions repository, declared as `order` bars and projected into a `readout` page type as `orders`.

The three routes that serve those readouts do not read that projection. `/api/values-stoplights`, `/api/inbox-stoplights` and `/api/habit-stoplights` each map through `VALUES_ORDER`, `INBOX_ORDER` or `UPKEEP_ORDER`, three array literals in `@shared/status-bar-access`, whose entries duplicate the declared keys.

Searched for a check holding the two sides together and found none, the same way #18910 found none holding the iOS widgets' own order literals against anything. That project removed the widget copies on the argument that an order written where nothing watches it is a second authority on a decision authored elsewhere; the copies described here are the same shape one layer in, and were outside that project's criteria, which spoke about widgets.

What makes this worth a note rather than nothing: a reorder authored in the instructions repository now reaches the widgets, because they render whatever the route sends — so the route is the last place the order can go wrong quietly, and it is the place with no instrument on it.
