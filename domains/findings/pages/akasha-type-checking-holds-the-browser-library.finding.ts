import type { Finding } from "../finding.page-type.ts"

export const akashaTypeCheckingHoldsTheBrowserLibrary = {
  id: "01a06070-0ac4-70c5-8d19-26fb12c87fd9",
  pageTypeSlug: "finding",
  slug: "akasha-type-checking-holds-the-browser-library",
  domainSlug: "domain/akasha",
  claim:
    "akasha type-checks every file against the full ESNext library, which carries the browser types. A game name that matches a browser name resolves to the browser one, and the mismatch is reported inside addon code rather than at the declaration. Addon code compiles to Lua 5.1 in a sandbox with no browser, so the browser types are wrong for it and no setting turns them off.",
  evidence:
    "akasha/code-system/code-typing/code-typing.module.code.ts sets noEmit, strict, noUncheckedIndexedAccess, allowImportingTsExtensions, module Preserve, moduleResolution Bundler, target ESNext, skipLibCheck and jsx ReactJSX, and states no `lib` and no `types`. With no `lib`, an ESNext target loads lib.esnext.full.d.ts, which includes the DOM. Recreating LibPrice showed this: the game declares `type LinkStyle = number` in temper/addons/types/eso/generated/enums.d.ts, the DOM declares an interface of the same name, and the game's number never reached the parameter. The refusal read `Argument of type 'number' is not assignable to parameter of type 'LinkStyle'` against price-source-furniture-catalogue rather than against the declaration, and adding the game's own alias answered `TS2300 Duplicate identifier`. The addon tsconfigs say `lib: [ESNext]` and `types: []` for exactly this reason, in temper/addons/tsconfig.base.json.",
} as const satisfies Finding
