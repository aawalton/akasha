---
id: 56a5def0-784f-5d00-9b5b-d20e8288d0c3
page-type-slug: domain
title: "Seat turn idle on-call"
slug: seat-turn-idle-on-call
domain-parent-slug: domain/seat-turn-idle
---

# Definition

- **Seat turn idle on-call** — an idle seat standing by rather than waiting on Alan.

# Design

A seat is idle on-call where its role declares it on-call.

A seat whose role does not is idle waiting on Alan, whatever assignment the seat itself holds.

An idle seat with something it arranged still to come is read as pending rather than as on-call.
