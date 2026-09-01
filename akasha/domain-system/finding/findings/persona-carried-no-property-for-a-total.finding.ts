import type { Finding } from "../finding.page-type.ts"

export const personaCarriedNoPropertyForATotal = {
  id: "01a05c6c-a642-7000-b49d-cb764f571fb7",
  pageTypeSlug: "finding",
  slug: "persona-carried-no-property-for-a-total",
  domainSlug: "domain/akasha-migration",
  claim:
    "The persona page type carried no property for a total, so a persona's engine total had nowhere to land even once a writer for it existed. I added `total-points` rather than write the total into `green-day-points`, which is the daily bar and not a total. The two are different quantities by orders of magnitude, and conflating them would have restated tonight's bar corruption in a new place.",
  evidence:
    '`persona.page-type.ts` declared thirteen properties and no total: `greenDayPoints` stood among them, `totalPoints` did not, and the `Persona` type had no member for one. Yet `engine-total-points.ts:65`, `health-total-points.ts:194` and `session-points-totals.ts:129` all wrote the key `total-points` onto page type `persona`, and `persona-recipe-rows.ts:57` read it back. The definition survives from before the migration at `pages/page-property-definition/persona-total-points.page-property-definition.md`, keyed `total-points`, typed number, saying "the points a persona has earned in all" — so the property was intended and simply was not carried into akasha with the rest of the persona system. `persona-all` reporting `total-points` among its unfound keys is that absence, not a spelling fault.\n\n`green-day-points` is defined as how many points a persona must earn in a day for it to draw green. It is a bar, and a bar is what fifty tracked days were corrupted with earlier tonight when 10000 was written into one. A cumulative total runs one to two orders of magnitude above a bar, so writing a total there would have collapsed a persona\'s days to the lowest rung by the same mechanism just repaired.\n\nThe call taken, Alan being asleep: add the property rather than reuse the bar or drop the write. It is optional and additive, so nothing that does not ask for it sees a change, and it matches a definition that already stood. Landed at 4df12b2975, 38 checks judged and none refusing.',
} as const satisfies Finding
