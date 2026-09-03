import type { Finding } from "../finding.page-type.ts"

export const theOldCompilerTsconfigTargetWentAwayRatherThanBeingHonoured = {
  id: "01a06805-e2b9-789c-8671-37316b1ca54c",
  pageTypeSlug: "finding",
  slug: "the-old-compiler-tsconfig-target-went-away-rather-than-being-honoured",
  domainSlug: "workspace-package/lua-compiler",
  claim:
    "The removed `lua-compiler/tsconfig.base.json` set `target: ES2019` and `useDefineForClassFields`. The akasha package that replaced it carries no tsconfig of its own, by the convention that only web apps do, so it now takes the root configuration instead. That setting was dropped along with the file rather than carried over or decided against, and no typecheck runs over the package today to notice either way.",
  evidence:
    "Of 263 package manifests under `akasha`, six carry a package-root tsconfig, and all six are web apps, so the compiler package having none is the convention rather than an omission. The two settings differ in what they mean for emitted code: `useDefineForClassFields` decides whether a class field declaration defines a property or assigns one, which changes behaviour for fields that shadow an inherited accessor. Nothing exercises that difference now, because no typecheck reaches the package — which is also why this will not announce itself. It is recorded here so that whoever later adds a typecheck over `akasha/language-design/lua-compiler` and meets unexpected class-field behaviour finds this rather than a mystery. The decision owed is whether the root target is right for a package whose output is transpiled to Lua, not whether the old file should return.",
} as const satisfies Finding
