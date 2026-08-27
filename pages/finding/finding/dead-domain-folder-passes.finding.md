---
id: d84a7855-ff13-594a-81d5-7551d771000c
page-type-slug: finding
title: "Dead domain folder passes"
domain-slug: page-type/finding
---

# Claim

`checks/findings-sorted.ts` holds a finding's `domain:` key against its folder and neither of them against the corpus, so a finding whose key and folder agree on a domain that no longer exists passes. Renaming a domain therefore orphans every finding filed under it, silently, and the check that exists to keep the two in step reports nothing.

# Evidence

On 2026-08-12 `domains/seat-status.md` was renamed to `domains/seat-presence.md` with `tools/mv.ts`, which repointed every reference inside the instructions repository. Three findings under `findings/seat-status/` were left naming a domain that no longer existed, and `ops instructions run-checks` reported `findings-sorted` as passing over 1916 findings across 217 domain folders in the same run.

`ops memory rehome-finding` validates the domain against the instructions repository and would have refused the dead slug, so the capability to detect it is already built and the check does not use it.

The three were rehomed to `seat-presence` and `seat-assignment-initiative`. Four project documents carrying `domain: seat-status` were repointed in the same pass, and nothing reported those either.
