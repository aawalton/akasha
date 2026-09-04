import type { Finding } from "../finding.page-type.ts"

export const tableGetnTracksLuaTargetNotWhichVariantFileWasSelected = {
  id: "01a06798-4d53-7000-ad60-81bb8f86c4bc",
  pageTypeSlug: "finding",
  slug: "table-getn-tracks-lua-target-not-which-variant-file-was-selected",
  domainSlug: "workspace-package/lua-compiler",
  claim:
    "`table.getn` looked like the marker proving lualib's `rootDirs` variant selector picked the right source for a Lua 5.0 build — 0 occurrences in a universal-target bundle, 62 in a 5.0-target bundle. It is not a selection marker: it is what the 5.0 codegen backend emits for the `#` operator, so it tracks `luaTarget` rather than which of `src/universal` or `src/5.0` actually resolved for `CountVarargs`, `Match`, `MathModf`, `SparseArraySpread` and `Unpack`.",
  evidence:
    'Proving the right file was selected is mandatory: a wrong selection builds clean and fails only in shipped Lua, never at build time. Method: copy the package, swap `src/universal` and `src/5.0`, build with `luaTarget=universal` — a build now selecting the WRONG files. `table.getn` stayed at 0 and reported the seeded fault CLEAN; an instrument blind to its subject reports clean. The replacement markers are direct transliterations of the variant sources, tested against both seeded swaps: universal-only `local __TS__MathModf = math.modf`, `local __TS__Match = string.match`, `local __TS__Unpack = table.unpack or unpack`, `return select("#", ...)`; 5.0-only `return integral, x - integral` and `return __TS__Unpack(sparseArray, 1, sparseArray.sparseLength)`. With these the seeded universal build classified LUA50 and the seeded 5.0 build refused to classify — both seeded faults caught, all known-good bundles classify correctly. Harness and checker, cited as scratch: `/tmp/claude-1000/-var-home-walton-repos/69461732-1d69-48f9-8a42-f70b0f7f49da/scratchpad/lua-proof/{build-bundle.ts,check-variant.ts}`.',
} as const satisfies Finding
