import type { InferenceHook } from "akasha/agents/hooks/agent-hook/inference-hook/inference-hook.page-type.types.ts"

export const keepAlanDirectives = {
  id: "01a090e9-b891-780c-ae1c-408119c382ec",
  type: "inference-hook",
  slug: "keep-alan-directives",
  definition: "the rule a turn breaks put back to the agent before that turn ends",
  code: "ts",
  test: "ts",
  runsAt: ["Stop"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The words judged are the last the agent wrote rather than the whole turn.",
    },
    {
      invariantKind: "departure",
      statement:
        "The rules judged by are the ones the model tests name, and a rule may have more than one test.",
    },
    {
      invariantKind: "departure",
      statement: "A person stating no such rule leaves the turn alone.",
    },
    {
      invariantKind: "departure",
      statement: "What the person last asked for is judged beside the words the agent wrote back.",
    },
    {
      invariantKind: "departure",
      statement: "A tail holding nothing the person asked for is judged as an empty asking.",
    },
    {
      invariantKind: "departure",
      statement: "A seat answering to no person is left alone.",
    },
    {
      invariantKind: "departure",
      statement: "A turn the agent closed without words is left alone.",
    },
    {
      invariantKind: "departure",
      statement: "A stop this refused already is left alone.",
    },
    {
      invariantKind: "departure",
      statement: "Each rule is put to the model on its own.",
    },
    {
      invariantKind: "departure",
      statement: "The first rule answered yes ends the call and the rest are not read.",
    },
    {
      invariantKind: "departure",
      statement: "A yes is the model's last line rather than the model's opening word.",
    },
    {
      invariantKind: "departure",
      statement: "The words put back are the rule's own and nothing else.",
    },
    {
      invariantKind: "departure",
      statement:
        "A model reached by no call leaves the turn unjudged rather than holding that turn open.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here judges a tool call.",
    },
    {
      invariantKind: "gap",
      statement: "A turn held open twice running says so to the person.",
    },
    {
      invariantKind: "departure",
      statement:
        "A turn ending with a subagent or a background command still to report is left alone.",
    },
    {
      invariantKind: "departure",
      statement:
        "A subagent still to report is read from the seat's transcript rather than from a page.",
    },
    {
      invariantKind: "departure",
      statement:
        "Each run records the gate it stopped at, so a turn unjudged is told from one judged.",
    },
    {
      invariantKind: "constraint",
      statement:
        "A seat with a background command open when its turn ends has that turn judged by nothing.",
    },
    {
      invariantKind: "constraint",
      statement:
        "Thirteen runs in twenty reached no model while a bulk measurement ran on the same gateway.",
    },
    {
      invariantKind: "gap",
      statement: "A judge that answered is read even where another judge's call reached no model.",
    },
    {
      invariantKind: "constraint",
      statement:
        "One seat ended all 28 of its turns with a subagent still to report, so none were judged.",
    },
    {
      invariantKind: "departure",
      statement:
        "A rule answered yes on is kept beside the test that asked it, turn and answer both.",
    },
    {
      invariantKind: "constraint",
      statement: "Ten runs in ten reached a model with the gateway otherwise quiet.",
    },
  ],
} as const satisfies InferenceHook
