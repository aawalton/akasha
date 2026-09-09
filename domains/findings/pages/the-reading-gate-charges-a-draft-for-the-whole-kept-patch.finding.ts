import type { Finding } from "../finding.page-type.types.ts"

export const theReadingGateChargesADraftForTheWholeKeptPatch = {
  id: "01a0835c-d5ce-7472-a955-d2585332689d",
  pageTypeSlug: "finding",
  slug: "the-reading-gate-charges-a-draft-for-the-whole-kept-patch",
  domain: "domain/required-reading",
  claim:
    "A draft is refused for reading owed by edits already kept, so the demand arrives at an arbitrary later draft rather than at the draft that incurred it.",
  evidence:
    "During the day-slug rename, two `akasha change draft` calls were accepted without complaint and a third was refused demanding roughly 140 unread paths, the accumulated reading for the whole kept patch, including all 122 set-log pages that earlier drafts had touched. A refused draft keeps nothing, so nothing was lost, but the demand names paths the draft in front of the agent never mentioned.",
} as const satisfies Finding
