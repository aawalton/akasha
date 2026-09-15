import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const seatDeclaration = {
  id: "01a0658d-c92f-7bc5-aac8-847d02086752",
  type: "page-type/domain",
  slug: "seat-declaration",
  definition: "what a seat has because somebody set it",
  parts: [
    "module/seat-answering",
    "module/seat-args",
    "module/seat-attribute",
    "module/seat-defaults",
    "module/seat-help",
    "module/seat-initiative",
    "module/seat-on-call",
    "module/seat-principal",
    "module/seat-registration-account",
    "module/seat-resolve",
    "module/seat-role-on-call",
    "module/seat-running",
    "module/seat-stated",
    "module/seat-stated-identity",
    "module/seat-stating",
    "module/seat-whoami",
    "module/state-spawned-seat",
  ],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Somebody could have settled a declaration otherwise.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat reading a declaration off its own surroundings has a declaration still.",
    },
    { invariantKind: "invariant-kind/departure", statement: "A seat's attributes have one store." },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every other place a seat's attributes appear is written from that store.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An attribute nobody stated is that attribute's default rather than absent.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat's charter is the terms the seat was made on.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat's principal is who the seat's output is produced for.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A principal nobody stated is absent rather than a default.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat's principal does not change when the seat's mode does.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat with a terminal attached is interactive.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat with no terminal attached is headless.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat's flex tells apart two seats stating the same attributes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A flex value is `flex-` followed by a number.",
    },
    { invariantKind: "invariant-kind/departure", statement: "Only a spawned seat has a flex." },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat's spawner assigns that seat's flex.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat is on call or sent to a piece of work or both at once.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An assignment is set and changed only by the seat's principal.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat whose principal is Alan writes its own assignment at his direction.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An assignment ends when the work the assignment names is done.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An assignment ends when the next to act has been told.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every assignment is stated on the seat.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A seat on call is there for its principal whether or not the principal is working.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat of either mode can be on call.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every seat started in interactive mode is on call for Alan.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat on call is started by that seat's principal.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Being on call names no work to finish.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Being on call ends only where the seat's principal or Alan ends the seat's being on call.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Work a principal hands a seat that no task or initiative names is an errand.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The prompt a seat was started with is that seat's errand until its principal states a new errand.",
    },
    { invariantKind: "invariant-kind/absence", statement: "Nothing observable ends an errand." },
    { invariantKind: "invariant-kind/departure", statement: "A seat is assigned one initiative." },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An initiative a persona picked up ends on measurement rather than on delivery.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "An assignment that has ended is no longer stated on the seat.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A seat is stopped once the seat's dispatch has ended.",
    },
  ],
} as const satisfies Domain
