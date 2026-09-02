import type { Finding } from "../finding.page-type.ts"

export const theValuesReadoutGroupIsADenominatorRatherThanADisplay = {
  id: "01a06224-a9c9-7038-bc68-b915394f4360",
  pageTypeSlug: "finding",
  slug: "the-values-readout-group-is-a-denominator-rather-than-a-display",
  domainSlug: "domain/alan-harness",
  claim:
    "The `values` readout group outlived the values stoplight ablation because it is no display: `stoplight-mean-points.ts` resolves it for the denominator a persona's day is scored out of. Removing its page throws. Emptying its membership instead is silent, moving the denominator from 17 lights to 11 and rescoring every persona-day. The two failures are not alike and only one announces itself.",
  evidence:
    "readouts/stoplight-mean-points.ts:13 holds VALUES_GROUP_SLUG; :117-124 resolves upkeep, inboxes and values together; :126 hands all three to scoredLightCount as the denominator; :136-143 floors each value's summed units into fixedFloors. The caller is tools/lib/wake-day/points-source-engine.ts:261, reached for any persona-points-source of kind `stoplights`. daily-tracking-points.timer last ran 2026-09-02 06:00, twenty-two minutes before this was mapped.\n\nTwo failure shapes, read off the code. readout-resolver.ts:157-162 throws `resolveReadoutGroup: no group` where the catalog holds no page answering to the slug, so removing readouts/group/values.readout-group.md stops the engine loudly. scoredLightCount at :72-93 throws only where a group resolves short — unresolved.size > 0 — and otherwise returns the sum of readouts.length. A group page kept with no member readouts resolves to zero readouts and zero unresolved, so nothing throws and the denominator falls from 6+5+6=17 to 6+5+0=11.\n\nThe six values are no separate readout pages: readouts/group/values.readout-group.md sequence-slugs name alan/value/*.value.md directly, and pages/page-type/value.page-type.md carries extends-slug: readout. What would have to go is a set of properties on the value pages themselves, and Alan's scope kept the values.\n\nHeld for that reason: the group page, readouts/scale/green-day-units.readout-scale.md, readouts/query/value-green-day-units-on-day.page-query.md and readouts/daily-stoplights.ts. The tiles, routes, Swift and payload mirrors went at 508deec4ed and the four commits before it.",
} as const satisfies Finding
