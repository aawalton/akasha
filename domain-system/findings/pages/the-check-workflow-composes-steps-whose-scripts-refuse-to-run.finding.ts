import type { Finding } from "../finding.page-type.ts"

export const theCheckWorkflowComposesStepsWhoseScriptsRefuseToRun = {
  id: "01a0628b-8576-7a42-8a87-105f0227d57f",
  pageTypeSlug: "finding",
  slug: "the-check-workflow-composes-steps-whose-scripts-refuse-to-run",
  domainSlug: "domain/akasha-migration",
  claim:
    "Most steps the check workflow composes name a script that exits 2 rather than running. A step is composed and counted the same whether its script runs or refuses, so the step count says nothing about what gets judged. And a step that discovers its subject by scanning the tree throws while the array is built, taking every other step down with it.",
  evidence:
    "Measured 2026-09-02. `checkWorkflow(codeRoot).steps` returns 100 steps. Reading the `infra/cluster-checks/src/checks/*.ts` path out of each step and opening it: 56 hold `refuseRetired`, 2 do not, and 42 carry no cluster-check script at all. The two that still run are `check-ast-grep.ts` and `check-generated-suffix.ts`. Tree-wide the ratio is worse — 77 of the 89 files under that directory hold the refusal. `infra/cluster-checks/src/lib/retired.ts` states what a result from one of them is worth: nothing, either way.\n\nThe composition is live even though almost nothing it composes is. `tools/commands/check-bare-ts-population-seeds.ts:72` calls `checkWorkflow(root)` and carries no such guard.\n\nThis is how two teardowns were held up for a day. `lccc-vendor-drift` was one of the 56. Its config was built by `buildLcccVendorDriftCheck(discoverLcccVendorSites(codeRoot))`, written inline in the array composing every step, and `discoverLcccVendorSites` threw unless its glob found `temper/shared-addon-libraries-lib-character-knowledge/src/lccc` and one sibling. So removing either folder broke the build of the whole workflow. Taken out at 4fe7c98241 and 31d822ed71; the folders then came out at 75ecc03124.\n\nThe class rather than the instance: any of the remaining 56 that finds its subject by scanning rather than from a fixed list can do this again, and it fails at composition rather than at the check, so the blast radius is every step rather than its own.",
} as const satisfies Finding
