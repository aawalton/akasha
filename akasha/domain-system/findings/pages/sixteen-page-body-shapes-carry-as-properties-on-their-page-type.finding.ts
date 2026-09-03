import type { Finding } from "../finding.page-type.ts"

export const sixteenPageBodyShapesCarryAsPropertiesOnTheirPageType = {
  id: "01a06861-1918-7e3a-a51f-4706a360c056",
  pageTypeSlug: "finding",
  slug: "sixteen-page-body-shapes-carry-as-properties-on-their-page-type",
  domainSlug: "domain/akasha-migration",
  claim:
    "Sixteen of the twenty-one `pages/page-body-shape/*.md` files are carried inside akasha as properties on the counterpart page type, so the sections each shape named and the ceiling it sized them by both survive. The markdown template each also stated is ended rather than carried: `page.page-type.ts` states `A page has no body` and `Every section is a property`.",
  evidence:
    "Measured 2026-09-03 against the ladder the shapes sized by: xs 50, sm 100, md 200, lg 500, xl 1000, 2xl 2000, 3xl 5000.\n\nCeilings that match exactly. finding's claim lg and evidence 2xl are `claim.text-property.ts` max 500 and `evidence.text-property.ts` max 2000. category-rule-code's match repeat 0-10 and value md are `matches` max 10 and `match-values.text-property.ts` max 200, its field and test being `match-key` and `match-comparison`; category-rule-merchant's vocabulary is the same property.\n\nWhole section sets. learn-everything-topic's five slots are the `frontier`, `integration`, `misconceptions`, `bites` and `topic-evidence` file properties. domain's Design, Condition and Intent are `invariants` under their kinds, and its Principles and Rules are `directives` with name, act, warrant and aids. all-about-alan-topic's Design and Questions are `topic-settled` and `topic-unsettled`, both max 1000.\n\nOne property each. persona's History is `history`; persona-appearance is persona's `appearance` file property; subagent-kind's Prompt is `subagent-prompt`; refusal is `refusal-text`; ops-command's Help is `help-notes`; category-rule-agent's act and description are `judgement`, whose invariant states a judgement opens with the act.\n\nlist is the one akasha names the adaptation on: `list.page-type.ts` states `A list's members stand as a property rather than as the shape of a body`.\n\nempty states no section at all, and template and text state a bare passthrough, so all three end at `A page has no body` with nothing left over.",
} as const satisfies Finding
