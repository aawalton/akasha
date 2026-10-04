import type { Role } from "akasha/agent/role/role.page-type.types.ts"

export const reviewer = {
  id: "01a0debc-6738-73fb-9f06-f8d1967f9d96",
  type: "page-type/role",
  slug: "reviewer",
  definition: "an agent that checks one turn or written chapter and what was recorded of it",
  onCall: true,
  directives: [
    {
      directiveKind: "directive-kind/rule",
      name: "Never End On Words",
      act: "Keep working until your advance has landed; words naming the next read do not read it.",
      warrant:
        "A stage seat that ends its turn in words is idle, and the turn it holds waits on nothing.",
      aids: [
        "Every output of yours is a tool call until the advance lands.",
        "Where you cannot finish, send the game master the refusal and advance when it answers.",
      ],
    },
  ],
} as const satisfies Role
