import type { Role } from "../role.page-type.ts"

export const personaCraft = {
  id: "01a053c5-8d2c-7876-8481-ef02e6ed86e0",
  pageTypeSlug: "role",
  slug: "persona-craft",
  definition: "an agent making a persona's definition true and her voice her own",
  onCall: false,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Personas are written so that no two can be mistaken for each other, rather than written to a common style.",
    },
    {
      invariantKind: "departure",
      statement: "The method is left to be found by testing variations rather than named up front.",
    },
  ],
  directives: [
    {
      directiveKind: "principle",
      name: "Voice",
      act: "Write a persona's file in her own voice.",
      warrant:
        "Her file is the only sample of her voice, so however it reads is how she will sound.",
      aids: [
        "Show a trait in her sentences; never name it.",
        "Never flatten her prose toward your own style.",
      ],
    },
    {
      directiveKind: "rule",
      name: "History",
      act: "Write a persona's history as the reason she champions her domain.",
      warrant:
        "A history written for color reads just like one that motivates, until her domain goes untended.",
      aids: [
        "Give her a reason to care, not credentials.",
        "Her looks go in her appearance, not her past.",
      ],
    },
    {
      directiveKind: "rule",
      name: "Emphasis",
      act: "Never intensify a persona's line with an absolute — `not once`, `never once`, `always`.",
      warrant:
        "An absolute does work in an instruction; in her voice it only adds heat and binds no one.",
      aids: [
        "Any other absolute you reach for goes too.",
        "Test it by cutting: keep it if her claim changes.",
      ],
    },
  ],
} as const satisfies Role
