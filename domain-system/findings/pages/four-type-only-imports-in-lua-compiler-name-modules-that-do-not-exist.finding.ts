import type { Finding } from "../finding.page-type.ts"

export const fourTypeOnlyImportsInLuaCompilerNameModulesThatDoNotExist = {
  id: "01a06798-4d53-7002-ba7c-dd86c13d92c0",
  pageTypeSlug: "finding",
  slug: "four-type-only-imports-in-lua-compiler-name-modules-that-do-not-exist",
  domainSlug: "workspace-package/lua-compiler",
  claim:
    "Four `import type` specifiers in `lua-compiler` reference `./Decorator` and `./GeneratorIterator` — modules that exist nowhere in the repository, past or present. Nothing complains because bun erases type-only imports at runtime and no typecheck runs over the package: it carries no `tsconfig.json` of its own. The types those imports name are silently `any` today, and a future typecheck over the package will fail on all four.",
  evidence:
    "Confirmed by grep: `lualib/src/Iterator.ts:1`, `lualib/src/Generator.ts:2`, `lualib/src/DelegatedYield.ts:1`, `lualib/src/Decorate.ts:1` — no fifth site anywhere in the tree, and searching the whole repository for `Decorator.ts` or `GeneratorIterator.ts` by filename returns nothing. `lua-compiler` itself carries no `tsconfig.json`; the only two under it are `lualib/tsconfig.json` and `lualib/tsconfig.lua50.json`, which exist to select a `rootDirs` variant for Lua transpilation, not to typecheck the package generally. Of 205 workspace-package pages under `akasha`, only 5 carry a package-root `tsconfig.json`, and all 5 are web apps: `temper-web`, `alan/web`, `audhdalan-web`, `smilingjenny-web`, `archive-of-worlds-web`. `lua-compiler` is not among them, so nothing in the ordinary build or check pipeline ever asks the TypeScript compiler to resolve these four specifiers, and bun erases `import type` at runtime, so nothing complains there either.",
} as const satisfies Finding
