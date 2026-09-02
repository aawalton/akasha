import type { Finding } from "../finding.page-type.ts"

export const anEsoArtifactLeavesTheFreshnessPopulationWhenItMovesIntoAkasha = {
  id: "01a060ae-70e0-72e0-b28d-314aa7c71dc3",
  pageTypeSlug: "finding",
  slug: "an-eso-artifact-leaves-the-freshness-population-when-it-moves-into-akasha",
  domainSlug: "domain/temper",
  claim:
    "The ESO clone-freshness population is gathered by reading the `temper` folder for files under a `generated` folder that carry a clone provenance line. akasha refuses that provenance line as prose on line 1, and an artifact recreated under akasha/temper is outside the folder the population reads. So every clone-derived artifact this initiative moves stops being compared against the clone, silently, and the audit still prints green over the ones left.",
  evidence:
    "temper/shared-build-deploy-checks/src/eso-clone-artifacts.ts sets WALK_ROOT to `temper`, and isGeneratedByPath keeps a path only where a folder named `generated` is above it or the base name holds `.generated.`. buildEsoClonePopulation then drops any file whose text carries no provenance line. tools/commands/audit/eso-typings-fresh.ts reads that population and refuses only when the population is empty. The HUD scene catalog was such an artifact: temper/shared-interface-hud-scene-catalog/src/generated/hud-scene-catalog.generated.ts carried `ESO-API-Version: 101050  (source freshness marker; verified by check-eso-typings-fresh)`. It is now akasha/temper/temper-hud-components, three data modules under no `generated` folder and carrying no stamp, because trap 1 of this wave records that the banner is refused as prose. The population is not empty only because temper/addons/types/eso/generated still holds 41 stamped declaration files, and those move next. Two mends are open: that gathering could take a second root and match akasha's module naming, or a workspace-package page could carry the stamped API version as a property, which akasha would then check like any other.",
} as const satisfies Finding
