import type { Finding } from "../finding.page-type.ts"

export const fourteenClusterChecksThrowRatherThanRun = {
  id: "01a05ce2-9421-74be-b2e6-b1143c8bbed5",
  pageTypeSlug: "finding",
  slug: "fourteen-cluster-checks-throw-rather-than-run",
  domainSlug: "domain/akasha-migration",
  claim:
    "Fourteen of the twenty-one graph-reading checks in `infra/cluster-checks` cannot run. Each throws `OldGraphGone` on its first call into `tools/lib/graph`, whose twenty-six modules are tombstoned by `goneRecord`. The tombstone types every export `never` so the compiler names each unmigrated caller, but `infra/cluster-checks` is outside the root `tsconfig.json` reference closure, so no compiler has read them. `check-tsconfig` is among the dead, which is why the closure gap itself went unseen.",
  evidence:
    "Run at HEAD with `--tree-sha`, these exit 2 saying `asked the old graph, which is gone`: check-acyclic-packages, check-addon-build, check-image-tags, check-k8s-node-selector, check-layer-monotonicity, check-memory-qos, check-mock-module-leak, check-mock-module-surface, check-no-hardcoded-surface, check-tailwind-sources, check-temper-type-tier-monotonicity, check-tsconfig, check-yaml-usage and report-cross-workspace-mock-reach. Seven others run: check-guarded-resolve, check-phantom-deps-graph, check-repo-paths, check-test-classification and the three check-unused-deps-*.\n\n`tools/lib/graph/graph-gone.ts` returns a Proxy `as never` that throws on any property access, so importing is free and using is fatal. Twenty-six modules under `tools/lib/graph/` carry it, `held-snapshot.ts` and `ask.ts` among them.\n\nThe compiler does see it: `bunx @typescript/native-preview -b infra/cluster-checks --force` raises `Property 'parse' does not exist on type 'never'` six times, in check-mock-module-surface.ts (72, 87, 206, 214), report-cross-workspace-mock-reach.ts (117) and lib/mock-module-leak-context.ts (192). Those six sit under 254 TS6307 lines from the same build, and the root build reports 0 because it never walks this package.\n\nmock-module-surface is registered: `tools/lib/check-workflow/check-configs-typesafety.ts:40` names it and `repo-wide-ts-scanners.ts:49` lists it.\n\nAlso raised there and unrelated to the graph: `src/lib/orphan-source.ts` 24 and 35, `dir.split(\"/\")[0]` widening to `string | undefined`.",
} as const satisfies Finding
