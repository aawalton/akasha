import type { Finding } from "../finding.page-type.ts"

export const theAddonDeclarationTreeIsReplacedAndOnlyItsWiringHoldsIt = {
  id: "01a06313-7a41-7c02-9f6d-2b18d0e4a5c7",
  pageTypeSlug: "finding",
  slug: "the-addon-declaration-tree-is-replaced-and-only-its-wiring-holds-it",
  domainSlug: "domain/temper",
  claim:
    "`temper/addons/types/**` is already replaced under `akasha/`: 6,643 of 6,645 eso names, 129 of 129 libs names with no member-level gap, and all three tstl files carrying 67 of 67 Lua stdlib members. What holds the folder is wiring rather than content. 15 sibling tsconfigs extend its `tsconfig.base.json`, and its eso globs are the only path by which the tstl tree reaches any compiler.",
  evidence:
    "Parsed at 3f184be964 with the TypeScript AST over declared names — `declare const`, `function`, `let`, `interface`, `type`, `enum`, `class`, `namespace`, and names inside `declare global` — because an ambient declaration exports nothing an export census can see. All nine forms were seeded in a control file and found before any zero was believed. Denominators: eso 40 files and 6,645 names, libs 31 files and 129 names, tstl 3 files and 132 names.\n\nAbsent from akasha: two, both one-line aliases in `temper/addons/types/eso/generated/enums.d.ts`, `type InstanceType = number` at line 208 and `type LinkStyle = number` at line 220. `InstanceType` collides with a TypeScript built-in utility type, so its absence may be deliberate.\n\nTwo figures that read as gaps are not. `LibDataEncode` sits outside the twin, at `akasha/temper/temper-lib-data-encode/data-encode-entry-declarations`, so libs is 129 of 129 rather than 128. The 67 tstl names missing at top level are Lua stdlib members: the legacy file writes `declare namespace math`, the twin writes `declare const math` over an object type, and all 67 are members of those types. A shape change, not a loss.\n\nThe wiring is the whole blocker. No tsconfig in the repository uses `typeRoots`, and every addon tsconfig sets `types: []` inherited from `temper/addons/tsconfig.base.json` line 7, so the tstl tree reaches the compiler only through triple-slash references out of `types/eso/sandbox-lualib.d.ts` and `types/eso/globals.d.ts`. Dropping the eso folder silently drops the tstl tree with it.",
} as const satisfies Finding
