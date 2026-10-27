import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const gameMasterChecks = {
  id: "01a17f23-4e3a-7054-8bdd-b03cec0e4e5f",
  type: "page-type/domain",
  slug: "game-master-checks",
  definition: "how a game master's turns are settled by its story's checks",
  directives: [
    {
      directiveKind: "directive-kind/rule",
      name: "Difficulty",
      act: "Run each turn at the story's difficulty level: its stance, and no failure worse than its ceiling.",
      warrant: "The player chose how hard the story plays, and can change it between turns.",
      aids: [
        "The level is the `difficulty` on the story's page; a story naming none is at Normal.",
        "Read the level's page afresh each turn.",
        "The engine moves a marked check's roll; never move a roll yourself.",
        "A reward is the same at every level.",
      ],
    },
    {
      directiveKind: "directive-kind/rule",
      name: "Action Difficulty",
      act: "Name each rolled action's difficulty and its situational modifiers, and never its score.",
      warrant: "A number picked to land an outcome reads exactly like one the dice made.",
      aids: [
        "Pick the difficulty from the action-difficulty pages for the task alone, never for who tries it.",
        "The character's skill and the story's difficulty level are the formula's; never weigh them in.",
        "A modifier names a circumstance of this moment, at most three.",
        "Add a recent success only where the character just succeeded at a like action.",
        "Beat the action as its outcome tier's writer instruction says.",
      ],
    },
  ],
  createdAt: "2026-10-27T20:53:02.649Z",
  updatedAt: "2026-10-27T20:53:02.649Z",
} as const satisfies Domain
