---
id: b8f4dd6a-8de4-5cee-8334-93061210db62
page-type-slug: finding
title: "Skipped status boundary"
domain-slug: page-type/message
---

# Claim

The one-time clear moving 464 `public.messages` rows from `pending` to `skipped` already ran at definition time, so code adding `skipped` to `MESSAGE_STATUSES` describes what is already stored rather than seeding an empty column, and `public.messages.status` is bare `text` — no default, CHECK or enum, verified against `information_schema` and `pg_constraint` — so the value costs no migration but the column is not guaranteed clean.

# Evidence

Project #17278 (front-matter domain: `project-status`, status: someday_maybe, live-on: deploy); never defined with an objective — moved off the retired `notes` attribute on 2026-08-15. Child of #17267 (the parent problem: 508 undeliverable/senderless pending mail with no terminal value); sibling of #17279 (the skip mechanism/threshold that writes `skipped`). `project-status` names no declared domain (only `project-status-terminal.md` exists, whose own `domain-parents: project-status` dangles); filed under `message` instead, since every fact here concerns the `messages` table's status vocabulary.

Exploration: the one-time clear already ran at definition time — 464 rows moved `pending` -> `skipped`. This child does not introduce a value into an empty column; it makes the type describe what is already stored. A worker must NOT assume the column is clean. It was safe to write ahead of the type because every drain narrows positively on `status='pending'` (the partial index covers exactly that), and the positive families have no consumer outside `message-status.unit.test.ts`.

Intent:
1. `skipped` goes in `MESSAGE_STATUSES` with a docstring: deliberately passed over, never delivered — same register as the four existing values.
2. Classified RESOLVED (fate established, will not be delivered again); the existing partition test guards this — an unclassified value must fail it.
3. Not spelled `read`: `read` asserts a witnessed delivery, written only where a witness is held; reasoning lives on the parent #17267 and is not re-litigated here.
4. `ops seat queue-reachability` reports the skipped population as its own, not stranded; declared baseline still reconciles after the 464.
5. Boundary weaker than it reads: `public.messages.status` is bare `text` — no default, CHECK, or enum, verified against `information_schema` and `pg_constraint`. Adding a value costs no migration. Whether a constraint should exist is separate; establish what writes the column first.
