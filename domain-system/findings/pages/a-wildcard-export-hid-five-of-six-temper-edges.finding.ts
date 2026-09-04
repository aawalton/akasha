import type { Finding } from "../finding.page-type.ts"

export const aWildcardExportHidFiveOfSixTemperEdges = {
  id: "01a06354-4b4b-7e1d-8a05-29173b6c6493",
  pageTypeSlug: "finding",
  slug: "a-wildcard-export-hid-five-of-six-temper-edges",
  domainSlug: "domain/temper",
  claim:
    'The census reading zero `@temper/*` edges across the seven `temper/*-ui` packages was defeated by the exact-key lookup it shares with `imports-inside`. A manifest declaring only `"./*": "./src/*.ts"` stores the literal key `@temper/x/*`, so `@temper/x/y` resolves to null and the edge is dropped rather than counted. Five of the six such edges in `player-inventory-management-ui` were invisible that way, and none of the six had ever been cleared.',
  evidence:
    'Measured over the 111 tracked `.ts` and `.tsx` files of `temper/player-inventory-management-ui` with two instruments, a regex over the source text and `Bun.Transpiler.scanImports`, denominator printed and non-zero. They disagree by 25 specifiers: 24 the transpiler drops for being `import type`, 1 it adds, `react/jsx-dev-runtime`. Their union is 274 distinct specifiers, 6 of them `@temper/*`. Resolved against the 270 manifests declaring exports, `@temper/game-characters-equipment-ui/equipment-icon` answers a literal `"./equipment-icon"` key; the other five reach packages whose only export key is `"./*"`, so `naming.get(specifier)` answers null and skips them. `git grep` over the package at `f35bce3129` and at HEAD returns the identical seven files and ten lines, so this is no regression. Widening the same instrument to all seven `-ui` packages leaves 14 leaking specifiers, 13 among the seven and one, `@temper/player-profile/use-player`, on a package that is not one of the seven, reached twice from `player-inventory-management-ui` and once from `player-economics-ui`.',
} as const satisfies Finding
