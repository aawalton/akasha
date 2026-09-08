import type { Initiative } from "../initiative.page-type.ts"

export const amyWorkPanelEditing = {
  id: "01a081d8-12f8-72e4-8685-e9755f00af1c",
  pageTypeSlug: "initiative",
  slug: "amy-work-panel-editing",
  domainSlug: "workspace-package/editor-extension",
  personaSlug: "amy",
  intents: [
    {
      statement: "Alan orders the intents an initiative holds by dragging a row in the Work panel.",
      workingMemory:
        "Nothing is built yet. Alan asked for the drag and drop the Explorer panel already gives rather than a scheme of this panel's own.",
    },
    {
      statement:
        "Alan's tracking is spelled `track` in its domain, its folder and its module names.",
      workingMemory:
        "Nothing is renamed yet. `akasha track health import` already spells it `track`, while the domain, 19 slugs beneath it and 1309 file paths spell it `tracking`.",
    },
  ],
} as const satisfies Initiative
