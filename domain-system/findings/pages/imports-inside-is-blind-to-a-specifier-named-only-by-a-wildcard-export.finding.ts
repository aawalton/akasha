import type { Finding } from "../finding.page-type.ts"

export const importsInsideIsBlindToASpecifierNamedOnlyByAWildcardExport = {
  id: "01a06345-7ad2-7b4f-b1c7-0a35f460da68",
  pageTypeSlug: "finding",
  slug: "imports-inside-is-blind-to-a-specifier-named-only-by-a-wildcard-export",
  domainSlug: "domain/temper",
  claim:
    '`imports-inside` refuses nothing for a bare specifier whose manifest names it only through a wildcard export. `landingOf` is an exact-key lookup, and `"./*": "./src/*.ts"` puts one key, `@temper/x/*`, in the map, so `@temper/x/y` misses it, lands `null`, and the check passes over it. Every package under `temper/` exports this way.',
  evidence:
    'Measured at `71aa319531`. Calling the check\'s own `foundIn` with the path `akasha/temper/temper-probe/probe.module.code.ts` and a naming built from all 317 tracked manifests, each of `@temper/game-characters/build-metadata`, `@temper/player-completion/activity-category-data` and `@temper/game-characters-character/build-types` drew no reason. A fault seeded into the same call, `../../../temper/game-characters/src/build-metadata`, was refused with the outward-reach reason, so the probe was not blind to a bar. Line 64 of `akasha/code-system/code-specifier/code-specifier.module.code.ts` is `return naming.get(specifier) ?? null`, and `reachesIn` in `akasha/code-system/package-manifest` stores `"./*"` as the literal key `@temper/x/*` rather than expanding it, so nothing downstream can match a subpath. Of the 3,905 export keys the tracked manifests declare, 43 are wildcards. Expanding those 43 the way Node resolves them turns up 12 edges in 7 files out of the eight `-ui` packages at `3253ac18d5`, where the check itself reported none.',
} as const satisfies Finding
