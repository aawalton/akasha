import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const subagent = {
  id: "01a05978-f2e1-78e7-9017-ab14c5c1d79b",
  type: "page-type",
  slug: "subagent",
  definition: "an agent a seat runs with the Agent tool",
  pluralSlug: "subagents",
  extends: ["page-type/agent"],
  mortal: true,
  parts: [
    "module/subagent-body",
    "module/subagent-landing-again",
    "module/subagent-liveness",
    "module/subagent-page-naming",
    "module/subagent-presence",
    "number-property/subagent-started",
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
  ],
  loadedBy: "module/agent-stated",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A subagent is not a seat.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent's page is there while the subagent runs.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent's page goes when the subagent returns.",
    },
    {
      invariantKind: "departure",
      statement: "A page goes whether or not the subagent left edits waiting beside it.",
    },
    {
      invariantKind: "departure",
      statement:
        "The edits a subagent leaves unlanded move onto the seat that dispatched it as its page goes.",
    },
    {
      invariantKind: "gap",
      statement: "A page for a subagent that is no longer running goes.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page is written again out of history when the subagent it was for is next dispatched or resumed.",
    },
    {
      invariantKind: "departure",
      statement:
        "A subagent the transcript names nowhere is done for now rather than done for good.",
    },
    {
      invariantKind: "departure",
      statement: "A resumed subagent may be named nowhere by the transcript while it is working.",
    },
    {
      invariantKind: "gap",
      statement: "A subagent's page goes once rather than going, coming back, and going again.",
    },
    {
      invariantKind: "gap",
      statement: "A subagent begins a turn before the landing writing its page has gone.",
    },
    {
      invariantKind: "constraint",
      statement:
        "The stretch a subagent has no page for has run to minutes rather than to seconds.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing tells a subagent its page is back but a call that stops being refused.",
    },
    {
      invariantKind: "gap",
      statement: "A subagent at work with no page is found by nothing.",
    },
    {
      invariantKind: "departure",
      statement:
        "A subagent whose page has gone can read and report and can keep no edit, so it can land nothing.",
    },
    {
      invariantKind: "gap",
      statement: "A subagent can ask what it is leaving behind when its page has gone.",
    },
    {
      invariantKind: "departure",
      statement:
        "A commit a subagent lands is no evidence the reading of whether it works consults.",
    },
    {
      invariantKind: "gap",
      statement:
        "A subagent whose page went while it worked takes that page back without help from outside.",
    },
    {
      invariantKind: "departure",
      statement:
        "A subagent's slug is the name of the seat that ran the subagent and the id the subagent runs under.",
    },
    {
      invariantKind: "departure",
      statement: "The id a subagent runs under is the part of its slug after its seat's name.",
    },
    {
      invariantKind: "departure",
      statement:
        "A subagent's own id is minted rather than taken from the id the subagent acts under.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent states the assignment its seat states.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent states no persona.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent states no role.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent states no person.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent may have fewer tools than the seat that ran that subagent.",
    },
    {
      invariantKind: "departure",
      statement: "A message to a subagent arrives at its next tool round.",
    },
    {
      invariantKind: "departure",
      statement: "A message to a subagent dies with the session that had the message.",
    },
    {
      invariantKind: "departure",
      statement:
        "A subagent keeps edits only while the index files its seat by id and its own page by slug.",
    },
  ],
  types: "ts",
} as const satisfies PageType
