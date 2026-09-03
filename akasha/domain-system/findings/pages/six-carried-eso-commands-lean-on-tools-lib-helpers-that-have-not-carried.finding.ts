import type { Finding } from "../finding.page-type.ts"

export const sixCarriedEsoCommandsLeanOnToolsLibHelpersThatHaveNotCarried = {
  id: "01a06864-e358-7000-ae9e-20b94a468f0a",
  pageTypeSlug: "finding",
  slug: "six-carried-eso-commands-lean-on-tools-lib-helpers-that-have-not-carried",
  domainSlug: "domain/akasha-migration",
  claim:
    "Six ESO commands now stand in akasha and reach out to `@tools/lib` for helpers that never carried, so the lane that ablates `tools/lib` takes six live akasha commands down with it.",
  evidence:
    "The six are akasha/temper/temper-commands/{audit-eso-typings-fresh,eso-generate-base-game-globals,eso-generate-chatter-names,eso-generate-colon-methods,eso-generate-hud-scene-catalog,eso-generate-typings}, landed at 09d9827f91da18d320819a6e226f3dc3c6cb0bdd and tracked in HEAD. Their library layer did carry, into akasha/temper/temper-eso-typings, temper-hud-components, temper-eso-paths and temper-build-deploy-checks. What did not carry is `tools/lib/audit-reading.ts` (akasha/checks/cluster-checks/modules/audit-reading holds `AuditReading` and `summarizeAudit` but not `renderAuditReading`, and @akasha/checks/package.json exports the module nowhere), `tools/lib/akasha-name-series.ts`, `tools/lib/eso-clone-code.ts`, `tools/lib/eso-base-game-globals.ts`, `tools/lib/eso-colon-methods.ts`, `tools/lib/eso-chatter-names.ts`, and `tools/lib/eso-typings/opt-in.ts` with its data/opt-in.manifest.json. Each of those must carry, and be exported from its package, before `tools/lib` is ablated.",
} as const satisfies Finding
