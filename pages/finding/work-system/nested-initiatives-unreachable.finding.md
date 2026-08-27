---
id: 6b288b7c-304d-5f8b-a0db-4e405cb9aa3c
page-type-slug: finding
title: "An initiative under a subdirectory is no initiative page, so the machinery that reads one is dead"
domain-slug: domain/work-system
---

# Claim

An initiative under a subdirectory is no initiative page, so the machinery that reads one is dead.

# Evidence

`page-types/initiative.md` declares `files: memory:initiatives/*.md` and `named-for: "{persona-slug}-{slug}"`, so a file under `initiatives/<anything>/` is claimed by no page type and a write there is refused for it. All 29 initiatives standing in the memory repo on 2026-08-19 are flat.

`initiativesIn` in `tools/lib/seat-initiative.ts` still walks every trailing segment of a path, mapping `initiatives/athena/ruling.md` to both `ruling` and `athena/ruling`. `refuseInitiative` carries a whole branch for a spelling reaching two files, which one flat directory cannot produce. `initiativeStemOf` needs only the file stem.

I deleted the test asserting a nested initiative resolves, since nothing can produce one; the test asserting two files sharing a stem are refused still passes and still guards the branch.
