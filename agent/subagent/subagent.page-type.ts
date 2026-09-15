import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const subagent = {
  id: "01a05978-f2e1-78e7-9017-ab14c5c1d79b",
  type: "page-type/page-type",
  slug: "subagent",
  definition: "an agent a seat runs with the Agent tool",
  extends: ["page-type/agent"],
  mortal: true,
  parts: [
    "boolean-property/subagent-stopped",
    "module/compose-subagent",
    "module/subagent-body",
    "module/subagent-census",
    "module/subagent-guard",
    "module/subagent-landing-again",
    "module/subagent-liveness",
    "module/subagent-naming",
    "module/subagent-outliving",
    "module/subagent-page",
    "module/subagent-page-akasha",
    "module/subagent-page-history",
    "module/subagent-page-naming",
    "module/subagent-pageless",
    "module/subagent-presence",
    "module/subagent-recovering",
    "number-property/subagent-started",
    "page-type/subagent-kind",
    "relation-property/subagent-kind",
    "text-property/agent-id",
  ],
  properties: [
    { pageProperty: "relation-property/principal-seat-name", required: true, many: false },
    { pageProperty: "text-property/dispatched-as", required: false, many: false },
    { pageProperty: "relation-property/subagent-kind", required: false, many: false },
    { pageProperty: "text-property/agent-id", required: true, many: false },
    {
      pageProperty: "number-property/subagent-started",
      required: false,
      many: false,
      uncommitted: true,
    },
    {
      pageProperty: "boolean-property/subagent-stopped",
      required: false,
      many: false,
      uncommitted: true,
    },
  ],
  loadedBy: "module/agent-stated",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A subagent is not a seat.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A subagent's page is there while the subagent runs.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A subagent's page goes when the subagent returns.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement:
        "A page waits on what its subagent left running rather than on that subagent returning.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page goes whether or not the subagent left edits waiting beside it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The edits a subagent leaves unlanded move onto the seat that dispatched it as its page goes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The readings a subagent made move onto that seat as its unlanded edits do.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A subagent whose page comes back out of history takes those readings back.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A page for a subagent that is no longer running goes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A page is written again out of history when the subagent it was for is next dispatched or resumed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A subagent the transcript names nowhere is done for now rather than done for good.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A resumed subagent may be named nowhere by the transcript while it is working.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A subagent's page goes once rather than going, coming back, and going again.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A subagent begins a turn before the landing writing its page has gone.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement:
        "The stretch a subagent has no page for has run to minutes rather than to seconds.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing tells a subagent its page is back but a call that stops being refused.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A subagent at work with no page is found by nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A subagent whose page has gone can report and can keep no edit, so it can land nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A read waits for the subagent's page rather than answering a body recorded nowhere.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A subagent whose page never lands within that wait is refused its read as well.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A subagent can ask what it is leaving behind when its page has gone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A commit a subagent lands is no evidence the reading of whether it works consults.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement:
        "A subagent whose page went while it worked takes that page back without help from outside.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A subagent's slug is the name of the seat that ran the subagent and the id the subagent runs under.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The id a subagent runs under is the part of its slug after its seat's name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A subagent's own id is minted rather than taken from the id the subagent acts under.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A subagent states the assignment its seat states.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A subagent states no persona.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A subagent states no role.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A subagent states no person.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A subagent may have fewer tools than the seat that ran that subagent.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A message to a subagent arrives at its next tool round.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A message to a subagent dies with the session that had the message.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A subagent keeps edits only while the index files its seat by id and its own page by slug.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A subagent has no process of its own for a stop to end.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A subagent is stopped by refusing the model turns that subagent asks for.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A stop reaches a subagent at its next model turn rather than at once.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A subagent stopped from the agents panel has its page taken away.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The page goes as the refused turn ends the subagent rather than before.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A subagent that asks for no further turn has its page taken by the sweep.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The sweep judges a stopped page stale on the stop rather than on a reading.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A stopped subagent a live process acts under keeps its page until that ends.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A service runs that sweep on a timer, so such a page waits at most one tick.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A stop censuses the page first, and takes it at once where it is already stale.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A stop outlives the page that stop was written beside.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A stop outlives that page only in the proxy that had already read the stop.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
