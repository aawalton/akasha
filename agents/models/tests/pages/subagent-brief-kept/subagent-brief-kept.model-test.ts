import type { ModelTest } from "akasha/agents/models/tests/model-test.page-type.types.ts"

export const subagentBriefKept = {
  id: "01a09613-e94f-79a9-a2f4-a13093bf1fef",
  type: "model-test",
  slug: "subagent-brief-kept",
  definition: "whether what an agent wrote to Alan repeats the briefing it gave a helper",
  modelFamily: "model-family/haiku",
  prompt:
    'An agent is ending its turn. This is the last thing Alan wrote to the agent:\n\n<asked>\n{asked}\n</asked>\n\nThis is the last thing the agent wrote back:\n\n<turn>\n{turn}\n</turn>\n\nAlan holds the agent to this rule:\n\n<rule>\n{rule}\n</rule>\n\nThis is the only rule you are judging. Other rules cover what it leaves out, so a turn this rule says nothing about is a turn this rule leaves open. A line of the rule beginning DO names what the rule asks for, and a turn doing only that keeps the rule. The rule is broken by many things, and you are looking for one narrow sign of just one of them: the turn telling Alan what it told a helper.\n\nThe sign has two halves, and both must hold.\n\nOne. The helper is another agent the turn sent out — a subagent, a delegate, a lane, "someone", "the agent I sent". A program is no helper here: a watcher, a timer, a poller, a sweep, a survey, a script, a service, a pilot run and a check are all machinery rather than someone told something.\n\nTwo. The sentence says, in the past tense, what this agent already told, asked or instructed that helper to do. A telling still to come is not this sign, and neither is what a helper will do once it starts. Nor is a piece of code telling something: only one agent briefing another counts. "I\'ve told it to answer what would have to absorb the work." "I asked for its proposed shape first." "I\'ve sent someone to find out whether that is a third defect." "Dispatched, with the one claim I care about made explicit." "I told it the rule that matters." "For the lint I set an explicit exit."\n\nSaying only that a helper is running, is still out, has finished, or came back is not this sign. Neither is the bare word that work was delegated, dispatched or handed off. Those keep the rule here, whatever else may be true of them.\n\nEight turns already judged, to calibrate you:\n\n- "The build one will come back to me before it builds anything — I asked for its proposed shape first." — YES. What the helper was told.\n- "Relayed — I\'ve told it to answer what would have to absorb the work if the page type goes." — YES.\n- "Dispatched, with the one claim I care about made explicit: it has to run the real build." — YES.\n- "An agent is still out, adding the `measured` record property and recording check one\'s figures." — NO. What a helper is doing, not what it was told.\n- "I\'ll tell the investigator, since I sent it the opposite." — NO. A telling still to come.\n- "It will move the unlanded edits onto the seat\'s buckets, then let the page go." — NO. What a helper will do once it starts.\n- "The survey agent finished; its ten were `syntax-bundle` and its neighbours." — NO. That a helper reported.\n- "Delegated. May I take `experimental: true` off that check once its three known false positives land?" — NO. The bare word of a delegation.\n\nWork in this order.\n\nFirst, find every sentence in the turn saying what a helper was told, asked or instructed to do. Quote each one.\n\nSecond, for each, check the helper is another agent rather than a program. Strike it where a watcher, a timer, a sweep, a survey, a script, a service, a pilot run or a check is what was set going.\n\nThird, strike it where the sentence says only that a helper is running, is still out, has finished, or came back.\n\nFourth, if nothing survives, write NOTHING TO QUOTE. If something survives, quote it verbatim from the turn.\n\nAny one of these settles the whole thing on its own. Where any is there, answer NO whatever the earlier steps turned up, and do not carry on to be thorough.\n\n- The turn sent out no other agent at all.\n- Every telling you found is still to come, rather than one this agent has already made.\n- The only mention is the bare word that work was delegated, dispatched or handed off.\n- Alan\'s own words in <asked> ask what a helper was told, or ask the agent to brief one.\n\nThen, on the last line, write one word and nothing else. If you quoted even one surviving sentence above, that word is YES. If you wrote NOTHING TO QUOTE, that word is NO. Nothing else you worked out changes which of the two it is.\n',
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A word of this prompt changed is a prompt no longer measured.",
    },
    {
      invariantKind: "departure",
      statement: "The one sign looked for is the turn repeating what it told a helper.",
    },
    {
      invariantKind: "departure",
      statement: "A helper is another agent rather than a watcher, a sweep or any other machinery.",
    },
    {
      invariantKind: "departure",
      statement: "A briefing still to come is no briefing given.",
    },
    {
      invariantKind: "departure",
      statement: "Saying a helper is running, is out, or came back is no briefing repeated.",
    },
    {
      invariantKind: "departure",
      statement: "The last line answers to what was quoted rather than to the reasoning above it.",
    },
    {
      invariantKind: "departure",
      statement: "Eight turns already judged are put in, three of them turns this judge got wrong.",
    },
    {
      invariantKind: "departure",
      statement: "This judges the rule the third test here judges, by another sign.",
    },
    {
      invariantKind: "constraint",
      statement: "One sign of a rule broken many ways leaves five breaches in six uncaught.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here weighs what the helper came back with.",
    },
  ],
} as const satisfies ModelTest
