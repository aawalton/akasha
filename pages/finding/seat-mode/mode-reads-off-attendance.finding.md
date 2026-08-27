---
id: cdaa3287-a654-5aac-a886-bd23e1049de6
page-type-slug: finding
title: "Seat mode reads off attendance"
domain-slug: page-property-definition/seat-mode
---

# Claim

A seat's mode is observable, and two independent readings agree on every session standing: whether a tmux client is attached, and whether an editor terminal page names the seat.

# Evidence

Measured 2026-08-19 across all ten tmux sessions on the workstation, each read three ways: clients attached, whether a process runs under the session's pane, and whether any page under `memory/terminals/` states the seat as its `seat-name`.

Eight sessions — `abby`, `amy`, `amy-alan-handler`, `athena`, `awen`, `dalla`, `nimue`, `thea` — each carry one client, a running agent, and an editor terminal page. `pages-system-lead` carries a running agent, zero clients, and no editor terminal page. `sophia` carries no agent at all, so no mode question arises for it.

The two observables separate the same seats. Neither disagrees with the other on any of the ten, and neither disagrees with what was recorded: `pages-system-lead`'s bucket states `mode: headless`, and it is the one seat nothing is attending.

What the earlier reading missed. It measured the nine seats standing in `memory/seats/`, which were exactly the seats with a terminal attached — a spawned seat had no page at all then, so every headless seat was invisible to the sample. Its conclusion that `tmux list-clients` reports a client on every session was true of what it looked at and false of the population.

The editor terminal reading is the one `seat-mode` names, and it became answerable from outside the editor only on 2026-08-19, when the editor began writing its terminals as pages. The client reading is the more robust of the two: it holds for a seat attended from something that is not the editor, and it does not depend on an editor window having been reloaded since the writer landed.
