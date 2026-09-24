import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisWorldBuilderTheTower = {
  id: "01a0d4a9-d2dd-7000-8c55-cfbf26856d01",
  type: "page-type/seat",
  slug: "iris-world-builder-the-tower",
  persona: "persona/iris",
  assignmentSlug: "game/the-tower",
  role: "role/world-builder",
  person: "person/alan",
  startMode: "interactive",
  onCall: false,
  registrationAccount: "aawalton",
} as const satisfies Seat
