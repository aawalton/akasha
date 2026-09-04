import type { Finding } from "../finding.page-type.ts"

export const aCheckConfigRowNamesAPathAMigrationJustEmptied = {
  id: "01a0686d-033a-7000-8246-3780159fde52",
  pageTypeSlug: "finding",
  slug: "a-check-config-row-names-a-path-a-migration-just-emptied",
  domainSlug: "domain/akasha-migration",
  claim:
    "Migrating a scanner out of `tools/lib/check-workflow` repoints every import of it and no `ts-file:` row naming it, because those rows are string literals rather than imports. Twenty-five files moved into akasha under this lane and 18 of the paths the check-config rows name now hold nothing. A subject census run after a migration therefore reads worse than one run before it, and the rows cannot be repointed, because the check they gate refuses before it looks.",
  evidence:
    "Measured 2026-09-03 after four landings in this lane. The rows stand across `tools/lib/check-workflow/check-configs-*.ts` as `ts-file:code:` and `ts-file:instructions:` values inside `dispatchNodes`. 29 such rows name a path under `tools/lib/check-workflow`, and 18 of those paths hold nothing now.\n\nEvery import was repointed and verified by building the reader; `bun build --target=bun` passes on all of them. The rows were untouched by the same rewrite because a rewrite over import specifiers cannot see a string, which is the shape `a-reference-census-over-imports-cannot-see-a-dispatch-config` states pointed the other way.\n\nRepointing them would be wrong rather than merely unhelpful. `run-check-routing.ts` sends these scripts through `infra/cluster-checks/src/run-check.ts`, which exits 2 at line 11 before it opens a subject, so a row made to name a real path would make a dead anchor look maintained. That is the judgement `most-check-workflow-scripts-point-at-the-retired-cluster-check-system` reaches for the same rows.\n\nWhat this adds to those two: the count moves. It was 85 of 269 absent at 2026-09-02, and each migration that empties a path raises it without anything in the tree noticing, so the number is a reading of how much has moved rather than a measure of the configs. The rows go when the check-configs family goes; until then a census over them dates the last migration rather than the defect.",
} as const satisfies Finding
