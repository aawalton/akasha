import type { Initiative } from "../initiative.page-type.ts"

export const amyWorkPanelEditing = {
  id: "01a081d8-12f8-72e4-8685-e9755f00af1c",
  pageTypeSlug: "initiative",
  slug: "amy-work-panel-editing",
  domainSlug: "workspace-package/editor-extension",
  personaSlug: "amy",
  intents: [
    {
      statement:
        "Alan's tracking is spelled `track` in its domain, its folder and its module names.",
      workingMemory:
        "Nothing is renamed yet. `akasha track health import` already spells it `track`, while the domain, 19 slugs beneath it and 1309 file paths spell it `tracking`.",
    },
    {
      statement: "Alan orders the intents an initiative holds by dragging a row in the Work panel.",
      workingMemory:
        "Built and landed. The Work panel's tree view carries a drag and drop controller from `module/work-tree-dragging`; a drop calls `akasha move-intent`, which reaches `change-mechanical-file-content/move-property-value` and commits the initiative page. The service watches `domains/initiatives/pages`, so the panel's file follows, which is verified. The drag itself is unverified until Alan drags a row.",
    },
  ],
} as const satisfies Initiative
