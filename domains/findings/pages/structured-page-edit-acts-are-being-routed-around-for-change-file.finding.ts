import type { Finding } from "../finding.page-type.types.ts"

export const structuredPageEditActsAreBeingRoutedAroundForChangeFile = {
  id: "01a08cd1-8cc1-76cd-b0e1-58204b8c6777",
  pageTypeSlug: "finding",
  type: "finding",
  slug: "structured-page-edit-acts-are-being-routed-around-for-change-file",
  domain: "domain/change-agent-file-content",
  claim:
    "Three times in one day an agent gave up on a structured page-editing act and reached for `change-file` with an old and new fence, because the act was wrong or missing. The acts exist so that a page edit is judged before it lands. `change-file` replaces a passage of text and is judged by nothing that knows the edit touches a page. Each time an act is routed around, the safety that act was built for is not had, and nothing anywhere records that it was skipped, so the rate is invisible. Two of the three causes are now mended. The third is a gap: no act edits a list field inside a record.",
  evidence:
    'The three, all on 2026-09-10. First, `add-property-value` was asked for `figureOffScale: true` on a readout group and wrote `figureOffScale: "true"`, since it spelled every value with `JSON.stringify` whatever the property held. That fails at typecheck, so the agent dropped the drafts and used `change-file`. Mended at 19f62f57b3, which reads what the property holds from the page type and hands the spelling down to the mechanical act. Second, the same act was handed `key: aids` while an agent was trying to edit the `aids` list inside a directive record on a person page. It accepted the key and drafted a stray top-level `aids` property that the `person` page type declares nothing for. Nothing refused it; it was caught by reading `akasha change show` before applying, and cleared with a drop. Mended at 57c8ad6ae8, which refuses a key the page\'s type declares no property for. Third, and still open: `change-property-record-field` refused that same edit correctly, saying the record states no text under `aids`, because it states one field anew and a list field is not text. There is no act that puts a value into a list field inside a record, so the only way through was `change-file`. The pattern matters more than any of the three. An act that refuses is a good outcome, because the agent learns what is wrong; an act that is missing and an act that writes the wrong thing both end at `change-file`, and `change-file` lands whatever the fences say. A count of how often an act is abandoned would say which acts are worth mending, and nothing collects it.',
} as const satisfies Finding
