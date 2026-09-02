import type { Finding } from "../finding.page-type.ts"

export const anAkashaPackageDropsWhatTheOldManifestToldItsReader = {
  id: "01a0635b-ce06-74f8-92e7-65afe2af6dff",
  pageTypeSlug: "finding",
  slug: "an-akasha-package-drops-what-the-old-manifest-told-its-reader",
  domainSlug: "domain/temper",
  claim:
    "Recreating `temper/player-profile` as `@akasha/temper-player-profile` left behind everything its old manifest and tsconfig told a reader to do, and the landed package restates none of it. The same is true of the landed sibling `temper-characters-equipment-ui`, so this is the shape of every temper package carried in rather than one package's loss.",
  evidence:
    "The old `temper/player-profile/package.json` carries a `functionalType` of `next-ui`, a `version`, a `private` key, three `scripts` naming `bunx @typescript/native-preview -b`, `biome check .` and `biome check --write .`, and four `devDependencies` for `@types/bun`, `@types/react`, `react` and `typescript`. Its `tsconfig.json` sets `composite`, `emitDeclarationOnly`, a `declarationDir` of `dist`, `jsx` of `react-jsx`, a three-entry `lib` and a `types` of `@types/bun`. The landed `akasha/temper/temper-player-profile/package.json` declares a name, `private`, `type`, one export, four dependencies and one peer dependency, and no tsconfig lands beside it. `akasha/temper/temper-characters-equipment-ui`, landed earlier by another seat, holds the same eight files-worth of nothing: a manifest of the same six keys and no tsconfig. What told the old package how to typecheck and lint is therefore not lost by oversight but dropped by the paradigm, and where an akasha package states its own build and lint is unwritten.",
} as const satisfies Finding
