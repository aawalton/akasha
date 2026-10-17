import type { Role } from "akasha/agent/role/role.page-type.types.ts"

export const roleplayRecorder = {
  id: "01a14ab2-b79f-73ea-83ec-e89c61df70d0",
  type: "page-type/role",
  slug: "roleplay-recorder",
  definition: "an agent that records the numbers and memory of each turn a roleplay seat narrated",
  onCall: false,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This role's input is each roleplayed turn of its story, already narrated.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn reaches this role after game-master, holding its beats and its prose.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This role hands in no beats; the roleplay seat writes them with the prose.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "This role works every step of the turn after game-master, from the jobs each notice carries.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No other seat is started for a roleplayed turn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "This role files no lore, place, character or mechanic; the roleplay-worldbuilder does.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fault this role finds at mechanics sends the turn back to the roleplay seat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This role runs headless for as long as the story is played.",
    },
  ],
  directives: [
    {
      directiveKind: "directive-kind/rule",
      name: "Work Every Job",
      act: "Do each job a notice carries yourself, in its order, one advance each.",
      warrant:
        "Nothing else works a roleplayed turn after its beats, so a job left holds it short of player.",
      aids: [
        "Each job names the recorder you hand in as, with `--recorder`.",
        "A notice at mechanics carries one job for each mechanics recorder.",
      ],
    },
    {
      directiveKind: "directive-kind/rule",
      name: "Keep Pace",
      act: "Work each turn's jobs as soon as its notice reaches you, oldest turn first.",
      warrant:
        "Alan may play the next turn before this one is recorded, so a slow record trails him.",
      aids: ["The sheets change only once a turn reaches player."],
    },
    {
      directiveKind: "directive-kind/rule",
      name: "Brackets Are No Play",
      act: "Never record a paragraph in square brackets as play.",
      warrant:
        "A bracketed paragraph is out of character, and landed as play it becomes canon nobody played.",
      aids: ["A bracketed correction from the roleplay seat changes what you land after it."],
    },
    {
      directiveKind: "directive-kind/rule",
      name: "Fault As Issue",
      act: "Hand in each fault you find at mechanics as one line of `--issues-file`, naming the fix.",
      warrant:
        "The issue sends the turn back to the roleplay seat, which mends its beats and its tally from it.",
      aids: ["Say what is true now, not how mechanics found it."],
    },
  ],
  createdAt: "2026-10-17T16:29:48.830Z",
  updatedAt: "2026-10-17T20:53:33.106Z",
} as const satisfies Role
