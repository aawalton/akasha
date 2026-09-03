import type { Finding } from "../finding.page-type.ts"

export const anAkashaDeployCannotReachTheDeploySystem = {
  id: "01a05b08-26f6-7002-b2b2-70eaaa535aa2",
  pageTypeSlug: "finding",
  slug: "an-akasha-deploy-cannot-reach-the-deploy-system",
  domainSlug: "workspace-package/service-system",
  claim:
    "The old deploy could not be repaired where it stood and reached from akasha, because an akasha file imports no file outside the akasha folder and `deploy-system` is a folder of loose files no manifest names. Carrying it in would have carried four more folders with it. It was rebuilt narrow inside akasha instead, so two spellings of a deploy now stand and the old one is still the only one that builds in a pod.",
  evidence:
    "`imports-inside.code-check.code.ts:29` refuses any specifier from an akasha file that lands outside `akasha/`, and a bare package name lands nowhere so it passes. `deploy-system` has no `package.json`, so it can only be reached by path. Its 1030 lines reach `cache/cache.ts` and `cache/mark/mark.ts` for what a deploy remembers, `akasha/markdown-pages/markdown-frontmatter/markdown-frontmatter.module.code.ts` for reading a page, `akasha/markdown-pages/markdown-runtime-mark/markdown-runtime-mark.module.code.ts` for the mark, `repo/git/git.ts` for listing pages and `@infra/k8s-synth/manifests` for finding and loading a synth. Moving it would have moved all of those or given each a manifest. What landed instead is `module/web-app-reading` and `module/workload-deploying` under `akasha/service-system/cluster-service/`, 188 and 254 lines, reaching nothing but `node:fs`, `node:path`, `node:child_process` and `Bun.spawnSync`. It finds a service's code beside that service's own page rather than scanning `DISCOVERY_GLOBS`, and it asks the cluster with `kubectl diff` whether a manifest already stands rather than keeping a mark under `.git/data`. What is left unreachable in `deploy-system`: the secret placing at `secret/secret.ts`, the in-pod build at `build/build.ts`, and the closure marks at `closure/closure.ts`. `ops deploy` still cannot be loaded and nothing calls the old code now.",
} as const satisfies Finding
