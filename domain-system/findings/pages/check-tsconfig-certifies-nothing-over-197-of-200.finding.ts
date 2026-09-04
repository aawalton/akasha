import type { Finding } from "../finding.page-type.ts"

export const checkTsconfigCertifiesNothingOver197Of200 = {
  id: "01a05d4f-1b20-7001-b8a2-77c4e0d95af1",
  pageTypeSlug: "finding",
  slug: "check-tsconfig-certifies-nothing-over-197-of-200",
  domainSlug: "page-type/finding",
  claim:
    "`check-tsconfig` runs again but still gates nothing: its population is bounded at a least count of 200 workspace tsconfigs and only 197 arrive, so it exits 2 with NO VERDICT and `localStatusForCheckExit` reads that as skip. Lowering the least count changes what the check refuses rather than whether it runs, so it is Alan's call under Alan Approves Checks, and this lane left the number as it was.",
  evidence:
    "`WORKSPACE_TSCONFIGS_AT_LEAST = 200` is written at `infra/cluster-checks/src/checks/check-tsconfig.ts:44`. The prose beside it records 228 of 231 workspaces at `1075b25bba470c34e695e8aa1660b7268f7bc7e6`.\n\nAt HEAD the root manifest declares 287 workspaces and 197 carry a `tsconfig.json`. The count did not fall because workspaces were taken away: it rose to 287 and the new ones carry no tsconfig. `populationCertifies` in `tools/lib/check-workflow/population.ts:139` answers false when fewer members arrive than the least count, so the run prints its 285 violations and then certifies none of them.\n\nThe bound's own prose says to lower it only alongside deliberately taking away that many workspaces, which is not what happened. Two readings are open: the bound is stale and should track the workspaces that carry a tsconfig, or the 90 workspaces without one are the defect and the bound is correctly refusing. The second is what `akasha-packages-sit-outside-every-project-reference` argues.\n\nUntil one is chosen the check reads as skip in every run, which is what it read while it was throwing.",
} as const satisfies Finding
