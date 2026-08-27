---
id: b766deb9-3bf6-59a0-9ca2-86ab30aab2c8
page-type-slug: finding
title: "Ts to plpgsql citations dead"
domain-slug: repo/code-repo
---

# Claim

107 live TypeScript files cite a document called "TS to plpgsql", and no document of that name exists in any repository.

# Evidence

A search of the code repo for the string "TS to plpgsql", excluding `node_modules` and `dist`, returns 112 citations across 107 `.ts` files. Many name a section, so the reader is sent somewhere specific and finds nothing:

- `packages/infra/checks/src/checks/check-no-raw-plpgsql.ts:8` — `See TS to plpgsql ("Portage policy")`
- `packages/infra/checks/src/checks/check-no-raw-pages-sql.ts:63,151,172` — `("The PageProcCtx contract")`, `("Deploy flow")`, `("Differential equivalence at port time")`
- `packages/shared/pages/proc-compiler/src/forbidden.unit.test.ts:3-4` — "one positive case per forbidden construct enumerated in TS to plpgsql ('The TS subset > Forbidden')"
- `packages/shared/supabase/migrations/cli/src/lib/checks/no-raw-proc-mutation.ts:5` — "The repo invariant (per TS to plpgsql)"
- roughly a dozen `*.equiv.database.test.ts` headers under `packages/shared/pages/proc-compiler/src/` — "Per TS to plpgsql ('Differential equivalence at port time')"

No file of that name exists anywhere under the code repo. The document was quarantined in the instructions repo at `dirty/docs/ts-to-plpgsql.md`, and it was emptied a block at a time and removed there today (final commit dd3682bc). One claim survived, under quarantine at `dirty/maybe-keep/docs/ts-to-plpgsql.md`; everything the citations above point at was cut, most of it as false against the code doing the citing.

That last part is what makes this more than a broken link. `check-no-raw-plpgsql.ts` cites a Portage policy the check itself enforces better than the prose did. `forbidden.unit.test.ts` cites a Forbidden list that the test file is the executable copy of. The citations point outward for authority to a document whose content, where it was true, was a restatement of the citing code.

Filed at the removal because the instructions repo's `[mentions]` gate measures that repo only — it reported 0 stranded mentions among live documents for this removal — and no instrument spans the two repos.
