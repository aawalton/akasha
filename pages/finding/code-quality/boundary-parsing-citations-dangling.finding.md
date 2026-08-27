---
id: d7b6f2a6-54b4-5e1d-aaf1-beeb1b5a2380
slug: boundary-parsing-citations-dangling
page-type-slug: finding
title: "Boundary parsing citations dangling"
domain-slug: domain/code-quality
---

# Claim

295 files in the code repo cite a "Boundary Parsing" principle as authoritative, and no such document exists in the instructions repo. The citations sit in code comments, some naming a section — `packages/shared/supabase/server/src/service-role.ts:53` ends `See Boundary Parsing → Error-Body Hygiene`, and both boundary-parse check files carry `Authoritative principle: Boundary Parsing`. What they point at was a quarantined document, now emptied and removed; nothing live replaced it.

# Evidence

`rg -c "Boundary Parsing"` over the code repo excluding `node_modules` reports 295 files. `rg -n "boundary-parsing|Boundary Parsing"` over `domains/` and `tools/` in the instructions repo reports nothing, and `ops instructions rm` confirmed on removal that the only remaining references to the path were three documents under `dirty/`, themselves queued for emptying.

The four rules that survived the emptying stand under quarantine at `dirty/maybe-keep/knowledge/boundary-parsing-composed.md` and bind nobody, so even once promoted they would land on `domains/file-kinds/typescript.md` under a different name.

Not measured: whether each of the 295 citations is load-bearing for its reader, or how many are the incidental parenthetical `(Boundary Parsing)` rather than a pointer somebody would follow. I sampled twenty and they were a mix of both. I also did not check the other repos, only the code repo.
