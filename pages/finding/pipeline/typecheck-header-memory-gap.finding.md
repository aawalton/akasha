---
id: b9a5cd1f-3f51-53d5-82c2-4e34e84bcf14
page-type-slug: finding
title: "Typecheck header memory gap"
domain-slug: page-type/pipeline
---

# Claim

`check-configs-app-typecheck.ts`'s file header reads as if it is the only leaf-app typecheck gate, with no pointer to `check-configs-service-typecheck.ts`; and `service-typecheck` requests 1Gi memory (limit 4Gi) versus `app-typecheck`'s 1500Mi for the same RR-v7 app class.

# Evidence

Project #15899, domain `pipeline`, status `someday_maybe`, `live-on: deploy`.

Two small, separable, non-urgent items surfaced by the #15893 worker (which closed `not_doing` on a false coverage gap):

1. `check-configs-app-typecheck.ts`'s file header still reads as if it is the only leaf-app typecheck gate. Adding a pointer to `service-typecheck` (`check-configs-service-typecheck.ts`) would stop the next agent re-deriving the false gap #15893 chased.
2. `service-typecheck` requests memory 1Gi (limit 4Gi) versus `app-typecheck`'s 1500Mi, for the same RR-v7 app class — read as a scheduling-honesty consistency question, not a coverage gap.

Named owner: devops/checks domain (dalla).
