import type { Finding } from "../finding.page-type.ts"

export const utilsTestIsReachedByConfigurationAlone = {
  id: "01a05cba-f4bb-7c44-a6a2-7451cfa394b6",
  pageTypeSlug: "finding",
  slug: "utils-test-is-reached-by-configuration-alone",
  domainSlug: "domain/akasha-migration",
  claim:
    "No import specifier anywhere in the tree resolves into shared/utils-test, so the resolver method that buckets every specifier by owning package measures its inbound at zero and reads as though nothing holds it. Its whole reach is configuration: bunfig.toml preloads, manifest dependency keys and tsconfig references, three of the last in the prefix-free ../utils-test form. The same resolver measures shared/utils-narrow at 373 files.",
  evidence:
    "Measured by resolving every relative and bare specifier in `git ls-files` to an absolute path and bucketing by owning package: utils-narrow answers 373 distinct files, 260 naming it bare and 121 escaping to ../../shared/utils-narrow/src/X, plus 74 manifests and 50 tsconfig references; utils-test answers 0 in both forms. What holds utils-test instead is 6 bunfig.toml preload lines naming setup/happydom.ts and setup/component-dom-guard.ts, 6 manifest dependency keys, 6 tsconfig references, and two token strings in infra/cluster-checks/src/lib/test-classification.ts:116 and test-preload-obligations.ts:52. Of its 5 sources, src/index.ts and src/render.ts are pure re-exports of @testing-library/react, which akasha refuses, and the 2 setup files export nothing at all and run for their effect, a shape no akasha page has. Only component-dom-guard.ts declares anything, one function. The call taken: utils-narrow landed as @akasha/utils-narrow at 4e04e12128 and shared/utils-narrow went at 9d0db3197a; utils-test did not move. Moving it means editing the root bunfig.toml that every bun test in the tree reads, and a preload path that is wrong rather than absent disables the component-DOM guard silently, so every component test still passes while testing nothing.",
} as const satisfies Finding
