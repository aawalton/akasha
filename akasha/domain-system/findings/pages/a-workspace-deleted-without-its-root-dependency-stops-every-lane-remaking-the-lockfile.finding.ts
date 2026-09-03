import type { Finding } from "../finding.page-type.ts"

export const aWorkspaceDeletedWithoutItsRootDependencyStopsEveryLaneRemakingTheLockfile = {
  id: "01a0687b-de90-7003-bd34-b301d72b2619",
  pageTypeSlug: "finding",
  slug: "a-workspace-deleted-without-its-root-dependency-stops-every-lane-remaking-the-lockfile",
  domainSlug: "domain/akasha-migration",
  claim:
    "A migration that removes a workspace package must remove the root manifest's dependency on it in the same change. One dangling `workspace:*` makes `bun install` fail at resolution, and `landedMechanically` then lands every change carrying a `package.json` with the lockfile UNCHANGED, for every lane, saying only that the lockfile could not be remade. The warning names the lockfile, so each lane inspects its own manifest and finds nothing wrong. This is the same swarm-wide stall as a duplicate workspace name, reached by a different road.",
  evidence:
    'Measured 2026-09-03. `e04427339f` removed the `@infra/workspace-cli` workspace and left `package.json:71` naming `"@infra/workspace-cli": "workspace:*"`. `bun install --frozen-lockfile --dry-run` then exits 1 with `error: Workspace dependency "@infra/workspace-cli" not found` / `Searched in "./*"`, resolving nothing. Two landings in this lane hit it before the cause was found — `d8a3b885fe` printed "`bun.lock` could not be made again from the manifests ... so the lockfile went unchanged" and committed a manifest change with a stale lockfile. The lane brief\'s one-pass check finds duplicate names and would have reported clean here, since the fault is a name that is missing rather than a name that is doubled: measured over 309 tracked manifests holding 309 distinct names, zero duplicates and exactly one dangling workspace dependency. The census that finds it walks every tracked `package.json`, collects `name`, then reports any `workspace:*` dependency whose name is in no manifest — run it with a present control and an absent one, because a first attempt using an unexpanded `**` glob reported 53 false positives including packages that plainly exist. Fixed at `fbd8fc8a69` by dropping the one line, after confirming the specifier appears nowhere outside the root manifest, `bun.lock` and the findings; `bun install --frozen-lockfile --dry-run` then completed in 277ms.',
} as const satisfies Finding
