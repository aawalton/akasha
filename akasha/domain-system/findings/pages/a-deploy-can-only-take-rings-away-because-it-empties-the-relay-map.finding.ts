import type { Finding } from "../finding.page-type.ts"

export const aDeployCanOnlyTakeRingsAwayBecauseItEmptiesTheRelayMap = {
  id: "01a0624d-f738-7910-b3ee-a3ef50d66415",
  pageTypeSlug: "finding",
  slug: "a-deploy-can-only-take-rings-away-because-it-empties-the-relay-map",
  domainSlug: "domain/alan-harness",
  claim:
    "A deploy cannot make a stoplight ring appear, and can only take rings away. `relayedFresh` is an in-memory map in the serving pod, so restarting that pod empties it and every ring goes dark until the relay timers fire again. The readout pages a ring needs are read from the store, which answers off the workstation checkout, so they reach every pod the moment they are committed and indexed rather than when anything is deployed.",
  evidence:
    "`readout-group-serving.module.code.ts:84` asks the store for the readouts of a group and `:40` asks it for the scale, both through `askingFor`. Those are the only page reads in `/api/habit-stoplights`. The gate is `relayedFresh(slug)` at `:63`: where it answers null, `stoplightOf` returns null and no ring is built.\n\nThe four upkeep readout pages were committed between 06:48:49 and 06:56:01 on 2026-09-02, their scales in the same commits. `d40f2c9483` was committed at 07:03:37 and the pod restarted about 07:02, so every page was live to the store before the deploy existed. Asked now, the store answers all four scales and six upkeep readouts.\n\nThe version live before that deploy, `74cf05b4e6` of 06:10, already held `4c1f05a264`, `63db1f8b8b` and `a0ee83f004` of 2026-09-01 16:26 to 16:44 as ancestors, so it read pages through the service too. The one change that deploy made to the serving code is the wire-key parameter: `{habit: wireKey}` became `{[wireKeyName]: wireKey}` with `habit` as the default, so `/api/habit-stoplights` emits the same key on either side of it.\n\nConfirmed at both ends: three relay timers were installed between 06:50 and 07:10, activity had none until 07:18, and the five rings seen before that install were the five with relays while activity alone was dark.\n\nThis replaces a reading in which the deploy was what made four newly-landed readouts visible. The deploy moved no page and changed no page road. It emptied the relay map, and the timers refilled it.",
} as const satisfies Finding
