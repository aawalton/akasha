---
id: 01a01ff5-50a0-7000-8e3b-c42d24aebe3a
page-type-slug: finding
title: "Persona model and remote control keys did not survive the rows"
domain-slug: domain/agent-fleet
---

# Claim

`readPersonaAttributes` reads exactly two keys off a `persona` row, `defaultModel` and `remoteControlAtStartup`, and no `persona` row stands. No persona file states either key and no property document declares one, so the write gate cannot admit a file that does. Repointing the reader at files would return a page that can never carry the value, and would flip `lookup.matched` to true, handing every seat `opus` with Remote Control defaulting on. The declared values went with the rows.

# Evidence

Measured 2026-08-20 against the live database and the instructions repo at `6d9c9ff1ba`.

Live `public.pages` rows by page type: `property-definition` 39, `page-type` 2, and nothing else. `persona` is 0. Running `readPersonaAttributes` from `tools/lib/db-personas.ts` returned `null` for both `claude` and `nimue`.

Two callers, both mapping that `null` to an unmatched lookup: `tools/lib/supervisor-declared-model.ts:67` and `tools/lib/supervisor-remote-control-default.ts:47`.

The files answer where the rows do not. `askComposed` for `persona` returns 41 rows. A negative control on the same call fires correctly: `championed-domain-slug`, `role-slug`, `value-slug` and `total-points` all come back populated, while an invented key comes back null. Against that control, `default-model`, `remote-control-at-startup` and `wake-sources` are null on all 41, in kebab and camelCase alike.

`properties/persona-default-model.md` and `properties/persona-remote-control-at-startup.md` do not exist. The `page-holds-properties` gate compares a file's keys literally against each property's `key:`, so a persona file stating either key is refused today.

What repointing would do: `decide-seat-model.ts:8-11` returns `PERSONA_DEFAULT_MODEL`, `opus`, whenever the lookup matched and declared nothing.

Only `views/personas-not-empty.md` and `views/personas-covers.md` still name the two keys, as columns.

Not measured: what values the rows carried. They are retired, so it is not recoverable from the data.
