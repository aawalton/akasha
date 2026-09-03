import type { Domain } from "@akasha/domain-system/domain"

export const seatTurn = {
  id: "01a0658d-c92f-7071-838b-e88aa8479137",
  pageTypeSlug: "domain",
  slug: "seat-turn",
  definition: "whether an agent in a seat is working",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A turn runs from what starts the turn until the turn stops.",
    },
    { invariantKind: "departure", statement: "A seat's turn state is working or idle or stopped." },
    {
      invariantKind: "departure",
      statement: "A seat's turn state is stamped when the turn state changes.",
    },
    {
      invariantKind: "departure",
      statement: "A seat is idle from the moment the seat is launched.",
    },
    { invariantKind: "departure", statement: "A seat with no turn record is stopped." },
    { invariantKind: "departure", statement: "A seat with no session running is stopped." },
    {
      invariantKind: "departure",
      statement: "A seat is working while its context is being compacted.",
    },
    { invariantKind: "departure", statement: "A turn end keeps its reading on the seat." },
    {
      invariantKind: "departure",
      statement: "A turn end keeps its turn start source on the seat.",
    },
    {
      invariantKind: "departure",
      statement: "What a turn end keeps is observed rather than declared.",
    },
    {
      invariantKind: "departure",
      statement: "What a turn end keeps is there only while its seat is idle.",
    },
    { invariantKind: "departure", statement: "A turn ending does not itself stop the seat." },
    { invariantKind: "departure", statement: "The halt guard may refuse a headless turn end." },
    {
      invariantKind: "departure",
      statement: "The words a headless seat ends a turn with start nothing.",
    },
    { invariantKind: "departure", statement: "A turn end in a seat on call is read by a model." },
    {
      invariantKind: "departure",
      statement: "Every other turn end is decided from state with no model called.",
    },
    {
      invariantKind: "departure",
      statement:
        "A turn end off call is refused only where nothing is arranged to come back to dispatched work.",
    },
    { invariantKind: "departure", statement: "A reading that cannot settle allows the turn end." },
    { invariantKind: "departure", statement: "A state that cannot be read refuses the turn end." },
    { invariantKind: "departure", statement: "Letting an agent go idle is a turn end approval." },
    {
      invariantKind: "departure",
      statement: "Not letting an agent go idle is a turn end refusal.",
    },
    {
      invariantKind: "departure",
      statement: "A seat whose turn end was refused is working rather than idle.",
    },
    { invariantKind: "departure", statement: "A compaction ends a refused turn." },
    {
      invariantKind: "departure",
      statement:
        "A refusal names what the turn left undone rather than the question refusing the turn end.",
    },
    {
      invariantKind: "departure",
      statement: "A seat on call is refused a turn end short of what the seat could do.",
    },
    {
      invariantKind: "departure",
      statement: "An error ends a turn rather than the agent ending the turn.",
    },
    {
      invariantKind: "departure",
      statement: "An error turn end follows refused credentials or an account at its limit.",
    },
    {
      invariantKind: "departure",
      statement: "An error turn end follows an overloaded model service or a failed connection.",
    },
    { invariantKind: "departure", statement: "No hook runs at an error turn end." },
    { invariantKind: "departure", statement: "Nothing approves or refuses an error turn end." },
    { invariantKind: "departure", statement: "An agent goes idle at an error turn end." },
    {
      invariantKind: "departure",
      statement: "Only the transcript records that an error turn end happened.",
    },
    {
      invariantKind: "departure",
      statement:
        "When a seat whose credentials were refused can work again depends on the account.",
    },
    {
      invariantKind: "departure",
      statement:
        "When a seat the model service overloaded can work again depends on nothing but time.",
    },
    {
      invariantKind: "departure",
      statement: "When a seat whose connection failed can work again depends on nothing but time.",
    },
    {
      invariantKind: "departure",
      statement: "A turn ended by the agent emitting nothing further is an agent stopping.",
    },
    { invariantKind: "departure", statement: "A refused turn end starts another turn." },
    { invariantKind: "departure", statement: "An allowed turn end starts nothing." },
    { invariantKind: "departure", statement: "Restarting a seat restores the seat's session." },
    { invariantKind: "departure", statement: "Restarting a seat starts no turn." },
    { invariantKind: "departure", statement: "A turn start keeps its moment on the seat." },
    { invariantKind: "departure", statement: "A message arriving starts a turn." },
    {
      invariantKind: "departure",
      statement:
        "A turn start source is pending only where the seat has taken the act arming that source.",
    },
    {
      invariantKind: "departure",
      statement: "An idle seat is pending or handed or answered or unknown.",
    },
    { invariantKind: "departure", statement: "An idle seat is never two of those at once." },
    {
      invariantKind: "departure",
      statement: "An idle seat is pending while a turn start the seat arranged is still to come.",
    },
    {
      invariantKind: "departure",
      statement: "An idle seat is handed where the turn put the next act with the principal.",
    },
    {
      invariantKind: "departure",
      statement: "An idle seat is answered where the turn answered what the principal asked.",
    },
    {
      invariantKind: "departure",
      statement: "An idle seat is unknown where nothing settled what the turn did.",
    },
    {
      invariantKind: "departure",
      statement:
        "Whether an idle seat is on call is read apart from which of those four the seat is.",
    },
    {
      invariantKind: "departure",
      statement:
        "Whether an idle seat is pending is read from the seat's own page and nothing else.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent's turn is read from whether the page named for the subagent is there.",
    },
    { invariantKind: "departure", statement: "A subagent is never idle." },
    {
      invariantKind: "departure",
      statement:
        "A subagent that has returned is stopped whatever the seat above the subagent is doing.",
    },
    { invariantKind: "departure", statement: "A subagent under a stopped seat is stopped." },
    { invariantKind: "departure", statement: "A subagent's death announces itself to nothing." },
    {
      invariantKind: "departure",
      statement: "A subagent's page is taken on the return or on the stop its seat asked for.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent's page is taken where the seat starts fresh.",
    },
    { invariantKind: "departure", statement: "A stop is read from what the seat asked." },
    {
      invariantKind: "departure",
      statement: "Stopping a subagent already gone still takes the subagent's page.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent's turn ends by returning to the seat that ran the subagent.",
    },
    {
      invariantKind: "departure",
      statement: "Every turn state carries the color the turn state is drawn in.",
    },
    { invariantKind: "gap", statement: "A seat states its turn state." },
    {
      invariantKind: "gap",
      statement: "A turn ends only where the agent is blocked or has handed back.",
    },
    { invariantKind: "gap", statement: "Every error turn end is reported." },
    { invariantKind: "gap", statement: "An overloaded seat is nudged until the seat works again." },
    { invariantKind: "gap", statement: "A seat waits longer after each nudge." },

    { invariantKind: "departure", statement: "A working seat is drawn in green." },
    { invariantKind: "departure", statement: "An idle seat is drawn in yellow." },
    {
      invariantKind: "departure",
      statement: "An idle seat with a turn start still to come is drawn in blue.",
    },
    { invariantKind: "departure", statement: "A stopped seat is drawn in the text color." },
    { invariantKind: "departure", statement: "A reminder does not make a turn pending." },
  ],
  directives: [
    {
      directiveKind: "rule",
      name: "Question Last",
      act: "Put your question to Alan in your last words.",
      warrant: "Anything following a question buries it, and he answers whatever he read last.",
      aids: ["End the turn on the question.", "A question with text after it is a statement."],
    },
  ],
} as const satisfies Domain
