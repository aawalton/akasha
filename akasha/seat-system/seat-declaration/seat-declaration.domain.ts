import type { Domain } from "@akasha/domain-system/domain"

export const seatDeclaration = {
  id: "01a0658d-c92f-7bc5-aac8-847d02086752",
  pageTypeSlug: "domain",
  slug: "seat-declaration",
  definition: "what a seat holds because somebody set it",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Somebody could have settled a declaration otherwise.",
    },
    {
      invariantKind: "departure",
      statement: "A seat reading a declaration off its own surroundings holds a declaration still.",
    },
    { invariantKind: "departure", statement: "A seat's attributes have one store." },
    {
      invariantKind: "departure",
      statement: "Every other place a seat's attributes appear is written from that store.",
    },
    {
      invariantKind: "departure",
      statement: "An attribute nobody stated is that attribute's default rather than absent.",
    },
    {
      invariantKind: "departure",
      statement: "A seat's charter is the terms the seat was made on.",
    },
    {
      invariantKind: "departure",
      statement: "A seat's principal is who the seat's output is produced for.",
    },
    {
      invariantKind: "departure",
      statement: "A principal nobody stated is absent rather than a default.",
    },
    {
      invariantKind: "departure",
      statement: "A seat's principal does not change when the seat's mode does.",
    },
    { invariantKind: "departure", statement: "A seat with a terminal attached is interactive." },
    { invariantKind: "departure", statement: "A seat with no terminal attached is headless." },
    {
      invariantKind: "departure",
      statement: "A seat's flex tells apart two seats stating the same attributes.",
    },
    { invariantKind: "departure", statement: "A flex value is `flex-` followed by a number." },
    { invariantKind: "departure", statement: "Only a spawned seat has a flex." },
    { invariantKind: "departure", statement: "A seat's spawner assigns that seat's flex." },
    {
      invariantKind: "departure",
      statement: "A seat is on call or sent to a piece of work or both at once.",
    },
    {
      invariantKind: "departure",
      statement: "An assignment is set and changed only by the seat's principal.",
    },
    {
      invariantKind: "departure",
      statement: "A seat whose principal is Alan writes its own assignment at his direction.",
    },
    {
      invariantKind: "departure",
      statement: "An assignment ends when the work the assignment names is done.",
    },
    {
      invariantKind: "departure",
      statement: "An assignment ends when whoever acts next has been told.",
    },
    { invariantKind: "departure", statement: "Every assignment is stated on the seat." },
    {
      invariantKind: "departure",
      statement:
        "A seat on call is there for its principal whether or not the principal is working.",
    },
    {
      invariantKind: "departure",
      statement: "A seat of either mode can be on call.",
    },
    {
      invariantKind: "departure",
      statement: "Every seat started in interactive mode is on call for Alan.",
    },
    {
      invariantKind: "departure",
      statement: "A seat on call is started by that seat's principal.",
    },
    { invariantKind: "absence", statement: "Being on call names no work to finish." },
    {
      invariantKind: "departure",
      statement: "Being on call ends only where the seat's principal or Alan ends it.",
    },
    {
      invariantKind: "departure",
      statement: "Work a principal hands a seat that no task or initiative names is an errand.",
    },
    {
      invariantKind: "departure",
      statement:
        "The prompt a seat was started with is that seat's errand until its principal states a new errand.",
    },
    { invariantKind: "absence", statement: "Nothing observable ends an errand." },
    { invariantKind: "departure", statement: "A seat is assigned one initiative." },
    {
      invariantKind: "departure",
      statement: "An initiative a persona picked up ends on measurement rather than on delivery.",
    },
    {
      invariantKind: "gap",
      statement: "An assignment that has ended is no longer stated on the seat.",
    },
    { invariantKind: "gap", statement: "A seat is stopped once the seat's dispatch has ended." },
  ],
} as const satisfies Domain
