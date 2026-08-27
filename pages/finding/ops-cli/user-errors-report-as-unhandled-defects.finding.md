---
id: 9302b0fc-b7cb-519f-b464-85163d662d9f
slug: user-errors-report-as-unhandled-defects
page-type-slug: finding
title: "User errors report as unhandled defects"
domain-slug: domain/ops-cli
---

# Claim

At least six distinct paths across five namespaces report an ordinary user mistake as an unhandled defect. A bad flag value, a missing row and a malformed uuid all exit 70, which is the code reserved for a fault nobody anticipated. The exit classifier reads the class an error IS and nothing else, so every raise that is not one of four classes lands in the same bucket.

# Evidence

Assembled 2026-08-13 from nine namespace handbacks during the `ops-in-instructions` migration, and reproduced independently rather than taken on report. No single seat could see this: each met one instance, preserved it byte-for-byte as its task required, and filed it as a local oddity.

`exitCodeForThrowable` in `shared/errors-core/src/exit.ts` classifies through `isCliError`, which is four `instanceof` arms — `CliError`, `InputError`, `DataError`, `OperationalError` — and reads no field on any of them. Anything else falls through to 70.

Four reproduced by hand, each exit 70:

- `ops exercise today --date garbage` — a `ZodError`, which also dumps its raw JSON array at the caller.
- `ops page complete --id <well-formed uuid matching no row>` — a plain `Error` from the pages access layer.
- `ops seat gate-block --seq abc` — a bare `Error` in the verb body.
- `ops seat silent-resumes --limit 0` — the same shape.

Three more reported and not reproduced here: `ops temper task complete` / `uncomplete` / `reschedule` on a missing page, the same access-layer raise as `page complete`; `ops temper completion-override create` / `update` on a non-uuid `--character`, where Postgres's `invalid input syntax for type uuid` comes back unclassified; and `assertWriteAllowed` (now `tools/lib/temper-inventory.ts:48`), refusing a locked temper rule with a plain `Error`.

The same namespace can disagree with itself. `ops exercise ranks --bogus` exits 1 and `ops exercise today --date garbage` exits 70, for the same kind of caller error. `ops seat block-on` and `ops seat gate-block` take an identical bad `--seq` to 1 and 70 respectively, the first through the shared parser and the second through its own `Number()` re-check.

None of this was caused by the migration, and none was repaired during one. What the migration supplied is the measurement: seats captured exit codes for every verb they touched, which is why six scattered instances resolve into one classifier. `isCliError` now stands in akasha at `shared/errors-core/src/exit.ts`.
