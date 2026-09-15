import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const emailZoneReaching = {
  id: "01a0a141-1f7c-70b6-9fb7-3e8b9fc5baba",
  type: "module",
  slug: "email-zone-reaching",
  definition: "the zone's email routing rules, read from Cloudflare and written back to it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here takes a rule away or turns one off, so only reads and posts go out.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A 401 or a 403 is said as the token being refused that work.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A refused call is carried out rather than tried a second time.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The status is read before the body, so a refusal carrying no JSON still says why.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A 200 carrying `success: false` is a refusal rather than an answer.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A refusal naming no reason says so rather than reading as an empty reason.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every body Cloudflare answers is parsed before anything reads a field of it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body carrying no result is read, because a refusal carries none.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The zone is reached by its name, so no page states a zone's id.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Rules are read a page at a time until a short page ends them.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "More rules than the paging reads is refused rather than read in part.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A call that has not answered within thirty seconds is given up on.",
    },
  ],
} as const satisfies Module
