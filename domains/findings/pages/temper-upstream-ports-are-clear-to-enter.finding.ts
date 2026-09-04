import type { Finding } from "../finding.page-type.ts"

export const temperUpstreamPortsAreClearToEnter = {
  id: "01a0607b-cd7a-79e6-97ce-a69336cd8a0e",
  pageTypeSlug: "finding",
  slug: "temper-upstream-ports-are-clear-to-enter",
  domainSlug: "workspace-package/temper-upstream-data",
  claim:
    "The four `port.ts` files and `leaf-dump.ts` under `tools/lib/temper-upstream-data/` now reach nothing outside akasha, because the Lua runner and the live-directory resolver both landed tonight. The four matching `verify.ts` each still wait on the generated data of the addon package it checks. Nothing about the runner holds any of the ten back any more.",
  evidence:
    "`temper/shared-build-deploy-lua-runner` landed as `akasha/temper/temper-lua-runner` in 03b7ca09; `driver.lua` and `eso-sandbox-prelude.lua` are `lua-module` pages, and `persistent-vm` and `sandboxed-lua-vm` resolve them at `../lua-driver/lua-driver.lua-module.lua.lua` and `../eso-sandbox-prelude/eso-sandbox-prelude.lua-module.lua.lua`. `temper/shared-foundation-misc-eso-paths-resolve` landed as the `eso-paths-resolve` module of `akasha/temper/temper-eso-paths` in 08cfed01. What each file must be repointed to: `@temper/shared-build-deploy-lua-runner/lua-vm` becomes `@akasha/temper-lua-runner/lua-vm`, `/lua-number-string` becomes `@akasha/temper-lua-runner/lua-number-string`, and `@temper/shared-foundation-misc-eso-paths-resolve/eso-paths-resolve` becomes `@akasha/temper-eso-paths/eso-paths-resolve`. The bare runner root that `tools/lib/temper-addon-lua.ts` imports has no like-for-like replacement, because `no-re-export` barred the barrel; it becomes `@akasha/temper-lua-runner/lua-vm`. Beyond those, each `port.ts` reaches only `node:fs/promises`, `node:path` and its siblings `../libraries.ts`, `../serialize-ts-lua.ts` and `./eso-stubs.ts`, which are already the `upstream-libraries`, `ts-lua-serializer` and `zone-eso-stubs` modules of `akasha/temper/temper-upstream-data`. `leaf-dump.ts` reaches nothing else at all. The four `verify.ts` each still import generated data from `@temper/game-housing-addon`, `@temper/shared-addon-libraries-lib-map-data`, `@temper/shared-addon-libraries-lib-treasure` or `@temper/shared-addon-libraries-lib-zone`, and those addon packages are outside akasha.",
} as const satisfies Finding
