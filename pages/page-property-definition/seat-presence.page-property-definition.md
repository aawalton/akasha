---
id: 08885bf1-5f9e-5ba2-9a1d-b28645edada6
page-type-slug: page-property-definition
title: "Seat presence"
defined-on-slug: page-type/seat
key: presence
type: boolean
computed: true
slug: seat-presence
domain-parent-slug: domain/seat-observation
settled: true
---

# Definition

- **Seat presence** — whether an agent is in a seat.

# Design

An agent is present while it has a process in the seat.

A seat whose presence could not be read states none.

A seat's presence records nothing about whether the seat may be worked again.

# Intent

Every seat an agent is present in holds an unfinished assignment.

Every absent seat holding an unfinished assignment has something that will resume it.
