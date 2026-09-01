import type { Finding } from "../finding.page-type.ts"

export const twoHealthReadingEntriesNobodyReaches = {
  id: "01a05bc7-9129-700e-b01d-8155de847c8c",
  pageTypeSlug: "finding",
  slug: "two-health-reading-entries-nobody-reaches",
  domainSlug: "domain/alan-harness",
  claim:
    "Two ways into the health readings package were carried into akasha although nothing in the repository reaches either, and they were kept rather than dropped because only Alan knows whether he still wants them.",
  evidence:
    "`selectLatestArrivalAt` stood behind the old `@alanwalton/health-samples-access` barrel and is now behind `@akasha/health-samples-access/latest-arrival`. A search over the tree for that name, excluding node_modules and build output, found it declared once and reached nowhere. The old package also exported a barrel at `.` holding four names; no file imported the package bare, every reach named a subpath, so the barrel was not carried in and `no-re-export` would have refused it had it been.\n\nThe metrics the package knows are two, `activeEnergy` and `stepCount`, and only `activeEnergy` is read by anything: `active-calories` in health-samples-day asks for it. Nothing asks for `stepCount`, though the elaine import writes both.\n\nWhat was done was to keep both and name `latest-arrival` in the manifest, so the reach it had before the move it still has. The alternative was to drop the module and narrow the metric list, which would have been a smaller package but would have quietly thrown away a way in that Alan may have written for a caller not yet built. Dropping either later costs one commit; putting one back after it is gone costs finding it in history first.",
} as const satisfies Finding
