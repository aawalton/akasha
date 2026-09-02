import type { WorkspacePackage } from "../../code-system/workspace-packages/workspace-package.page-type.ts"

export const temperSkillKinds = {
  id: "01a060db-b2bf-75cc-8809-206da241df83",
  pageTypeSlug: "workspace-package",
  slug: "temper-skill-kinds",
  definition:
    "the kinds a skill is sorted by and the shapes a skill activation effect is written in",
  manifest: "json",
  partSlugs: [
    "module/skill-types",
    "module/skill-slots",
    "module/skill-bars",
    "module/target-scopes",
    "module/target-types",
    "module/special-effect-types",
    "module/status-effect-types",
    "module/scribing-affix-scripts",
    "module/scribing-focus-scripts",
    "module/scribing-signature-scripts",
    "module/skill-value-formulas",
    "module/skill-buff-debuff-types",
    "module/skill-activation-effect-types",
    "module/skills-source",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A skill itself is named outside this package.",
    },
    {
      invariantKind: "departure",
      statement: "Every table here is written out from the skill pages rather than by hand.",
    },
  ],
} as const satisfies WorkspacePackage
