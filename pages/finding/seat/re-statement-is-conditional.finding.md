---
id: d4211054-f7bf-5643-8754-0c2c476087da
slug: re-statement-is-conditional
page-type-slug: finding
title: "Re statement is conditional"
domain-slug: page-type/seat
---

# Claim

A seat's definition grants that its attributes can be re-stated, and the code refuses the whole statement — every axis at once — whenever the name it would compose is already held by a live seat.

# Evidence

`domains/seat.md` states the permission without condition.

`tools/seat.ts:241-256` refuses before anything local records that the statement happened, on the ground that a spelling held by a live seat is one seat stating its way onto another's work. `tools/lib/seat-rename.ts:157-187` enforces the same at the other repository's boundary. The refusal is total: persona, domain, role, task and seq are rejected together at `tools/seat.ts:255`.
