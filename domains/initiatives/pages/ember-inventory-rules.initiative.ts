import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const emberInventoryRules = {
  id: "01a095cd-5db5-7e4b-ac28-81095f7b5fd3",
  type: "initiative",
  slug: "ember-inventory-rules",
  domain: "domain/temper",
  persona: "ember",
  intents: [
    {
      statement: "A merchant or a banker opens without a wait Alan notices.",
      workingMemory:
        "Alan says the wait predates the batching: optimization, not regression. His v6 trace: open-handler 3559ms, of which judging rules is 3124ms over 1235 runs and building facts only 281ms, so a facts cache is the wrong lever. cf2ac8b stops a run at the first match. Do not cache a slot's verdict across the three runs over the bank: the first locks the slot it judged, so the second must judge it afresh, and a cache would withdraw every lockable item.",
    },
    {
      statement: "A banker stacks what the bags hold that will stack.",
      workingMemory:
        "StackBag(bagId) is the whole of what the game exposes. A visit stacks the backpack and the storage it opened, both bank bags where Alan subscribes, and a bank closed early stacks too. e14fb69 waits for the moves to arrive first: the settle watched only the source shrinking, so StackBag could run before the items reached the backpack, once, with nothing retrying it. bfcfbfd counts partial stacks either side of each call, so whether StackBag reaches a bank bag after close is now answerable.",
    },
    {
      statement:
        "A visit to the banker moves every item the rules send there, however many there are.",
      workingMemory:
        "Alan asked for fifty moves every five seconds. fa24233 makes the cooldown mean that: a cap on moves sent per window rather than one batch per window, so re-sending a straggler no longer waits out a window it does not fill. Calling a move failed is its own shorter deadline, so four attempts cost six seconds rather than twenty. Moves confirm one at a time as their updates arrive, so one laggard no longer denies the rest their early settle. 34ec9ce says what each settle round cost.",
    },
    {
      statement: "An Experience Commendation the character carries reaches the bank.",
      workingMemory:
        "Alan handed the link for Major Experience Commendation (224714, scrolls) and asked for Move to Bank for now. fe8bd926 is that rule: scrolls whose name holds `commendation`, non-stolen, to bank, and the batched upsert in 1007046f let `rule reorder` place it at 34, ahead of 263273e9 which takes every non-stolen scroll. 298663dd narrows the automation cascade from `experience` to `experience scroll`. Left: Alan to reload and confirm.",
    },
  ],
  constraints: [
    "The rules are compiled outside the game, so a fix reaches the game only once the addon is built and deployed.",
    "Alan plays on this workstation, so a capture gains a field only after he next plays.",
  ],
} as const satisfies Initiative
