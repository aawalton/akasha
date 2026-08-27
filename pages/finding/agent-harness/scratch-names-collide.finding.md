---
id: febe9f90-b167-5e55-8add-4e3de0866f47
slug: scratch-names-collide
page-type-slug: finding
title: "Concurrent agents collide on generic scratch file names under /var/tmp"
domain-slug: domain/agent-harness
---

# Claim

Concurrent agents told only to keep scratch under `/var/tmp` converge on the same generic file names. Twenty runs dispatched at once wrote `build.mjs`, `build.ts`, `count.ts`, `count2.ts`, `count3.ts`, `payload.json` and per-directive JSON into one shared directory. One run's `sed -i` against a `build.mjs` that was no longer its own matched nothing and exited 0, so the `bun build.mjs` after it ran another agent's script over a stale payload. A wrong draft landed, and every gate passed it.

# Evidence

Found on 2026-08-20 during a conversion run at concurrency twenty, and confirmed by listing the directory afterwards rather than taking the report for it. `/var/tmp/ryn-wave2/` holds `negative-control.json`, `painful-or-worse.json`, `population.json`, `horizon.json` and `bound-before-measuring.json` from the run on `domains/instrument.md`; `project.json` from the run on `page-types/project.md`; and `build.mjs` beside `build.ts`, plus `count.mjs`, `count.py`, `count.ts`, `count2.mjs`, `count2.py`, `count2.ts` and `count3.ts` — several agents each writing a generically named helper into one place. The run that reported it caught its own bad landing by reading the file back afterwards, and corrected it in a second commit; nothing else would have. `Scratch Location` on `domains/agent-harness.md` says where a throwaway file goes and nothing about two agents reaching for one name, and its test — that a throwaway file has no reader but you — reads as satisfied by a file another agent is about to overwrite. `sed` exits 0 when its pattern matches nothing, so no step between the wrong file and the landed write reported anything.
