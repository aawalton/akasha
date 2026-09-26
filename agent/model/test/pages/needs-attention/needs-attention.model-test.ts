import type { ModelTest } from "akasha/agent/model/test/model-test.page-type.types.ts"

export const needsAttention = {
  id: "01a0def1-ca9e-7a5d-9b8c-f535ae347bd9",
  type: "page-type/model-test",
  slug: "needs-attention",
  definition: "whether what an agent wrote to Alan asks him for something before it goes on",
  modelFamily: "model-family/haiku",
  prompt:
    'An agent is ending its turn. This is the last thing Alan wrote to the agent:\n\n<asked>\n{asked}\n</asked>\n\nThis is the last thing the agent wrote back:\n\n<turn>\n{turn}\n</turn>\n\nYou are deciding one thing: whether the turn asks Alan for something, so that the agent needs his attention before anything more happens.\n\nA turn asks for Alan\'s attention where it puts any of these to him:\n\n- a question for him to answer, a yes-or-no one such as "Shall I go on?" included;\n- a choice between options for him to make;\n- an approval for him to give;\n- a task only he can do, such as running something on his own machine, looking at a screen, signing in, or telling the agent what he sees;\n- a reminder that something it asked him before is still unanswered.\n\nA turn does not ask for Alan\'s attention where it only tells him things:\n\n- a report of work done, landed, found or measured, however long, that asks him for nothing;\n- an answer to what Alan asked, that asks nothing back;\n- the agent saying what it will do next, or that it is going on;\n- a question the agent puts to itself and answers, or one it puts to a program or to another agent;\n- a question inside a quotation, a log, a heading or a plan rather than put to Alan;\n- an offer made in passing that the agent does not wait on, such as "say if you want it narrowed".\n\nWork in this order.\n\nFirst, quote every sentence where the turn puts a question, a choice, an approval or a task to Alan, copied verbatim from the turn. If there is none, write NOTHING TO QUOTE.\n\nSecond, strike each quote that is one of the things listed as not asking.\n\nThen, on the last line, write YES if a quote survives the second step and NO if none does.\n',
  code: "ts",
  test: "ts",
  cases: "jsonl",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A report of finished work that asks Alan for nothing is not asking for his attention.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What Alan asked for is put to the model beside what the agent wrote back.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No rule of Alan's is put, since this judges an ask rather than a breach.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The model quotes the asking before it answers, and the answer is the last line.",
    },
  ],
} as const satisfies ModelTest
