import type { Finding } from "../finding.page-type.ts"

export const theCodegenIdentityCheckIsRetiredAndAkashaHasNoReplacement = {
  id: "01a063d6-6613-764c-8bc3-2a50aa1938fa",
  pageTypeSlug: "finding",
  slug: "the-codegen-identity-check-is-retired-and-akasha-has-no-replacement",
  domainSlug: "domain/temper",
  claim:
    "`infra/cluster-checks` is retired and refuses to run, so `codegen-type-identity-drift` judges nothing, and no akasha code check replaces it. The rule it carried, that the public-dungeon keys in `temper-skill-point-finder` match the canonical list, still holds at 36 keys either side with nothing enforcing it. Two of its three skill-point pairs named files being ablated and went; the third was repointed at where the list now lives.",
  evidence:
    "Measured 2026-09-02. Running `infra/cluster-checks/src/checks/check-codegen-type-identity-drift.ts` exits 2 with a refusal saying the cluster-check system no longer judges this repository, that a green result from one of them certifies nothing and a failure means nothing, and that the only valid checks are the akasha ones. Nothing under `akasha/checks/code-checks/pages/` matches codegen, identity or drift.\n\nThe declaration is nonetheless live. `CODEGEN_CHECKS` in `tools/lib/check-workflow/check-configs-codegen.ts` is imported at `check-workflow/index.ts:25` and spread into the routing table at `:199`, so a config names a script that refuses.\n\nThe third pair was broken before any of this. Its mirror named `PUBLIC_DUNGEONS` in `temper-addon-generators/temper-skill-point`, a symbol that file stopped declaring at 50fb543dc0, when the list landed as `temper-player-completion/skill-point-public-dungeons` and the generator began importing it as `SKILL_POINT_PUBLIC_DUNGEON_SOURCES`. The extractor fails an endpoint whose declaration is not found, so the pair would have failed had anything run it.\n\nThe rule was checked by hand instead. `PUBLIC_DUNGEONS` in the finder and `SKILL_POINT_PUBLIC_DUNGEON_SOURCES` in the landed module each carry 36 keys, the sorted sets are identical, and a seeded one-key drop reports unequal. The pair was repointed at the landed module at f161452310.\n\nWhat is left is a rule holding by luck. Both lists are in akasha and both outlive the temper ablation, so a code check under `akasha/checks/code-checks/pages/` could carry it.",
} as const satisfies Finding
