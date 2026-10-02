import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariWorldBuilderSaltAndLamplight = {
  id: "01a0fd06-b136-7000-9db7-a87ee22e428c",
  type: "page-type/seat",
  slug: "mari-world-builder-salt-and-lamplight",
  persona: "persona/mari",
  assignmentSlug: "story-written/salt-and-lamplight",
  role: "role/world-builder",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
