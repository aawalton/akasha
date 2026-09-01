import type { Finding } from "../finding.page-type.ts"

export const noWebAppInTheRepositoryCanBeBuilt = {
  id: "01a05b08-26f6-7000-88b5-c2371820fd12",
  pageTypeSlug: "finding",
  slug: "no-web-app-in-the-repository-can-be-built",
  domainSlug: "workspace-package/service-system",
  claim:
    "Not one of the six web apps builds at HEAD, including the one whose own source names `@shared/pages-query` nowhere. Every app depends on `@shared/pages-access`, and that package reaches the deleted one from sixteen of its own files, so the bundler stops before it reaches anything the app itself wrote. A deploy can therefore put a web app's workload up but cannot put a new build up, and that half stays out of reach until the deleted package has no importers left.",
  evidence:
    '`bun run build` in `smilingjenny/web` answers `Rolldown failed to resolve import "@shared/pages-query/ask" from smilingjenny/web/app/lib/db.server.ts` and exits 1. That app is the least exposed of the six: `git grep -l "@shared/pages-access" -- smilingjenny/web` answers nothing, while the others answer 2 for `audhdalan/web`, 9 for `archive-of-worlds/web`, 12 for `alanwalton/atlas-web`, 21 for `temper/web` and 23 for `alanwalton/web`. All six name `@shared/pages-access` in their manifests, and `git grep -l "@shared/pages-query" -- shared/pages-access/src` names sixteen files there. `node_modules/@shared/pages-query` does not exist and `git ls-files shared/` names nothing under `pages-query`, so nothing resolves it. The build a pod serves is made by the deploy itself, in the pod, through `deploy-system/build/build.ts:257`, which runs `bun install --frozen-lockfile && bun run build` at the repository\'s HEAD; the same failure would meet it there. The pods are serving builds made on 2026-08-28, which is what `pages/web-app/*.web-app.uncommitted.yaml` still records as each app\'s live version. `akasha deploy` was written to apply manifests and wait for the rollout and to make no build, so that it does what it can rather than refusing whole.',
} as const satisfies Finding
