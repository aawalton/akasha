import type { WorkspacePackage } from "../../code-system/workspace-packages/workspace-package.page-type.ts"

export const temperPlayerCompletionSkillsMorphsUi = {
  id: "01a06270-883d-7002-9d36-997c74946d96",
  pageTypeSlug: "workspace-package",
  slug: "temper-player-completion-skills-morphs-ui",
  definition: "the cards a browser gives one player's skill morph progress in",
  manifest: "json",
  partSlugs: [
    "module/skill-morphs-progress-panel-card",
    "module/subclassing-skill-morphs-panel-card",
  ],
} as const satisfies WorkspacePackage
