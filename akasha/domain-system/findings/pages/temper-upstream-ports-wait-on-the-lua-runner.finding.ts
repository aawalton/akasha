import type { Finding } from "../finding.page-type.ts"

export const temperUpstreamPortsWaitOnTheLuaRunner = {
  id: "01a06039-c824-7984-a610-309101f66ca1",
  pageTypeSlug: "finding",
  slug: "temper-upstream-ports-wait-on-the-lua-runner",
  domainSlug: "workspace-package/temper-upstream-data",
  claim:
    "Ten of temper's eighteen upstream-data and addon-build files cannot enter akasha because every one of them imports `@temper/shared-build-deploy-lua-runner`, and `imports-inside` refuses a file outside the folder. The runner cannot simply follow them in: it loads `driver.lua` and `eso-sandbox-prelude.lua` off disk at runtime, so carrying it needs the Lua page types that are still owed. The eight ports and verifiers are the whole feature; what landed is the scaffolding around them.",
  evidence:
    "Blocked, with what each reaches for: `tools/lib/temper-upstream-data/{housing,lib-map-data,lib-treasure,lib-zone}/port.ts` and the four matching `verify.ts` each import `@temper/shared-build-deploy-lua-runner/lua-vm` and `@temper/shared-foundation-misc-eso-paths-resolve/eso-paths-resolve`; `leaf-dump.ts` imports `@temper/shared-build-deploy-lua-runner/lua-number-string`; `tools/lib/temper-addon-lua.ts` imports the runner root plus `@temper/shared-build-deploy-tstl/transpilation/index`. `akasha/checks/code-checks/pages/imports-inside/imports-inside.code-check.ts` runs on patch, worktree, deploy and audit and states `A package landing outside the akasha folder is refused like any other path`. The runner is small — `temper/shared-build-deploy-lua-runner` is 12 tracked files, 22,411 bytes — but two of them are `src/driver.lua` and `src/eso-sandbox-prelude.lua`, read at runtime by `src/persistent-vm.ts`, and the eso-addon and lua-module page types were only added to `code-system` while this seat worked. `temper/shared-foundation-misc-eso-paths-resolve` is 4 files reaching one more package, `temper/shared-foundation-misc-eso-paths`, 3,129 bytes; that pair blocks nothing on its own and would follow the runner in easily.",
} as const satisfies Finding
