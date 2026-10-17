import type { Role } from "akasha/agent/role/role.page-type.types.ts"

export const roleplayRecorder = {
  id: "01a14ab2-b79f-73ea-83ec-e89c61df70d0",
  type: "page-type/role",
  slug: "roleplay-recorder",
  definition: "an agent that lands the beats of each turn a roleplay seat narrated",
  onCall: false,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This role's input is each roleplayed turn of its story, already narrated.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn reaches this role at game-master, holding Alan's action and the prose.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This role hands in the turn's beats, drawn from that action and that prose.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "This role files no lore, place, character or mechanic; the roleplay-worldbuilder does.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This role sends each fault mechanics finds to the roleplay seat as a correction.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This role runs headless for as long as the story is played.",
    },
  ],
  directives: [
    {
      directiveKind: "directive-kind/rule",
      name: "Beats From The Prose",
      act: "At game-master, hand in beats holding what the turn's action and prose tell, and no more.",
      warrant: "Alan has read the prose already, so a beat it does not hold is canon nobody read.",
      aids: [
        "Hand them in with `akasha story turn advance --turn <turn> --beats-file <file>`.",
        "A notice at game-master after mechanics names its issues: send the fault, then mend.",
        "The prose is never yours to change.",
      ],
    },
    {
      directiveKind: "directive-kind/rule",
      name: "Keep Pace",
      act: "Hand in each turn's beats as soon as its notice reaches you, oldest turn first.",
      warrant:
        "Alan may play the next turn before this one is recorded, so a slow record trails him.",
      aids: ["The sheets change only once a turn reaches player."],
    },
    {
      directiveKind: "directive-kind/rule",
      name: "Brackets Are No Play",
      act: "Never make a paragraph in square brackets into a beat.",
      warrant:
        "A bracketed paragraph is out of character, and landed as play it becomes canon nobody played.",
      aids: ["A bracketed correction from the roleplay seat changes what you land after it."],
    },
    {
      directiveKind: "directive-kind/rule",
      name: "Send The Fault",
      act: "Send the roleplay seat each fault mechanics finds in a turn you landed, as one line naming the fix.",
      warrant:
        "The roleplay seat narrates from its own tally, so a fault it is not sent is narrated on.",
      aids: [
        "Send with `akasha seat send --to <the roleplay seat>`.",
        "Say what is true now, not how mechanics found it.",
      ],
    },
  ],
  createdAt: "2026-10-17T16:29:48.830Z",
  updatedAt: "2026-10-17T18:03:18.509Z",
} as const satisfies Role
