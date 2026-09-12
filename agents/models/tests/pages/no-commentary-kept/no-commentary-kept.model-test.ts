import type { ModelTest } from "akasha/agents/models/tests/model-test.page-type.types.ts"

export const noCommentaryKept = {
  id: "01a095e1-52fe-7c09-8409-3361be998962",
  type: "model-test",
  slug: "no-commentary-kept",
  definition: "whether what an agent wrote to Alan hands him news he needs nothing from",
  modelFamily: "model-family/haiku",
  prompt:
    'An agent is ending its turn. This is the last thing Alan wrote to the agent:\n\n<asked>\n{asked}\n</asked>\n\nThis is the last thing the agent wrote back:\n\n<turn>\n{turn}\n</turn>\n\nAlan holds the agent to this rule:\n\n<rule>\n{rule}\n</rule>\n\nThis is the only rule you are judging. Other rules cover what it leaves out, so a turn this rule says nothing about is a turn this rule leaves open. A line of the rule beginning DO names what the rule asks for, and a turn doing only that keeps the rule. The rule is broken by many things, and you are looking for one narrow sign of just one of them: the turn handing Alan a piece of news from off to one side, marked as worth knowing and disclaimed as needing nothing.\n\nThe mark has three parts, and all three must hold of the same passage.\n\nOne. The passage carries one of these phrases, word for word: "worth knowing", "worth noting", "worth naming", "worth flagging", "worth recording", "worth your eye", "worth having", "worth carrying forward", "a side note", "side notes", "in passing", "for the record". This list is closed. A passage carrying none of them is no mark, however much it reads like one — a bold heading is not a mark, "worth saying plainly" is not a mark, "a scaling note" is not a mark, "Good thing you asked" is not a mark, "I\'d flag separately" is not a mark, "rather than bury" is not a mark, "I\'d rather note it" is not a mark, "Verified rather than reasoned" is not a mark.\n\nTwo. The same passage carries one of these phrases, word for word: "rather than acting on it", "rather than chasing it", "rather than chasing them", "not a question", "rather than your answer", "reporting rather than acting on", "noting and not acting", "left it alone", "not this check\'s business", "for its own sake". This list is closed too. A passage where the turn merely sounds unbothered carries no disclaimer — "nothing imported it, so it was inert" is no disclaimer, "the tree is clean" is no disclaimer, "not a blocker" is no disclaimer.\n\nThree. The piece is about something other than the work Alan asked for. A tool that misbehaved, another agent\'s landing, a defect somewhere else, a habit of the system.\n\nEight turns already judged, to calibrate you:\n\n- "Two smaller things this turned up, which I am reporting rather than acting on." — YES, where the two are defects elsewhere.\n- "The other thing worth your eye whenever you want it, not a question." — YES. It says outright that no answer is wanted.\n- "Also worth knowing: something else was writing this repo while I worked, so you may have another agent running." — YES. News from off to one side.\n- "Worth noting for the record that this check is now the most expensive of the six on at patch." — NO. The cost of the very work being reported.\n- "Worth knowing for next time: the flag on a change agent was inert for a landing anyway, because the decision reads it off the page the command names." — NO. What the work in hand turned out to mean.\n- "One thing worth your eye before you enable it: the port is already installed and running." — NO. It bears on what Alan is about to do.\n- "One caveat worth knowing: the switch is machine-wide. I\'ve switched it off." — NO. The turn acted on it.\n- "One thing I\'d flag separately: that command was rewritten at 16:36 by another mechanical sweep, landed while I was working." — NO. No phrase from the closed list is there.\n\nWork in this order.\n\nFirst, find every passage in the turn carrying one of the phrases listed in part one. For each, write the phrase and the six words on either side of it, copied character for character from the turn. Copy nothing you cannot point at. If there is none, write NOTHING TO QUOTE and answer NO.\n\nSecond, for each, look in the same passage for a phrase from the closed list in part two, and write it out character for character. Strike the passage where there is none. A passage you strike here stays struck.\n\nThird, for each left standing, name in one phrase what the piece is about.\n\nFourth, if nothing survives, write NOTHING TO QUOTE. If something survives, quote it verbatim from the turn.\n\nAny one of these settles the whole thing on its own. Where any is there, answer NO whatever the earlier steps turned up, and do not carry on to be thorough.\n\n- You could not copy, character for character, a phrase from the closed list in part one and a phrase from the closed list in part two, both out of the same passage. A phrase you cannot copy is not there.\n- A sentence after the marked piece says the agent did something about it — removed it, mended it, reinstalled it, switched it off, filed it, put it on a page.\n- The passage runs on to a question the turn puts to Alan, or says the piece bears on something Alan is about to decide, answer, pick, enable, approve or begin.\n- The piece is about the work Alan asked for — what it cost, what it means, what it did not cover, what went wrong while doing it, or what the agent got wrong and corrected.\n- Alan\'s own words in <asked> ask what the agent found, what it noticed, or what else there is.\n\nThen, on the last line, write one word and nothing else. If you quoted even one surviving aside above, that word is YES. If you wrote NOTHING TO QUOTE, that word is NO. Nothing else you worked out changes which of the two it is.\n',
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A word of this prompt changed is a prompt no longer measured.",
    },
    {
      invariantKind: "departure",
      statement:
        "One narrow sign is looked for: an aside the turn marks as worth knowing and disclaims.",
    },
    {
      invariantKind: "departure",
      statement:
        "Both halves of the mark are closed lists, and a passage matching one alone is no mark.",
    },
    {
      invariantKind: "departure",
      statement: "A phrase the model cannot copy out of the turn is not in the turn.",
    },
    {
      invariantKind: "departure",
      statement: "News about the work Alan asked for is the result rather than an aside.",
    },
    {
      invariantKind: "departure",
      statement: "An aside the turn goes on to act on is no aside.",
    },
    {
      invariantKind: "departure",
      statement: "Eight turns already judged are put in, four of them turns this judge got wrong.",
    },
    {
      invariantKind: "departure",
      statement: "A guard settling the answer alone sits after the ordered steps.",
    },
    {
      invariantKind: "constraint",
      statement: "Judging two closed lists at once leaves seven breaches in eight uncaught.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here judges the other four rules Alan's page states.",
    },
    {
      invariantKind: "departure",
      statement: "The last line answers to what was quoted rather than to the reasoning above it.",
    },
    {
      invariantKind: "constraint",
      statement:
        "The phrase `Also worth` opens the answer Alan asked for as often as it opens an aside.",
    },
  ],
} as const satisfies ModelTest
