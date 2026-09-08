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
        "Built and landed, and Alan has confirmed a drag reorders an intent. A drop now draws the rows in their new order before `akasha move-intent` is called rather than after the service rewrites the panel's file. That order is held until the file carries it, so a file written from a picture taken before the drop cannot put the rows back. A refused move draws the order the file carries. Whether the rows move at once is unverified until Alan drags a row.",
    },
    {
      statement:
        "Alan's tracking is spelled `track` in its domain, its folder and its module names.",
      workingMemory:
        "Nothing is renamed yet. `akasha track health import` already spells it `track`, while the domain, 19 slugs beneath it and 1309 file paths spell it `tracking`.",
    },
  ],
} as const satisfies Initiative
