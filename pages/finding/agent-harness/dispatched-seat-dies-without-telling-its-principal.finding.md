---
id: a9f28a7f-39b2-5e0c-9c9c-d9147325db6e
slug: dispatched-seat-dies-without-telling-its-principal
page-type-slug: finding
title: "A dispatched seat can die without anything telling the principal who dispatched it"
domain-slug: domain/agent-harness
---

# Claim

A dispatched seat can die without ever handing back, and nothing tells the
principal who dispatched it. The row stays at the status the dispatch set, the
work is untouched, and the only signal is that a seat which should be running is
absent from `ops seat list` — which nobody reads unless they already suspect it.

# Evidence

Measured 2026-08-18. `page-type-backing-file-developer-build-singleton-deploy-19403`,
agent `01a01556-5ea5-78c5-9bd0-031a0fa4275a`, dispatched by amy against #19403.

`ops seat exits --name <it>` records one line:

    2026-08-18T15:48:43.484Z  child-exit  reaper=none
    spawn-state wrapper pid alive (kill -0)  child-crashed

`reaper=none` with the wrapper pid still alive, so this is not the self-heal
mechanism filed at `self-heal-kills-seats-waiting-on-ci.md`, which records
`crash-reaped` and a SIGTERM in its supervisor log. Different cause, same
silence.

The seat did NO work before dying. #19403 still stands at `awaiting_worker_seat`,
the status its dispatch set; #19403's own document still carried amy's definition
with no seat edits; and `ops page list --type readout-scale` still answers
`page type not found for slug: readout-scale`, which was the project's first
measurement and its whole subject.

It read `parked` in `ops seat list` for roughly forty minutes before the exit,
which is indistinguishable from a seat thinking.

HOW IT WAS FOUND is the point. Alan noticed that six project files stood while
four delegate seats ran, and asked what was in the gap. Nothing else surfaced it.
No message reached the dispatching seat, no row changed, and the exit record
exists but is only reachable by asking for it by name — `ops seat exits --since 12h`
over the whole fleet returns this one line, so the reading is cheap and simply
was not taken by anything.

`ops seat exits` warns in its own header that it counts records rather than
deaths: a death no exit site observed leaves no record at all. So the true
population of silent deaths is at least this one and cannot be read off this
instrument.

The cost here was one dispatch and forty minutes. The general cost is that a
principal holding several dispatched seats has no signal distinguishing a seat
working from a seat dead, and #19373 was dispatched depending on this row.
