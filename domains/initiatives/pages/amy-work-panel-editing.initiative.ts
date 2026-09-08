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
  ],
} as const satisfies Initiative
