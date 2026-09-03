import type { Finding } from "../finding.page-type.ts"

export const theDomPreloadNeverReachesATestRunFromTheRoot = {
  id: "01a0676d-9a7f-73e7-ad4a-eddcbff5b44b",
  pageTypeSlug: "finding",
  slug: "the-dom-preload-never-reaches-a-test-run-from-the-root",
  domainSlug: "domain/akasha-migration",
  claim:
    "A web app declares the happy-dom preload its tests need in its own `bunfig.toml`, but the runner starts bun with the repository root as its working directory and bun reads `bunfig.toml` from that directory alone, so the preload never applies. `dom-guard-setting` records this exact trap, and guards only `*.component.test.*`, so a module test needing a document fails obscurely rather than being told why.",
  evidence:
    "Measured 2026-09-03. `akasha test --file-path akasha/alan/web/alan-auth-provider/alan-auth-provider.module.test.tsx` fails 3 of 3 on an unmodified tree, at `TypeError: undefined is not an object (evaluating 'happyDom.happyDOM.setURL')` on line 138. Line 130 of that test reads `globalThis` as carrying `happyDOM`, which `@happy-dom/global-registrator` installs.\n\n`akasha/alan/web/bunfig.toml` preloads `@akasha/testing-system/dom-registering`, whose code calls `GlobalRegistrator.register()` at its top level. `akasha/temper/temper-web/bunfig.toml` declares the same one. The root `bunfig.toml` preloads `dom-guard-setting` and a guard outside akasha, and no registrar at all.\n\n`code-tests.module.code.ts:261` hands the runner `cwd: root`, so bun reads the root file and the app's own is never consulted.\n\n`dom-guard-setting.module.code.ts` already states the mechanism in its refusal text: bun reads `bunfig.toml` from the current directory only, so the preload applies only where the run begins in a directory whose own file declares it. Its guard fires on `componentTestMissingDom`, which judges names matching `*.component.test.*`. This is a module test, so the guard never sees it and the clear message is never printed.\n\nThe reach is wider than its own file. Two of the four typecheck errors refusing every load-bearing change are in `alan-auth-provider.module.code.tsx`, and no repair of them avoids editing that file, which is what summons this test. I confirmed the typecheck repair itself is sound: with all four mended the compiler reports nothing, and this test alone refuses the landing.",
} as const satisfies Finding
