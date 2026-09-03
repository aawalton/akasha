import type { Module } from "@akasha/code-system/module"

export const inboxWatching = {
  id: "01a0686a-7a57-789b-82d6-c6d715e27ae4",
  pageTypeSlug: "module",
  slug: "inbox-watching",
  definition:
    "alan's mail decided against his email rules over and over, and the handler told what waits",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The watch stands behind the guard on being the file run, so loading this file declares its value and starts nothing.",
    },
    {
      invariantKind: "departure",
      statement: "The mailbox is opened once and every pass reads through that one opening.",
    },
    {
      invariantKind: "departure",
      statement: "A pass that throws is said and the watch goes on to the next pass.",
    },
    {
      invariantKind: "departure",
      statement:
        "A pass that acted on nothing, and found nothing waiting and nothing unclaimed, says nothing.",
    },
    {
      invariantKind: "departure",
      statement: "Only claims nobody has been told about yet are announced.",
    },
    {
      invariantKind: "departure",
      statement: "A claim is marked told only once the telling has landed.",
    },
    {
      invariantKind: "departure",
      statement:
        "A telling that fails leaves the claims untold, to be tried again on the next pass.",
    },
    {
      invariantKind: "departure",
      statement:
        "A claim an agent rule took is put to the handler as his to judge, and a claim a rule asked him be told of is put to him as news.",
    },
    {
      invariantKind: "departure",
      statement: "The mail announced is still standing in the inbox.",
    },
    {
      invariantKind: "departure",
      statement: "A stop asked for during the wait ends the wait rather than the wait running out.",
    },
    {
      invariantKind: "gap",
      statement:
        "The checkout the watch reads is worked out as the file loads rather than as the run starts.",
    },
  ],
} as const satisfies Module
