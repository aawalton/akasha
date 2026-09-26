import type { ModelTest } from "akasha/agent/model/test/model-test.page-type.types.ts"

export const needsAttention = {
  id: "01a0def1-ca9e-7a5d-9b8c-f535ae347bd9",
  type: "page-type/model-test",
  slug: "needs-attention",
  definition: "whether what an agent wrote to Alan asks him for something before it goes on",
  modelFamily: "model-family/haiku",
  prompt:
    'An agent is ending its turn. This is the last thing Alan wrote to the agent:\n\n<asked>\n{asked}\n</asked>\n\nThis is the last thing the agent wrote back:\n\n<turn>\n{turn}\n</turn>\n\nYou are deciding one thing: does the turn leave Alan something to answer or to do before the agent goes on?\n\nIt does where the turn, anywhere in it and most often in its last lines:\n\n- asks Alan a question, a yes-or-no one such as "Shall I go on?" included, or asks which of some options he wants;\n- asks for his approval;\n- asks him to do something himself, such as running something on his own machine, looking at a screen, or signing in;\n- reminds him that something it asked him before is still unanswered.\n\nThe one reading the turn is Alan, so a question in the turn is put to him unless the turn itself shows otherwise.\n\nIt does not where the turn only tells him things: a report of finished work, however long, an answer to what he asked, or what the agent will do next. A report coming first does not cancel a question coming after it.\n\nFour things look like questions and are not put to Alan:\n\n1. a question the turn answers itself in the words right after it, or one the agent says it will find out for itself, such as "Now the real test — does it still work?";\n2. a question inside quotation marks or inside a log;\n3. a heading line, one opening with #, and a sentence not opening with # is no heading;\n4. a question the turn says was put to another agent or to a program.\n\nAn offer the agent does not wait on, such as "say if you want it narrowed", asks nothing either.\n\nWork in this order.\n\nFirst, read the turn to its last line. Copy out every sentence ending in a question mark and every sentence asking Alan to do something, verbatim, one to a line. If there is none, write NOTHING TO QUOTE.\n\nSecond, under each sentence copied, write STRUCK and its number where it is one of the four, and KEPT otherwise.\n\nThen, on the last line, write YES if any sentence is KEPT and NO if none is.\n',
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
    {
      decisionKind: "decision-kind/departure",
      statement: "A question in a turn is put to Alan unless the turn itself shows otherwise.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "Three runs each kept 34 of the 35 cases, and the one missed asks Alan about this test's subject.",
    },
  ],
} as const satisfies ModelTest
