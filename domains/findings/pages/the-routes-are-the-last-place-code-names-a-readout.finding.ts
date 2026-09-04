import type { Finding } from "../finding.page-type.ts"

export const theRoutesAreTheLastPlaceCodeNamesAReadout = {
  id: "01a05e65-7b6e-78b7-b83b-35131469d19e",
  pageTypeSlug: "finding",
  slug: "the-routes-are-the-last-place-code-names-a-readout",
  domainSlug: "workspace-package/readout-system",
  claim:
    "Every module under readout-system is now generic: none names a readout, a scale or a group. The two categorization routes each name the one readout they serve, and that literal cannot go until a route is itself a page, because tying a URL to data needs one name written somewhere and there is nowhere else to write it.",
  evidence:
    "Landed at `ca7036fa02`. `UNREVIEWED_READOUT` and `BACKLOG_COUNT_SLUG` are gone; `answerReadoutAdmittedBy` takes a readout slug and reads the key, the scale and the words for an empty reading off that readout's own page. What is left is `const READOUT` in `alanwalton/web/app/routes/api.categorization.ts` and its twin under `smilingjenny/`.\n\nThe modules could not go further on their own. A route serves one URL and the wire has to carry one readout's reading under one key; something has to say which. The readout page already carries `wireKey`, `scaleSlug`, `groupSlugs` and both none-left halves, so every other fact was liftable and was lifted. The name itself is the wiring, not a fact about the readout.\n\nThe honest home for it is the route's own page, once routes move into akasha — a route page naming its readout the way `monarch-relay-service.workstation-service.ts` names what it carries. That move is a later intent and nothing here waits on it.\n\nThe wider count is not small: an audit of the tree found roughly 169 literal readout, group, scale, value and wire-key occurrences across 62 files. Most are outside this package — 41 persona pages carrying `valueSlug`, a 41-row persona-to-value table baked into Swift at `alanwalton-persona-stoplights-widget.ios-component.swift.swift:57-66`, six upkeep slugs repeated in three Swift harnesses, and nine stoplight routes over one generic function. This finding covers only the readout-system half, which is done.\n\nThe call taken: parameterised the modules and left one name at each edge rather than inventing a lookup that would have had to name something else instead.",
} as const satisfies Finding
