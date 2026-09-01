import type { Finding } from "../finding.page-type.ts"

export const theDeployCommandCannotBeLoaded = {
  id: "01a05ac5-35e4-7adb-a3f7-7c84f5b4bc5d",
  pageTypeSlug: "finding",
  slug: "the-deploy-command-cannot-be-loaded",
  domainSlug: "domain/service-system",
  claim:
    "`ops deploy` cannot be loaded, so no cluster service can be put up from this repo. Its entry point imports two modules that were deleted on purpose, and it is the only thing anywhere that builds or restarts a web app; CI has no twin of it. Every site therefore keeps serving whatever build its pod happens to hold, and there is no path to a new one.",
  evidence:
    "`bun -e \"import('ops-cli/global/deploy/deploy.command.code.attachment.ts')\"` answers `Cannot find module '../../../tools/ops/page-queries-in-process.ts'`. That file was deleted in b4be591b45 `the query transport goes, and what asked in process stays`. The same entry point also imports `publishLiveVersion` from `deploy-system/live-version/live-version.ts:4`, which imports `patchState` from `@shared/pages-query`, deleted in 094d71b8a1 `shared/pages-query goes: the service it speaks to is gone`. Either import alone stops the module loading. Both deletions were deliberate and left their callers broken; the commit message for the second says so. Nothing in CI covers for it: `NEXT_PUBLIC_BUILD_SHA` and `.build-sha` appear in none of the 39 workflow templates under `pages/workflow-template/`, and the CI-side `deploySourceSync` in `tools/lib/workflow-dsl/templates/source-sync.ts` only resets a pod's checkout — no `bun run build`, no rollout restart — and has one caller, the git server, not a web app. Separately, no site can be built by hand either: `bun run build` in `archive-of-worlds/web` reaches its SSR bundle and stops at `Rolldown failed to resolve import \"@shared/pages-query/ask\" from shared/pages-access/src/file-shape.ts`, so the breakage sits under every app that reads a page.",
} as const satisfies Finding
