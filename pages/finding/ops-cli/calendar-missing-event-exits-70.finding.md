---
id: 7e213460-d7ee-53b5-91bd-ce867275bb0c
slug: calendar-missing-event-exits-70
page-type-slug: finding
title: "Calendar missing event exits 70"
domain-slug: domain/ops-cli
---

# Claim

`ops calendar events delete` given an event id that matches nothing exits 70 with a bare `Not Found`, reporting a caller's wrong id as an unhandled defect. `ops calendar events get` does the same. Neither is changed by the move — both did this before and after.

# Evidence

Measured 2026-08-13 while proving the moved bodies, against the live tree and then the worktree, byte-identical both ways:

    $ ops calendar events delete --event flex35probe-no-such-event
    ...
    Not Found
    exit=70

The id was chosen to match no event, so nothing was deleted; the round-trip to Google ran and its 404 came back.

`alanwalton/calendar-google/src/events.ts` neither catches nor classifies what `client.raw.events.get` (`:43`) and `.delete` (`:73`) throw, and neither does the verb calling them (`tools/commands/calendar/events/delete.ts`, `get.ts`). `tools/lib/exit.ts`'s `exitCodeOf` (`:41`) classifies by the thrown error's `name` against the five in `CARRIES_A_CODE` — `ExitError`, `CliError`, `InputError`, `DataError`, `OperationalError` — so a `GaxiosError` matches none and falls through to 70. Neither verb's help declares any exits at all. The same verb's parse refusal is classified correctly — `ops calendar events delete` with no argument exits 1 with `--event: required flag missing` — so the two refusals a caller can trigger exit under different rules for no reason a caller can see.

By the vocabulary `tools/lib/exit.ts` states, the right ending is a data refusal: the invocation was well-formed and what it asked for is not there.

The fix belongs on the verb body — catching what the capability throws and raising `dataError` from `tools/lib/exit.ts` is a change to a file that stands here in akasha, needing no deploy. It was NOT made: the task forbids changing a verb's behaviour while moving it, on the ground that a repair made in the same act cannot be told from the move.

Sibling findings `lifecycle-verbs-exit-70-on-missing-page.md` and `inference-plan-apply-exit-70-outside-code-repo.md` under this domain report the same shape from other namespaces, so this may be one decision rather than three.
