import type { ModelTest } from "akasha/agents/models/tests/model-test.page-type.types.ts"

export const oneAtATimeKept = {
  id: "01a095c1-8b61-745a-ae86-a789c9b85df7",
  type: "model-test",
  slug: "one-at-a-time-kept",
  definition: "whether what an agent wrote to Alan puts more than one thing on him at once",
  modelFamily: "model-family/haiku",
  prompt:
    'An agent is ending its turn. This is the last thing Alan wrote to the agent:\n\n<asked>\n{asked}\n</asked>\n\nThis is the last thing the agent wrote back:\n\n<turn>\n{turn}\n</turn>\n\nAlan holds the agent to this rule:\n\n<rule>\n{rule}\n</rule>\n\nThis is the only rule you are judging. Other rules cover what it leaves out, so a turn this rule says nothing about is a turn this rule leaves open. The rule is broken only by a turn that puts more than one thing on Alan, and you are looking for one narrow sign of that: the turn announcing, in its own words, that it wants more than one thing from him.\n\nThat announcement looks like "Two questions", "Two questions before I build it", "Three things I want your eyes on", "Two things I need from you", "Two things need your hands", "Four things want your ruling", "Two decisions are still yours", "Two calls there", "Two things I want a word on", "Two left" — a count of two or more, naming things the turn is handing to Alan.\n\nThe count has to be of things for Alan. A count of anything else is a report, and reports keep the rule:\n\n- A count of what the agent did, found, measured, landed, fixed, or left running. "Two commits landed", "Three things I learned", "Two surveys", "Two things that surprised me", "Three sweeps consolidated".\n- A count of limits on its own work. "Two things I could not fix from here", "Two things I have not verified", "Two things I held back", "Two things this leaves behind" — naming a limit is part of the result, not an ask.\n- A count of options inside one decision. "Two ways to take it", "Three routes", "Two candidates" — choosing among them is one answer.\n- A count of steps in one task Alan performs at one sitting.\n- A count inside a heading, a table, or the agent\'s own plan for what it will do next.\n\nFive turns already judged, to calibrate you:\n\n- "My question: who is running the `partOfCollectionSlugs` migration, and do you want me to take it?" — NO. Two questions in one breath that Alan answers once.\n- "Two things still need doing in-game after a client restart: tick the box, then enable the addon." — NO. Two steps of one sitting of Alan\'s, not two things.\n- "Three things now in flight or waiting on you: the stamp removal, the subagent logging fix, and the `no-tmp` flag decision." — NO. A status line restating what was already asked.\n- "Two questions before I build it: do they want a page type of their own? And is `supervisor-config` an exception?" — YES. Two decisions, two separate answers.\n- "Three things I want your eyes on, not mine." — YES, where the three are each a call for Alan.\n- "May I add `timeout: 900` to `change-draft`? `change-apply` will almost certainly need the same, and I\'d do both at once if you\'re willing." — NO. One approval, extended in the same breath to a second case of the same kind.\n\nWork in this order.\n\nFirst, read <asked>. Where Alan\'s own words end with "Questions?", or ask what the agent needs from him, or hand the agent a numbered list to answer, then everything the turn says back is one thing: write NOTHING TO QUOTE, answer NO, and stop.\n\nSecond, find every place the turn counts things it wants from Alan. Quote each one.\n\nThird, for each, read what the count is of. Strike it where the things counted are anything but questions for Alan to answer, approvals for him to give, or tasks for him to perform himself.\n\nFourth, where a count of two or more survives, check that the turn really does hand Alan that many. Strike it where the turn goes on to ask for only one.\n\nFifth, if no count survives, write NOTHING TO QUOTE. If one survives, quote it and the words asking each thing it counts, copied verbatim from the turn.\n\nOne thing settles it on its own: Alan\'s own words in <asked> asking what the agent needs from him, or ending with "Questions?", or handing the agent a numbered list to answer. Where any of those is there, answer NO whatever the later steps turned up, and do not carry on to be thorough.\n\nThen, on the last line, write YES if you quoted a surviving count and NO if you did not.\n',
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The wording is the wording measured, and a word of it changed costs the precision.",
    },
    {
      invariantKind: "departure",
      statement: "Turns already judged are put to the model with the judgement on each.",
    },
    {
      invariantKind: "departure",
      statement: "One narrow sign is looked for: the turn announcing its own count.",
    },
    {
      invariantKind: "departure",
      statement:
        "A count of what the agent did rather than of what it wants from Alan keeps the rule.",
    },
    {
      invariantKind: "departure",
      statement: "The steps the model works are ordered rather than listed.",
    },
    {
      invariantKind: "departure",
      statement: "A guard sits inside the ordered steps rather than beside them.",
    },
    {
      invariantKind: "departure",
      statement: "What Alan asked for settles the answer alone, and is put again after the steps.",
    },
    {
      invariantKind: "departure",
      statement: "A turn quoted here to calibrate the model is a turn out of the cases.",
    },
    {
      invariantKind: "constraint",
      statement: "Judging one narrow sign leaves two breaches in five uncaught.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here judges a rule other than the one this test's code names.",
    },
  ],
} as const satisfies ModelTest
