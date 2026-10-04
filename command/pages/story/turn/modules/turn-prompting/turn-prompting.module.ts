import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const turnPrompting = {
  id: "01a0deca-7611-7c9f-94b0-89aa26759a71",
  type: "page-type/module",
  slug: "turn-prompting",
  definition: "the prompt a reviewer or recorder seat is handed for one job",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A prompt names the turn's path, the seat's job and where its instructions are.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A reviewer's prompt sends the reviewer to the turn's beats, prose and recorded data.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reviewer's prompt has it check each mechanics issue left on the turn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A prompt on a page holding rulings names them and says no ruled-out issue is raised again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reviewer's prompt names the lore in play on the turn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A reviewer's prompt names the mechanic descriptions the turn made new or changed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Whether a reviewer judges those descriptions is said by its instructions alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A prompt names the exact advance the seat calls when it is done.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A recorder's prompt says to draft its edits and never land them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A mechanics seat's prompt says to hand in changes and issues as files, drafting none.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A recorder's prompt names every page the game master already wrote the turn onto.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A prompt sends a refusal the seat cannot mend to the story's game master seat, never to a stop.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A prompt carries no directive, since the seat's role and persona hold those.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A prompt says a turn ended in words has done none of the work those words named.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A prompt says its advance ends the job, and the seat waits for its next job.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A prompt has the seat read every file of its job afresh, never from an earlier job.",
    },
  ],
} as const satisfies Module
