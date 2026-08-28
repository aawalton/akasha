---
id: 84c83c0c-9fc8-4717-af22-133e9c2f0e70
slug: a-deleted-service-page-stopped-every-step-container
page-type-slug: finding
title: "A deleted service page stopped every step container"
domain-slug: page-type/pipeline
---

# Claim

Nothing holds a `clusterOriginOf` call to a service document that still exists, so deleting a service silently disarms every caller that read its address. One such caller sat on the CI dispatch path and took the whole of CI down with it: from the deletion of `page-query-service` until `f3a52ce9`, `buildContainerPayload` threw before it could assemble a pod, so no step container could be built for any workflow. The reader outlived the document it read, and no check, no test and no log named the gap — the outage was found by reading the dispatcher, not by anything reporting it.

The one caller is gone. The class is not: `clusterOriginOf` resolves an address out of a page that may be deleted at any time, and its refusal surfaces wherever the caller happens to stand rather than where the deletion happened.

# Evidence

Read on 2026-08-28 at `a591e0f1`, fixed at `f3a52ce9`.

`tools/lib/ci-container-dispatcher/container-manifest.ts:28` held `pageQueryOrigin ??= clusterOriginOf(rootFor(resolveRoots(), AKASHA), PAGE_QUERY_SERVICE)`, reached from line 96, `{ name: "PAGE_QUERY_ORIGIN", value: pageQueryOriginInCluster() }`. Line 96 sat in the unconditional array literal `buildEnv` returns, which `buildContainerPayload` reaches at line 228 for every candidate, so no step container of any workflow escaped it.

`find pages -name 'page-query-service*'` returns nothing. The page was deleted with the service it described.

Called directly, it refuses:

```
bun -e 'import { clusterOriginOf } from "./tools/lib/service-cluster-reach.ts"
import { AKASHA, resolveRoots, rootFor } from "./repo/roots/roots.ts"
clusterOriginOf(rootFor(resolveRoots(), AKASHA), "page-query-service")'
→ ServiceDocRefused - no service document is named `page-query-service`.
```

`clusterOriginOf` is defined at `tools/lib/service-cluster-reach.ts:136`. `grep -rn --include='*.ts' --exclude-dir=node_modules --exclude-dir=dist -e 'clusterOriginOf' .` returned exactly two hits before the fix — the definition and this one call — and one after it, the definition alone. It is now an exported helper with no caller.

**Nothing in a step container read the variable that was being set.** `grep -rn 'PAGE_QUERY_ORIGIN' tools/lib/ci-container-dispatcher/` returned only the line that wrote it. Repo TypeScript running inside a step container can read it through `shared/pages-query/src/index.ts:27`, and its fallback at `index.ts:48` is the same dead cluster address, so removing the variable changes no outcome for such a caller. The one shell reader, `tools/lib/ci-pod-dispatcher/callback-shell.ts:29`, sits in a module nothing outside `tools/lib/ci-pod-dispatcher/` imports.

**The control fires.** After the fix a payload builds — `buildContainerPayload` over a synthetic candidate returned `pe-4242-typecheck-aaaaaaa` with 21 env entries and no `PAGE_QUERY_ORIGIN`. Re-adding precisely the removed expression to that same build returns the refusal: `CONTROL FIRED: ServiceDocRefused`.

**Where the same reading already stands.** `pages/finding/page-queries-system/origin-name-carries-four-behaviours.finding.md:23` records this as the fourth of four meanings the name `PAGE_QUERY_ORIGIN` carries, and reports the same throw. It is filed under the domain that caused the breakage, so a seat holding the pipeline would not find it. That fourth behaviour is now false; the other three were not checked here.

NOT MEASURED. Whether any CI step ever depended on the value of `PAGE_QUERY_ORIGIN` rather than merely receiving it — five workflow templates run `infra/scripts/src/set-app-live-version.ts`, which imports `@shared/pages-query` at lines 3-4, and whether that step passed or failed before the service was deleted was not established. Whether a check could hold a `clusterOriginOf` call to a live service document at write time, and what it would cost.
