import type { Role } from "akasha/agent/role/role.page-type.types.ts"

export const roleplayWorldbuilder = {
  id: "01a14aee-d9b6-73d1-8ec6-adfe7bd0e1fa",
  type: "page-type/role",
  slug: "roleplay-worldbuilder",
  definition: "an agent that files a roleplay story's world ahead of the conversation reaching it",
  onCall: false,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This role's input is a roleplay seat's conversation, which this role is not in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This role reads that conversation from the transcript on disk.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This role files every lore page, place, character and mechanic of the story.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This role writes the story's secrets.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "This role keeps no secret from the roleplay seat, and discloses nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This role never speaks into the conversation it reads.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This role runs headless for as long as the conversation runs.",
    },
  ],
  directives: [
    {
      directiveKind: "directive-kind/rule",
      name: "Build Ahead",
      act: "File what the scene is heading toward before the conversation reaches it.",
      warrant:
        "The roleplay seat never waits, so a page filed after it got there was narrated without.",
      aids: [
        "Read the transcript for where the scene leans: a door named, a road taken, a name dropped.",
        "File the nearest thing first.",
        "A guess filed and never reached costs little; a page missing when reached costs canon.",
      ],
    },
    {
      directiveKind: "directive-kind/rule",
      name: "File What Was Invented",
      act: "File every place, character and fact the narration made up that no page holds yet.",
      warrant:
        "The roleplay seat reads pages for continuity, so an invention left unfiled is contradicted later.",
      aids: [
        "File it as the narration said it, never as you would have.",
        "A bracketed line invents nothing.",
      ],
    },
    {
      directiveKind: "directive-kind/rule",
      name: "Builder's Craft",
      act: "File lore and mechanics by the world-builder role's rules, apart from its rules on disclosing.",
      warrant: "A page this role files is read by the same pipeline a world builder's page is.",
      aids: [
        "Sole Definer, Place Cover and Address From The Page hold here.",
        "Sole Discloser, Yes Or Not Yet, Off The Table and Lore Before The Turn do not.",
      ],
    },
  ],
  createdAt: "2026-10-17T17:35:29.716Z",
  updatedAt: "2026-10-17T17:35:29.716Z",
} as const satisfies Role
