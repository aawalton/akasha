import type { Finding } from "../finding.page-type.ts"

export const theQueryLinkDiesWhileEveryQueryPageItNamesIsThere = {
  id: "01a0641a-d59a-767f-b7f6-88ef4bbba035",
  pageTypeSlug: "finding",
  slug: "the-query-link-dies-while-every-query-page-it-names-is-there",
  domainSlug: "workspace-package/readout-system",
  claim:
    "No akasha `upkeep-*` readout carries a `querySlug`, and five of the six values readouts carry none, though every query page they would name is already there in akasha. The markdown readouts declare the link. Deleting the markdown destroys the only record of which query answers which reading, leaving every query page there and unreachable.",
  evidence:
    "Measured 2026-09-02 by reading all 15 markdown readouts against all 20 akasha ones, field by field rather than by count.\n\nThe six links the markdown declares and akasha does not carry, from `readouts/readout/upkeep-*.readout.md`:\nupkeep-safety names `safety-level-on-day` with `query-key: safety-level`\nupkeep-surplus names `surplus-hours-on-day`\nupkeep-capacity names `session-capacity-on-day`\nupkeep-plants names `food-entry-plants-since-waking`\nupkeep-activity names `activity-calories-on-day`\nupkeep-sleep names `sleep-hours-on-day`\n\nEach of those six is there in akasha at `akasha/pages-system/page-queries/pages/<slug>.page-query.ts`, so the queries survive the deletion and only the edge dies. Safety is the only one of the six carrying a query key.\n\nThe values six differ in kind. `akasha/readout-system/readouts/pages/faith/faith.readout.ts:16-18` carries `querySlug: value-green-day-units-on-day`, `queryKey: faith` and `queryArgument: value`. love, health, learn, fun and wealth carry none of the three, though the query page exists and each key would be that readout's own slug. Those five were never in the markdown readout tree, being instead `alan/value/*.value.md`, so the markdown holds no link for them either, and theirs is missing rather than about to be lost.\n\nAll 13 markdown query pages under `readouts/query/` have akasha twins, so no query page is at risk. The loss is confined to the readout-to-query edge.",
} as const satisfies Finding
