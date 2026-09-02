import type { Finding } from "../finding.page-type.ts"

export const aLazyImportShimHasNothingLeftOnceItsTargetIsBarred = {
  id: "01a06039-c825-700d-917b-29f9fbdc32ee",
  pageTypeSlug: "finding",
  slug: "a-lazy-import-shim-has-nothing-left-once-its-target-is-barred",
  domainSlug: "workspace-package/temper-addon-build",
  claim:
    "Two of temper's files exist only to hold an import back until someone needs it, and neither holds anything else. Once akasha bars the import they wrap, nothing is left to recreate. The saving they bought was real and is lost with them: about 110ms off every `temper addon` call. Whatever eventually reaches the addon resolver from inside akasha has to buy that saving again.",
  evidence:
    "`tools/lib/temper-addon-code.ts`, 1,061 bytes, wraps `@temper/shared-build-deploy-addons-resolve` and `@temper/shared-build-deploy-checks/addon-global-ownership`, and its own comment says why: `Ownership parses TypeScript with the compiler itself, and loading it costs every temper addon invocation about 110ms. Only temper addon global-name-dependents reads ownership, so the import stays dynamic.` `tools/lib/temper-community-addon-code.ts`, 502 bytes, does the same for `@temper/shared-build-deploy-addons-resolve/deployables` and `@temper/shared-foundation-misc-eso-paths-resolve`. Strip the barred imports and each file is four empty declarations. `temper/shared-build-deploy-addons-resolve` is 9 files and 15,233 bytes and would carry in cleanly; `temper/shared-build-deploy-checks` is 81 files and 1,369,802 bytes and would not.",
} as const satisfies Finding
