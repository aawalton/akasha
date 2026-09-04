import type { Command } from "../../command-system/commands/command.page-type.ts"

export const modelGateway = {
  id: "01a0680a-9cc0-7f2c-9bd3-2717815aabeb",
  pageTypeSlug: "command",
  slug: "model-gateway",
  definition: "the command acting on the model gateway a live seat runs",
  code: "ts",
  test: "ts",
  changeKindSlug: "change-mechanical",
  taking: [
    {
      said: "status",
      takes: "the act, which is the gateway version each live seat runs, against the tree here",
    },
    {
      said: "swap",
      takes: "the act, which is a gateway respawned on the bytecode standing here",
    },
    { said: "<target>", takes: "the seat to swap, named as its page is named or by its id" },
    { said: "--fleet", takes: "every live seat in turn rather than one named" },
    { said: "--json", takes: "the answer as one JSON object rather than as rows" },
  ],
  helpNotes: [
    "the act is the first word, and one call names one act.",
    "auto-swap is disarmed, so a running gateway stays on the version it was spawned at until a swap moves it, and a status reports the lag that leaves.",
    "the version a status weighs against is the tree standing on disk here, which is what the next spawn would run.",
    "on disk rather than published, because the gateway is spawned from this repository rather than deployed, so nothing publishes a version for it.",
    "a seat is current where the two versions match, lagging where the tree has moved and the seat has not, and unknown where either version will not read.",
    "a swap writes the ask into the seat's uncommitted values, and the supervisor takes it up as it handles and respawns the gateway alone.",
    "the port holds, the address the client is pointed at holds, and the client in the seat is not restarted.",
    "a seat holding no live gateway is passed over, and its next boot spawns at the version standing then.",
    "a swap is for rolling out a fix that cannot wait, since an ordinary deploy no longer reaches a running gateway.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The act is the first word and one call names one act.",
    },
    {
      invariantKind: "departure",
      statement:
        "A status weighs the running version against the tree standing here rather than a published one.",
    },
    {
      invariantKind: "departure",
      statement: "A seat is lagging where the tree has moved and that seat has not.",
    },
    {
      invariantKind: "departure",
      statement:
        "A version either side does not answer is answered as unknown rather than lagging.",
    },
    {
      invariantKind: "departure",
      statement: "A swap writes the ask into the seat's uncommitted values.",
    },
    {
      invariantKind: "departure",
      statement: "The ask a swap writes is spelled as the page carrying that name is spelled.",
    },
    {
      invariantKind: "departure",
      statement: "The gateway alone is respawned, on the port that gateway already held.",
    },
    {
      invariantKind: "departure",
      statement: "A seat holding no live gateway is passed over rather than refused.",
    },
    {
      invariantKind: "departure",
      statement: "A swap reaches one seat or every live seat, and naming neither is refused.",
    },
    {
      invariantKind: "departure",
      statement:
        "A swap naming a seat and the fleet together is refused rather than chosen between.",
    },
    {
      invariantKind: "departure",
      statement:
        "Every seat a fleet swap reaches is acted on rather than the run stopping at the first that does not answer.",
    },
    {
      invariantKind: "departure",
      statement: "A fleet swap is staggered.",
    },
    {
      invariantKind: "departure",
      statement:
        "A name that could name no seat is answered apart from a name no seat standing answers to.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here restarts a client.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here arms a further act on the seat it swapped.",
    },
  ],
} as const satisfies Command
