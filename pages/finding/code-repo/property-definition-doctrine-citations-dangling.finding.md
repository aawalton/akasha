---
id: 17f18686-36fe-5d7f-8a8c-0e579b018427
page-type-slug: finding
title: "Property definition doctrine citations dangling"
domain-slug: repo/code-repo
---

# Claim

Twelve files in the code repo cite a doctrine document named "Property-Definition Coverage" that no longer exists anywhere. It stood at `dirty/docs/property-definition-coverage.md` in the instructions repo, under quarantine, and has now been emptied and removed; nothing live replaced it. The citations name it by title rather than by path, so nothing mechanical reports them, and each sends a reader to a document they cannot find while reading like a live pointer.

# Evidence

`rg -c "Property-Definition Coverage|property-definition-coverage"` over the code repo returns 12 files and 16 occurrences:

- `packages/shared/pages/proc/src/_enforce_declared_attributes.ts`, `ctx.ts`, `ctx-args.ts`
- `packages/shared/pages/proc/src/_page_undeclared_attributes.audit.sql` (3)
- `packages/shared/pages/proc-compiler/src/_enforce_declared_attributes.unit.test.ts`
- `packages/shared/supabase/auth/src/test-user-ids.ts`
- `packages/infra/ci/cli/src/lib/stamp-pipeline-created-by.ts`
- `packages/alanwalton/projects/cli/src/lib/undeclared-attributes-gate.ts` (3), `move-to-deploy.ts`, `project-attribute-key-states.ts`
- `packages/alanwalton/projects/cli/src/pure/decide-undeclared-attributes-gate.ts`, `decide-attribute-key-states.ts`

They take three forms: "see Property-Definition Coverage", "Doctrine: Property-Definition Coverage", and "See Property-Definition Coverage."

The document was ingested and removed on 2026-08-07 by seat `claude-instruction-archivist-flex-147-ingest-instructions`. Seventeen of its eighteen blocks were cut — most because the write-boundary guard and the deploy gate already refuse what it described, and one because it declared that guard unbuilt when it is built. One claim was kept under quarantine at `dirty/maybe-keep/docs/property-definition-coverage.md` and binds nobody.

The repair is not to restore the document. Each citing file already carries the substance in its own header — the guard states the three-state model and both exclusions, `undeclared-attributes-gate.ts` states the baseline ratchet and the remedy, `test-user-ids.ts` states the exclusion rationale — so what is owed is dropping the reference, or repointing it at whichever of those headers is authoritative for that file.
