import type { Finding } from "../finding.page-type.ts"

export const noCallerRunsTheDeployPhaseOfTheCheckMachinery = {
  id: "01a05ba6-0388-70f7-bf8b-e86664a29afd",
  pageTypeSlug: "finding",
  slug: "no-caller-runs-the-deploy-phase-of-the-check-machinery",
  domainSlug: "page-type/code-check",
  claim:
    "Thirty code-checks state `runsOnDeploy: true` and no caller asks the machinery for that phase, so none of them runs at a deploy. A check could not have carried the tracked-tree install gate in any case: what a check is handed is a change's file bodies, which names no commit, and checks reach no further than the akasha folder while this fault stands in the root `package.json`.",
  evidence:
    '`checksAt` at `checking.module.code.ts:133` filters on the phase asked for, and the only phases a caller asks for are `PATCH` at `gate-building.module.code.ts:18` and `:54` and `AUDIT` at `audit.command.code.ts:15` and `:124`. `deploy.command.code.ts` imports nothing from `@akasha/checks-system`. `checks-system.workspace-package.ts:96-99` already files this as a gap: every phase a check states is reached by a caller that runs it. Three further things stop a check carrying this particular gate even once a caller runs the phase. A check takes a `Change` of `root`, `changed`, `before` and `after`, which hands over file bodies and names no commit, so nothing can tell a check which sha the deploy resolved. `checks-system.workspace-package.ts:20-26` holds that checks reach no further than the akasha folder and pass over a path outside it, while the manifests this fault lives in are the root `package.json` and `shared/design-forms/package.json`. `code-check.page-type.ts:141-147` holds the stopgap that a check looks for no files and the gap that a check reaching for the tree does not land, and reading a tracked tree at a sha is reaching for the tree. `code-check.page-type.ts:153-165` holds `Alan Approves Checks`, and Alan is absent. The gate went into the deploy path instead, as `installableAt` in `web-app-building.module.code.ts`, called from `deploy.command.code.ts` at the sha that call resolved. Proved both ways: at `6f1603e2b1` it answers `Workspace not found "shared/design-forms"`, and at `283599af2e` it installs.',
} as const satisfies Finding
