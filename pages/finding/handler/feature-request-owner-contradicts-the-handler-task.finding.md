---
id: 8f17e7e4-7631-5f70-91c8-46768171004b
slug: feature-request-owner-contradicts-the-handler-task
page-type-slug: finding
title: "Feature request owner contradicts the handler task"
domain-slug: role/handler
---

# Claim

`ops feature-request submit` writes the issue owned by the triaging actor — its own help calling that a rule, "Never the requester" — and records the person who asked nowhere. The `handle-inbound` invariant on the same path says to own every row by her resolved account rather than by whatever account you are running under. A handler following its task and one following the command's help produce different owners for one inbound, and nothing compares them.

# Evidence

Read 2026-08-09 against `~/code` on `main`.

`packages/alanwalton/feature-requests/src/cli/submit.ts` declares the `--owner-id` flag as "Supabase user id to own the issue — the actor that triages it (default USER_ID). Never the requester." Its `description` repeats the same in prose: the issue is written "owned by `--owner-id` (default the actor, not the requester)". The default comes from `USER_ID` imported from `@shared/supabase-auth`, which is the account the command is running under rather than anything derived from the inbound.

The module header states the same intent a third time: "written owned by the actor (`--owner-id`, default `USER_ID`)".

`domains/tasks/handler/handle-inbound.md`, step 3, carries the opposing instruction: "**Own** every row by her resolved account rather than by a placeholder, a service role, or whatever account you are running under. Each of those exposes her to every reader, so the write has to go through a command that takes the id." The command does take an id, so a handler obeying its task would pass her account — and the flag's own help calls that the one thing it is never for.

Nothing on the row carries the requester either way. The proposal payload is Zod-parsed at the boundary and written into `observations`, so whether the asker's identity survives depends on what the composing seat chose to put in prose, which no schema requires and no check reads.

Not established: which of the two is meant to give way. The command's reasoning — an issue is a triage artifact belonging to whoever triages it — is coherent on its own, and so is the task's, that a row about a person's request should not be owned by a service account. They are only in conflict because one inbound reaches both.

Not measured: whether any handler has yet run this path, or how many `issue` rows of `kind: feature-request` stand and under whose account.
