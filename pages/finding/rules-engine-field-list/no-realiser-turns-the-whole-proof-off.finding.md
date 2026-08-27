---
id: d39c9037-0a61-585c-a463-9dbdaa738574
page-type-slug: finding
title: "No realiser turns the whole proof off"
domain-slug: domain/rules-engine-field-list
---

# Claim

A rule set declaring one `list` field cannot be proven at all, and the proof reports it as a reading rather than as a defect.

# Evidence

`REALISERS` in `tools/lib/rules-partition.ts` maps `list` to `null`, so `costOf` returns `Number.MAX_SAFE_INTEGER` for that field and `eachCase` restricts before it enumerates anything. Measured over the turn end rule set on 2026-08-13: with `project-statuses` declared as a list the reading is `{"cases":0,"restricted":true}`, and with that one field dropped and nothing else changed it is `{"cases":288,"restricted":false}` with 184 overlapping sets found. The other sixteen fields are enums and numbers the engine decides perfectly well, so one undecidable field turned the proof off for all of them. `domains/rules-engine-field-list.md` states that a list takes `contains`, which asks membership and never a substring, and `domains/rules-engine-field-type.md` states that a type says how a rule set is proven to cover it — so a list is declared as a type the engine supports while carrying no way to prove anything about it. Neither of the two standing rule sets uses a list field, which is why this stood undiscovered.
