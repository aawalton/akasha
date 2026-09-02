import type { Finding } from "../finding.page-type.ts"

export const temperToolLibrariesReachFortyFourPackagesOutsideAkasha = {
  id: "01a0603b-29f4-7187-96ae-0bf91ebfd5a5",
  pageTypeSlug: "finding",
  slug: "temper-tool-libraries-reach-forty-four-packages-outside-akasha",
  domainSlug: "domain/temper",
  claim:
    "Seventeen of the eighteen `tools/lib/temper-*` catalog, errors, explain and parity files cannot be recreated inside akasha yet, because each one imports `@temper/*` workspace packages that live under `temper/` outside akasha, and an akasha file may import no file outside akasha. The order is forced rather than chosen: the `temper/` packages come into akasha first, and this tool code follows them. Only `temper-explain-walk.ts` imports nothing at all, and that one is recreated.",
  evidence:
    "The transitive import closure over the eighteen seed files is 236 files, of which 210 sit outside akasha across 44 distinct `@temper/*` workspace packages plus 26 further files in `tools/lib`. Per seed: `temper-parity-code.ts` reaches 165 files outside akasha, `temper-explain-code.ts` 162, `tools/lib/temper-catalog-generate/tiers.ts` 39, `temper-catalog-code.ts` 28, `temper-errors-code.ts` 15, each single tier module 9 to 12, `harness.ts` 8, and `temper-explain-walk.ts` none. The heaviest reaches are `temper/game-companions-core` at 33 files, `temper/game-characters-equipment` at 30, `temper/game-items-core` at 22, `temper/game-items-rules-eval` at 22 and `temper/game-items-rules-core` at 21. Every tier module reaches its capture package plus `../harness.ts` and `../../exit.ts`, and `harness.ts` itself reaches `@temper/scripts`, `@temper/shared-foundation-misc-eso-paths-resolve` and `@temper/shared-saved-variables`. The only imports already inside akasha are `@akasha/utils-narrow/as-record` and `@akasha/utils-narrow/assert-never`. `tools/lib/exit.ts` reaches `@akasha/errors-core/exit-code`, which resolves inside akasha, so `exit.ts` is not itself a blocker.",
} as const satisfies Finding
