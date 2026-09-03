import type { Finding } from "../finding.page-type.ts"

export const fiveOptionListsAndSevenListsNameDomainsThatHaveNotArrived = {
  id: "01a0657f-0c53-7006-8449-f64669528d6d",
  pageTypeSlug: "finding",
  slug: "five-option-lists-and-seven-lists-name-domains-that-have-not-arrived",
  domainSlug: "domain/akasha-migration",
  claim:
    "Twelve small pages were left outside akasha because the thing that owns them is not in yet. An option list becomes a select property of the page type that offers it, and a list becomes a domain whose members are named one to a line — neither has anywhere to land until its owner does.",
  evidence:
    'The six option lists are chronology-anchor-direction, chronology-anchor-epistemic-status, chronology-anchor-kind, chronology-anchor-tier, model-vocabulary and relationship-levels. akasha models a set of choices as `select-property`, which "states its values as page data" and whose file "exports the union of the values the page states" — so each becomes a select property on the page type that offers it. `find akasha -iname \'*chronology*\'` returns nothing, so four of the six have no owner. `model-vocabulary` has one, `akasha/agents/models/model.domain.ts`.\n\nThe seven lists name their owners in `domain-parent-slug`: domain/code-comment, domain/formula-language (three of them), domain/seat-observation, domain/ops-namespace and domain/page-query-language. A list is "a domain whose subject is a set, its members named and glossed one to a line", which in akasha is a domain page whose members would be a record property nothing yet declares.\n\nThree more were left for the same reason: `selection-policy` (14 weights and caps for choosing an exercise), `client-profile` (one bodyweight) and the 13 `coaching-constraint` pages. Their code is the workspace package `collections/exercises`, still outside, and no coaching domain exists inside akasha. The five `reputation` pages are a mechanic of the world `the-wandering-inn` and belong with the story lane, whose world pages were landing while this ran.',
} as const satisfies Finding
