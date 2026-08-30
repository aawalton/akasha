---
id: 01a05471-6b9b-7000-9640-0054eaa0b601
page-type-slug: page-property-definition
title: "Seat conditions extended context available"
defined-on-slug: page-type/seat-conditions
key: extended-context-available
type: boolean
default: false
slug: seat-conditions-extended-context-available
domain-parent-slug: page-type/seat-conditions
---

# Definition

- **Seat conditions extended context available** — whether a seat's models may be asked for the long context window.

# Design

This is one answer for the fleet rather than one per account.

A seat's model alias is settled when the seat spawns, and which account carries a
call is chosen for each call after that, so the account is not known at the moment
the question is asked.
