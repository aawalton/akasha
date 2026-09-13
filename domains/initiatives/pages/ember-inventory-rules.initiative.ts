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
        "Optimization, not regression. cf2ac8b stops a rule run at the first match and took the open handler from 3559ms to about 950ms. What is left divides as scanBankBags 50ms, the item browser refresh 208-403ms, and the withdraw phase 470-585ms, which judges every bank item to withdraw none. Never cache a slot's verdict across the three runs over the bank: the first locks the slot it judged, so the second must judge it afresh, and a cache would withdraw every lockable item.",
    },
    {
      statement: "A banker stacks what the bags hold that will stack.",
      workingMemory:
        "StackBag(bagId) is the whole of what the game exposes. A visit stacks the backpack and the storage it opened, both bank bags where Alan subscribes, and a bank closed early stacks too. e14fb69 waits for the moves to arrive first, and Alan's trace shows that working: backpack 24 to 21 on an aborted close. StackBag does reach a bank bag after the bank shuts, bag 2 going 50 to 49 on that close and bag 6 going 46 to 45 on a later one, so the call stays and nothing here is left open.",
    },
    {
      statement:
        "A visit to the banker moves every item the rules send there, however many there are.",
      workingMemory:
        "The game allows a hundred stack moves per ten seconds across withdrawals and deposits together; Alan's fifty-every-five was a halving of that, taken when he had forgotten moves go both ways. b81c289 spends the real budget over a sliding ten seconds, and counts what was sent so a straggler sent again spends again. A batch of 26 confirmed 23, then retried the same 3 over three rounds, confirming none, and aborted at 5096ms. Reopening the bank moved both stragglers at once.",
    },
    {
      statement: "An Experience Commendation the character carries reaches the bank.",
      workingMemory:
        "Alan handed the link for Major Experience Commendation (224714, scrolls) and asked for Move to Bank for now. fe8bd926 is that rule: scrolls whose name holds `commendation`, non-stolen, to bank. explain read against the game's own compiled config matches it at index 40, ahead of 263273e9, which takes every other scroll to house storage, so the rule is live in Alan's client. 298663dd narrows the cascade that had claimed it. Left: watch one reach the bank in play.",
    },
  ],
  constraints: [
    "The rules are compiled outside the game, so a fix reaches the game only once the addon is built and deployed.",
    "Alan plays on this workstation, so a capture gains a field only after he next plays.",
  ],
} as const satisfies Initiative
