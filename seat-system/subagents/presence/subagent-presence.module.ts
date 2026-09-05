import type { Module } from "@akasha/code-system/module"

export const subagentPresence = {
  id: "01a0598f-18dd-77f7-94be-779f0df14af9",
  pageTypeSlug: "module",
  slug: "subagent-presence",
  definition: "a subagent's page put up while it works and taken away when it is done",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A subagent's page is landed by a program rather than by an agent.",
    },
    {
      invariantKind: "departure",
      statement: "A landing here owes no reading and runs no check.",
    },
    {
      invariantKind: "departure",
      statement: "A landing outlives the call that asked for the landing.",
    },
    {
      invariantKind: "departure",
      statement: "A page states no id.",
    },
    {
      invariantKind: "departure",
      statement: "What lands a page mints the id the page keeps.",
    },
    {
      invariantKind: "departure",
      statement: "A root is carried in the call rather than read off the code's own path.",
    },
    {
      invariantKind: "departure",
      statement: "A seat the index carries no page for writes nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A page states the assignment its seat states.",
    },
    {
      invariantKind: "departure",
      statement: "A seat stating no assignment writes nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A call that wrote nothing answers why rather than answering that it did not.",
    },
    {
      invariantKind: "departure",
      statement: "The reason a landing refused is the reason that call answers with.",
    },
    {
      invariantKind: "departure",
      statement: "What the program left to finish says goes to a log named for this module.",
    },
    {
      invariantKind: "departure",
      statement: "That log is in the seat's own folder beside the seat's supervisor log.",
    },
    {
      invariantKind: "departure",
      statement: "The seat whose folder holds that log is named by the id the call carries.",
    },
    {
      invariantKind: "departure",
      statement: "A log that will not open leaves the landing asked for and its output dropped.",
    },
    {
      invariantKind: "departure",
      statement: "A page states the agent id the subagent acts under.",
    },
    {
      invariantKind: "departure",
      statement: "The seat's id reaches here in the call rather than being read back from a name.",
    },
    {
      invariantKind: "departure",
      statement: "A call to write that carries no seat id writes nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A page already there is left as it is.",
    },
    {
      invariantKind: "departure",
      statement: "A page that is not there is taken away by doing nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A patch a subagent drafted into goes to the seat that dispatched that subagent.",
    },
    {
      invariantKind: "departure",
      statement: "A patch is taken in before the page beside that patch goes.",
    },
    {
      invariantKind: "departure",
      statement: "The commit taking that page away says the patch went to the seat.",
    },
    {
      invariantKind: "departure",
      statement: "The commit taking that page away names the seat.",
    },
    {
      invariantKind: "departure",
      statement: "A page whose patch went nowhere is taken away with no seat named.",
    },
    {
      invariantKind: "departure",
      statement: "A sweep finds a patch by the patch file rather than by the page.",
    },
    {
      invariantKind: "departure",
      statement: "A patch whose page went before this sweep is taken in like any other.",
    },
    {
      invariantKind: "departure",
      statement: "A seat with no page of its own takes in nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A take-in that throws leaves that patch alone and reaps the page still.",
    },
  ],
} as const satisfies Module
