import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const turnAdvancing = {
  id: "01a1022f-b5dc-7b0c-91af-b84b4c92f314",
  type: "page-type/module",
  slug: "turn-advancing",
  definition: "how one advance moves a played turn or written chapter from one status to the next",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Only the seat whose role the turn's status names advances the turn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An advance hands in what its own step makes and nothing else.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A game master's advance goes to mechanics, or to writer with no mechanics seat.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement:
        "A game master's mend keeps every step's part of the beats before its first moved one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A beat moved where its event, time, place, or who comes and goes differs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A mend moving a beat clears who recorded the turn, so each recorder runs again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A mend moving no beat reruns only the mechanics seats, and those only where their issues stand.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A turn holding reviewer issues goes to its writer after mechanics, prose or none.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "After the prose a turn goes to recorders, then to reviewers, then to player.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The writer's advance on a turn its mechanics never ran on goes to mechanics.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only the recorders run after the prose are needed to finish a turn at recorders.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The recorder completing the set moves the turn to reviewers, or to player once reviewed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A memory recorder's memory is merged in beat order with the turn's memory so far.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A picture recorder's pictures replace the chapter's pictures whole.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A reviewer's issues replace the ones it raised before, in the file beside the turn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The reviewer completing the set moves the turn on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn the last reviewer finds issues in goes to game-master.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "After a mend only the reviewers whose issues stand review again, until none is left.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn moving to player leaves no issue file beside it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A clean review of a turn its recorders never ran on sends it to recorders.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "A reviewed turn with no prose yet goes to writer rather than recorders.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every seat outlives its advance, a reviewer's and a recorder's as the writer's does.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Each recorder's advance lands the edits that recorder drafted, with its own move.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal names a beat or an issue by its place, and never quotes it.",
    },
  ],
} as const satisfies Module
