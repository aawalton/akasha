import type { Finding } from "../finding.page-type.ts"

export const anEsoAddonStatesNoLuaBundle = {
  id: "01a06070-0ac2-7007-9c71-871bfdc66a65",
  pageTypeSlug: "finding",
  slug: "an-eso-addon-states-no-lua-bundle",
  domainSlug: "domain/temper",
  claim:
    "The `eso-addon` page type carries no property for the module the Lua bundler starts from, the name of the Lua file the bundler writes, or the Lua version the bundler targets. Every addon library outside akasha keeps those three facts in its own `tsconfig.json`, and `tsconfig.json` has no page type. So an addon landing in akasha loses the only statement of how the addon is built.",
  evidence:
    "temper/shared-addon-libraries-lib-price/tsconfig.json holds a `tstl` block naming `luaTarget: 5.1`, `luaBundle: LibPrice.lua`, `luaBundleEntry: ./src/main.ts`, `luaLibImport: require-minimal` and `noImplicitSelf: true`, plus `outDir: ../addons/dist/LibPrice`. The same block, with the addon's own bundle name and the same four other settings, sits in the tsconfig of lib-extended-journal, lib-shifter-box and lib-saved-vars. Four of the five settings repeat what temper/addons/tsconfig.base.json already says; `luaBundle` and `luaBundleEntry` do not, and neither is derivable from addon.json, which names title, version, apiVersion, savedVariables, dependsOn, optionalDependsOn, xmlFiles and assets, and no entry module. akasha/code-system/eso-addon/eso-addon.page-type.ts declares addonManifest, bindings, eso-interface-slugs, lua-module-slugs and addon-git-ignore, and an invariant saying the modules an addon holds are compiled from TypeScript to Lua before a build, without saying where that build starts. akasha/temper/temper-addon-build/lua-build-command names the transpiler and its plugins rather than any one project's entry.",
} as const satisfies Finding
