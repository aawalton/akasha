import type { Finding } from "../finding.page-type.ts"

export const aFallbackOutlivingItsWindowTurnsARightAnswerIntoARefusal = {
  id: "01a087cd-c6ba-7f34-9739-afdbe088a784",
  pageTypeSlug: "finding",
  slug: "a-fallback-outliving-its-window-turns-a-right-answer-into-a-refusal",
  domain: "domain/change-agent-page-type",
  claim:
    "A dual-read added to hold a two-key window open changes character when the old key's property page goes, and the change is invisible at the reading. While both keys named a declared property, the fallback branch could produce a right answer. Once the old property page is gone, that same branch can only write a key nothing declares, which a check then refuses. A fallback outliving its window is therefore not merely dead weight: it converts a clean answer into a refusal. The case that reaches it is also the case nobody tests, because the condition selecting the fallback is the page type carrying no parts at all, which is a page type gaining its first property.",
  evidence:
    '`add-property-to-page-type` and `remove-property-from-page-type` each carried `key: textsAt(owner, PARTS) === null ? exportedAs(PART_SLUGS) : PARTS`, given them at 06a0801b36 while domain pages were split across `part-slugs` and `parts`. The condition asks whether the page type states any parts, not which spelling it uses, so the fallback fired for a page type with no parts rather than for a page type with old-spelled parts.\n\nAt 8bf679af76 the `part-slugs` relation property page went. From that commit the fallback could only write the key `partSlugs`, which no property declares. `introduced-property-is-a-part` and `domain-is-named-by-a-parent` both refuse that state, so the branch could no longer end in a landing at all.\n\nBoth acts\' tests mocked the owner page as `{ slug: "ios-app" }`, carrying no parts, so every test ran the fallback branch and asserted `key` was `partSlugs`. The branch that could no longer work was the only branch under test, and the branch that does the work was untested. The tests passed throughout.\n\nThe two acts were collapsed to `key: PARTS` at 9f76e026aa and 8ca1727b7c.',
} as const satisfies Finding
