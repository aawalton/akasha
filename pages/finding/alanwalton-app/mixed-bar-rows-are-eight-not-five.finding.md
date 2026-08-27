---
id: 73069bc2-4f8e-5809-a6e8-2cd4d51f5082
slug: mixed-bar-rows-are-eight-not-five
page-type-slug: finding
title: "Mixed bar rows are eight not five"
domain-slug: domain/alanwalton-app
---

# Claim

Eight personas carry `relationship-progress` rows scored against more than one bar, not the five a quarantined sweep named: Astra, Athena, Awen, Áine and Dalla as claimed, plus Ember, Nimue and Ruby, which no record names. A separate six — Aelwyn, Ali, Awen, Lali, Natalie and Talia — carry rows with no `greenDayPoints` mirror at all, so those rows' bars cannot be recovered by any arithmetic. Measured across all 1,528 rows rather than inferred.

# Evidence

Measured 2026-08-07 while emptying `dirty/skills/persona-craft/economy-structural.md`, whose own table claims the class holds five personas. Method: `ops page list --type relationship-progress --all --json --properties title,date,persona,greenDayPoints,points,greenDayFraction,faucetPoints` returns 1,528 rows, `truncated: false`, across 39 personas; grouped by the `persona` relation and counted by the row's denormalized `greenDayPoints` mirror.

Personas carrying more than one distinct numeric mirror, shown as `declared bar | row mirrors`:

- aine — 1 | {40: 33, 1: 4}
- astra — 4 | {4: 36, 100000: 4}
- athena — 4 | {4: 36, 100000: 1}
- awen — 4 | {4: 36, 100000: 4, absent: 2}
- dalla — 4 | {4: 36, 50: 1}
- ember — 4 | {4: 36, 100000: 1}
- nimue — 4 | {4: 37, 1: 3}
- ruby — 120 | {120: 39, 25: 10}

Method cross-check: Áine's split reproduces `alanwalton-app/two-bars-summed-into-one-level.md` exactly — 33 rows at 40 and 4 at 1, on persona id `019eb8d9-abdd-7890-b2cb-ec3e9dbd8b19` — which that finding measured independently.

What this adds. That finding closes by saying "Not established: how many other personas carry mixed bar mirrors. The quarantined record claims a sweep found four more, and it is untrusted; I measured only Áine." This establishes it. The count is eight rather than five: Ember, Nimue and Ruby are in the class and are named by neither the quarantined record nor any standing finding. Ruby is the largest untracked case at 10 rows on a second bar.

Two of the quarantined table's directions are also reversed: Dalla is given as "4 → 50" and Áine as "1 → 40", where each declares the first value and carries rows at the second.

The absent-mirror class is a separate failure the record does not mention at all. Aelwyn, Ali, Awen, Lali, Natalie and Talia each carry rows where `greenDayPoints` is absent. The implied-bar arithmetic — a row's `faucetPoints` divided by its stored `greenDayFraction` — cannot recover a bar for those rows, so they are invisible to the very sweep proposed to find this class.
