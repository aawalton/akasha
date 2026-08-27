---
id: 38bf5050-03c9-53e3-8b63-99ee4172b032
page-type-slug: finding
title: "Alarm hardened before it can pass"
domain-slug: page-type/alert
---

# Claim

Nothing binds the claim that a signal must be shown to be satisfiable before anything is hardened on it. `domains/alert.md`'s Intent — "Every alert that fires is either acted on or repaired" — names the end state for a signal nobody consumes, and reaches neither the second tier, an alarm with no reachable off-state that recruits its reader against the system, nor the corollary. `domains/instrument.md`'s Negative Control is the mirror: it demands the case an instrument must CATCH.

# Evidence

A ruling of 2026-07-28 in `dirty/skills/agent-harness/rulings/instruments.md`, reached by a seat emptying it. Rule of Three met on its face, three unrelated projects in one night, plus a fourth. Kept verbatim under `dirty/maybe-keep/`; filed here because that copy is queued for sweep.

The three: a deploy verb's honest `VERDICT: UNKNOWN` + exit 2, whose only consumer reads a different field; a baseline-sync advisory firing on a genuinely bad baseline that gates nothing; and a discovery step warning to stderr and returning an array carrying no record that anything was dropped. The producer is right in every case, so auditing the signal confirms it works, three times over.

The fourth earns the filing. That advisory is not merely unconsumed: its off-state is unreachable and its remedy is harmful — it names `baseline-rebuild`, which dumps live and bakes in every applied-but-unlanded migration. Three agents read it as real inside one hour. So the class has two tiers: a signal nobody consumes is inert; one that recruits its reader against the system is worse than silence. The corollary: never harden a signal before establishing it can be satisfied. A gate on that predicate would have blocked a correct landing.

I confirmed the machinery half, not the inference. `migrations/cli/src/lib/baseline-completeness.ts` is live, and `PRESENT_OBJECT_NAMES_SQL` unions exactly six catalogs with `n.nspname` in `WHERE` clauses only and in no `SELECT` list, as the ruling says. NOT ESTABLISHED: whether the alarm is still unsatisfiable, which turns on whether a schema name is ever demanded, in two functions I did not open. That file's own comment argues the other way: "Over-inclusion can only suppress a gap alarm (safe); it never manufactures a false alarm."

Searched `consumer|off-state|satisfiab|louder|harden` over `domains/`, two hits, both persona portraits; here `off-state|unsatisfiable|nothing consumes`, plus `findings/alert/` listed.
