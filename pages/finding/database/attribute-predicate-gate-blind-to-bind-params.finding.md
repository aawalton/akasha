---
id: b50d2bca-c31c-51aa-a686-f5005cb5b314
slug: attribute-predicate-gate-blind-to-bind-params
page-type-slug: finding
title: "Attribute predicate gate blind to bind params"
domain-slug: domain/database
---

# Claim

`check-attribute-predicate-index-coverage` scans only for literal-key `attributes->>'someKey' = $1` predicates against a registry of covering indexes, so a bind-parameter key form (`attributes->>$3 = $4`) is structurally invisible to it — the check reports clean whether or not such a predicate is covered, because it cannot perceive the parameterized form at all.

# Evidence

Project #16084, domain `database`. Captured by aranya 2026-07-25; found by astra running EXPLAIN on qid `-6365606704667056931` (#15895); the gate half is alert-infra, homed here. Carried no objective; notes only.

WHY THE GATE EXISTS: `check-attribute-predicate-index-coverage` is a hard CI gate built because uncovered `attributes->>` equality predicates kept recurring — its own doc records "three sightings = systemic; nothing caught a new uncovered predicate at authoring time."

THE GAP: the check scans literal-key predicates only. A bind-parameter key carries no literal to match, so the scanner has nothing to key on — not "missing an entry," but outside its perceptual field entirely.

LIVE TRIGGER (759,466 calls/7 days, fourth sighting of the class the gate exists to prevent, arriving through a route it cannot see):
```sql
SELECT * FROM public.pages
 WHERE page_type_slug = $2 AND (attributes->>$3) = $4 AND deleted_at IS NULL
 ORDER BY created_at ASC, id ASC LIMIT $1
```

CLASSIFICATION: the discriminating-instrument rule (ratified three times prior — browser probes, deploy gates, greps; nimue's #15991) arriving at a fourth instrument: pass and can't-see produce the same verdict. Per #15991, not a new rule but the existing rule applied to an unchecked surface.

NOT YET ESTABLISHED: whether a bind-parameter key can be covered by an index at all (an expression index on `(attributes->>'k')` plausibly requires a literal key; if so the right output is a ban, not a registry entry — verify with EXPLAIN, don't assume); how many such predicates exist repo-wide; whether sibling literal-key checks share the blindness.

SEPARATE FROM THE ALERT THAT SURFACED IT: the 2677x drift fire was a false positive — buffers per row stayed flat across 14h while rows/call went 5→109, i.e. workload shape, not a plan regression. This gap survives that: an unindexable shape evading a guard is a defect regardless of current speed.
