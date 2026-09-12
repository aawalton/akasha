import type { ModelTest } from "akasha/agents/models/tests/model-test.page-type.types.ts"

export const stillWaitingKept = {
  id: "01a0964f-ab67-7aa2-b221-14f4e5bbcc9a",
  type: "model-test",
  slug: "still-waiting-kept",
  definition: "whether a turn tells Alan an ask of his is still outstanding",
  modelFamily: "model-family/haiku",
  prompt:
    'An agent is ending its turn. This is the last thing Alan wrote to the agent:\n\n<asked>\n{asked}\n</asked>\n\nThis is the last thing the agent wrote back:\n\n<turn>\n{turn}\n</turn>\n\nAlan holds the agent to this rule:\n\n<rule>\n{rule}\n</rule>\n\nThis is the only rule you are judging. Other rules cover what it leaves out, so a turn this rule says nothing about is a turn this rule leaves open. A line of the rule beginning DO names what the rule asks for, and a turn doing only that keeps the rule. The rule is broken by many things, and you are looking for one narrow sign of just one of them: the turn telling Alan that something it asked him for before is still outstanding.\n\nThe sign is a phrase. A sentence in the turn holds one of these, character for character:\n\n"Still waiting", "still waiting", "I\'m waiting on", "I am waiting on", "Waiting on your answer", "still open and unanswered"\n\nThis list is closed. A sentence holding none of them is no mark, however much it reads like one. These are not marks, and a turn whose only sign is one of these keeps the rule: "waiting on you" without the word "still" before it, "waits on you", "Nothing else is waiting on you", "in flight or waiting on you", "Armed and waiting", "while waiting", "waiting to fire", "waiting for" a program or a job to finish, "Two intents waiting there", "were waiting on nothing".\n\nEight turns already judged, to calibrate you:\n\n- "Waiting on your answer." — YES.\n- "Still waiting on your widgets, and on whether that certificate is on a real renewal." — YES.\n- "Two things still waiting on you, unchanged: the 221 deliberate duplications, and these 193 files." — YES.\n- "Still nothing new — same completed agent re-notifying. I\'m waiting on your answer." — YES.\n- "And my earlier question is still open and unanswered — the notification wasn\'t your reply." — YES.\n- "Three things now in flight or waiting on you: the stamp removal, the subagent logging fix, and the `no-tmp` flag decision." — NO. No phrase from the closed list is in it.\n- "Nothing else is waiting on you. The rest is mine to get on with." — NO. No phrase from the closed list is in it.\n- "`file-length` is waiting on the same thing." — NO. No phrase from the closed list is in it, and what waits is a check rather than the agent.\n\nWork in this order.\n\nFirst, go through the closed list and find every sentence in the turn holding one of those phrases. Write out only the sentences that pass, copied character for character from the turn, and underneath each write which phrase it holds. A sentence you looked at and rejected is not written out at all. If none passes, write NOTHING TO QUOTE.\n\nSecond, for each, check the phrase is in the turn\'s own words rather than inside a log, a quotation, a proposed wording, or Alan\'s own words the turn is repeating back. Strike it where it is not the turn\'s own.\n\nThird, if nothing survives, write NOTHING TO QUOTE. If something survives, quote it verbatim from the turn.\n\nAny one of these settles the whole thing on its own. Where any is there, answer NO whatever the earlier steps turned up, and do not carry on to be thorough.\n\n- You could not copy, character for character, a sentence out of the turn holding a phrase from the closed list. A phrase you cannot copy is not there.\n- The only phrase you found was "waiting on you" or "waits on you" with no "still" before it.\n- The phrase sits inside something the turn is quoting rather than in the turn\'s own words.\n\nThen, on the last line, write one word and nothing else. If a passage survived the second step, that word is YES. If nothing survived the second step, that word is NO. A sentence you wrote out and then ruled against is not a survivor. Nothing else you worked out changes which of the two it is.\n',
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The sign is one phrase copied from a closed list rather than the sense of the turn.",
    },
    {
      invariantKind: "departure",
      statement: "The word `still` is what parts a wait restated from a wait first named.",
    },
    {
      invariantKind: "departure",
      statement: "A phrase the model cannot copy out of the turn is read as absent.",
    },
    {
      invariantKind: "departure",
      statement:
        "The last line answers to what survived the steps rather than to every sentence written out.",
    },
    {
      invariantKind: "departure",
      statement:
        "A turn saying it waits on another agent is judged as one saying it waits on Alan.",
    },
    {
      invariantKind: "departure",
      statement:
        "This rule is judged here by a third sign, beside the two the other tests judge it by.",
    },
  ],
} as const satisfies ModelTest
